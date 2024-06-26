import React, { useContext, useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
// import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react'
import { useHistory, useLocation } from 'react-router-dom'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { createPost, updatePost } from '../../services'
import { toast } from 'react-hot-toast'
import { getPostById } from '../../services/post'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import Slider from '../../components/Slider/Slider'
import { dataObj, onChangeEventType } from '../../types'
import Switch from '../../components/Switch/Switch'
import Dropdown from '../../components/Dropdown/Dropdown'
import { getAllRecordsFromDB, saveItemToDB } from '../../indexedDB'
import imageCompression from 'browser-image-compression';
import { convertToBase64 } from '../../helpers'

type Props = {}
const voidData = {
    title: '',
    subtitle: '',
    tags: '',
    category: '',
    description: '',
    imageUrl: '',
    overlap: '',
    sideImage: '',
    spaTitle: '',
    spaSubtitle: '',
    spaDescription: '',
    spaOverlap: '',
}

export default function PostEditor({ }: Props) {
    const [data, setData] = useState(voidData)
    const [isEdited, setIsEdited] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [spaSelected, setSpaSelected] = useState(false)
    const [published, setPublished] = useState(false)
    const [postId, setPostId] = useState('')
    const [sideImages, setSideImages] = useState<string[]>([])
    const [sideImgStyles, setSideImgStyles] = useState<dataObj[]>([])
    const [html, setHtml] = useState('')
    const [spaHtml, setSpaHtml] = useState('')
    const [hasAutosave, setHasAutosave] = useState(false)
    const [showSide, setShowSide] = useState(false)
    const [selectedCategory, setSelectedCategory] = useState('Inspiration')
    const history = useHistory()
    const location = useLocation()
    const { lang, isMobile, isLoggedIn } = useContext(AppContext)
    const editorRef = useRef<any>(null)

    useEffect(() => {
        if (isLoggedIn !== null && !isLoggedIn) return history.push('/')
        activateRenderEffects()
    }, [isLoggedIn])

    useEffect(() => {
        const isNew = new URLSearchParams(document.location.search).get('new')
        const id = new URLSearchParams(document.location.search).get('id')

        if (isNew) {
            setData(voidData)
            setHtml('')
            setSpaHtml('')
            setIsEdited(false)
            setPostId('')
        }
        else if (id) setPostId(id)

        processAutosave(id, isNew)
    }, [location])

    useEffect(() => {
        if (postId && !html && !spaHtml) getPost(postId)
    }, [postId])

    useEffect(() => {
        const statusBar = document.querySelector('.tox-statusbar')
        if (statusBar) statusBar.remove()
        if (isEdited) saveLocalPost()
    }, [data, html, spaHtml])

    const processAutosave = async (id: string | null, isNew: string | null) => {
        try {
            const items = await getAllRecordsFromDB()

            const autosavedHtml = items[id || 'new'].html
            const autosavedHtmlSPa = items[id || 'new'].spaHtml

            const autosavedId = localStorage.getItem('autosavedId')
            if ((autosavedId === id || (isNew && autosavedId === 'new')) && (autosavedHtml || autosavedHtmlSPa)) setHasAutosave(true)
        } catch (error) {
            console.error(error)
        }
    }

    const saveLocalPost = async () => {
        try {
            if (html) await saveItemToDB({ html, id: postId || 'new' })
            if (spaHtml) await saveItemToDB({ spaHtml, id: postId || 'new' })
            localStorage.setItem('autosavedData', JSON.stringify(data))
            localStorage.setItem('autosavedId', postId || 'new')
        } catch (error) {
            toast(
                'Error running autosave. Write with caution.',
                {
                    duration: 4000,
                }
            )
        }
    }

    const activateRenderEffects = () => {
        let position = 0
        window.addEventListener('scroll', function () {
            const item = document.querySelector('.tox-editor-header') as HTMLElement
            if (item) {
                const itemPosition = item.getBoundingClientRect().top
                const scrollTop = document.documentElement.scrollTop

                if (itemPosition < 28 && !item.classList.contains('--fixed')) {
                    position = scrollTop
                    item.classList.add('--fixed')
                } else {
                    if (item.classList.contains('--fixed') && position >= scrollTop) {
                        item.classList.remove('--fixed')
                    }
                }
            }
        })
    }

    const loadAutoSave = async () => {
        const items = await getAllRecordsFromDB()

        const autosavedHtml = items[postId || 'new'].html
        const autosavedHtmlSPa = items[postId || 'new'].spaHtml

        const autosaveData = JSON.parse(localStorage.getItem('autosavedData') || '{}') || {}
        setData(autosaveData)
        setHtml(autosavedHtml || '')
        setSpaHtml(autosavedHtmlSPa || '')
    }

    const getPost = async (id: string) => {
        const _post = await getPostById(id)
        if (_post) {
            setData(_post)
            if (_post.html) {
                setHtml(_post.html)
                setIsUpdate(true)
            }
            if (_post.spaHtml) {
                setSpaHtml(_post.spaHtml)
                setIsUpdate(true)
            }
            if (_post.sideImgs) {
                const sideImgs = JSON.parse(_post.sideImgs)
                setSideImages(sideImgs)
            }
            if (_post.sideStyles) {
                const sideStyles = JSON.parse(_post.sideStyles)
                setSideImgStyles(sideStyles)
            }
            setPublished(_post.published || false)
            setSelectedCategory(_post.category || '')
        }
    }

    const updateData = (key: string, e: onChangeEventType) => {
        if (!isEdited) setIsEdited(true)
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const handleEditorChange = (state: string) => {
        if (spaSelected) setSpaHtml(state)
        else setHtml(state)
        setIsEdited(true)
    }

    const handleSave = async () => {
        try {
            const loading = toast.loading(isUpdate ? TEXT[lang]['updating'] : TEXT[lang]['saving'])
            const sideImgs = JSON.stringify(sideImages)
            const sideStyles = JSON.stringify(sideImgStyles)

            if (isUpdate) {
                const updated = await updatePost({
                    ...data,
                    sideImgs,
                    sideStyles,
                    html,
                    spaHtml,
                    published,
                    category: selectedCategory
                })
                if (updated && updated._id) {
                    localStorage.removeItem('posts')
                    toast.success(TEXT[lang]['saving_ok'])
                    setTimeout(() => history.push(`/post?id=${updated._id}&updated=true`), 1500)
                }
                else {
                    toast.error(TEXT[lang]['error_saving'])
                    return toast.remove(loading)
                }
                getPost(postId)
            } else {
                const saved = await createPost({
                    ...data,
                    sideImgs,
                    sideStyles,
                    html,
                    spaHtml,
                    published,
                    category: selectedCategory
                })
                if (saved && saved._id) {
                    localStorage.removeItem('posts')
                    toast.success(TEXT[lang]['saving_ok'])
                    setTimeout(() => history.push(`/post?id=${saved._id}`), 1500)
                } else {
                    toast.error(TEXT[lang]['error_saving'])
                    return toast.remove(loading)
                }
            }
            setHtml('')
            setData(voidData)
            localStorage.removeItem('posts')
            setIsEdited(false)
            return toast.remove(loading)
        } catch (error) {
            toast.error('Error saving post. Please try again')
        }
    }

    const addSideImage = () => {
        if (data.sideImage) {
            setSideImages(sideImages.concat(data.sideImage))
        } else toast.error(TEXT[lang]['invalid_image_url'])
        setData({ ...data, sideImage: '' })
    }

    const removeSideImage = (index: number) => {
        const _sideImages = [...sideImages]
        _sideImages.splice(index, 1)
        setSideImages(_sideImages)
    }

    const updateImgStyles = (prop: string, newValue: string | number, index: number) => {
        const imgStyles = [...sideImgStyles]
        imgStyles[index] = { ...imgStyles[index], [prop]: newValue }
        setSideImgStyles(imgStyles)
    }

    const getImageProp = (prop: string, index: number) => {
        return sideImgStyles[index] && sideImgStyles[index][prop] ? sideImgStyles[index][prop] : 0
    }

    const filePickerCallback = (callback: any) => {
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')

        input.onchange = async () => {
            if (input.files) {
                const file = input.files[0]
                const compressOptions = {
                    maxSizeMB: 0.3,
                    maxWidthOrHeight: 800,
                    useWebWorker: true
                }

                const compressedFile = await imageCompression(file, compressOptions)
                const base64 = await convertToBase64(compressedFile)

                callback(base64, { title: file.name })
            }
        }
        input.click()
    }


    return isLoggedIn ?
        <div className='editor__container'>
            <div className="editor__left-col">
                <div
                    className="editor__tab-row"
                    style={{
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '1rem' : ''
                    }}>
                    <div className="editor__tab-container">
                        <h4 className={`editor__tab-item ${!spaSelected ? 'editor__tab--selected' : ''}`} onClick={() => setSpaSelected(false)}>English (default)</h4>
                        <h4 className={`editor__tab-item ${spaSelected ? 'editor__tab--selected' : ''}`} onClick={() => setSpaSelected(true)}>Español</h4>
                    </div>
                    <div className='editor__switch-btns'>
                        <Dropdown
                            label='Category'
                            options={['Inspiration', 'Life Abroad', 'Motherhood']}
                            selected={selectedCategory}
                            value={selectedCategory}
                            setSelected={setSelectedCategory}
                        />
                        <Switch
                            label='Published'
                            on='Yes'
                            off='No'
                            value={published}
                            setValue={setPublished}
                        />
                        <Switch
                            label='Side images'
                            on='Yes'
                            off='No'
                            value={showSide}
                            setValue={setShowSide}
                        />
                    </div>
                </div>
                <h1 className="page__title">{postId ? 'Edit Post' : 'Create New Post'}</h1>
                <div className="editor__tab-row">
                    {hasAutosave ?
                        <Button
                            label='Load autosave'
                            handleClick={loadAutoSave}
                        /> : ''}
                </div>
                <div className="editor__data-input">
                    <div className="editor__input-col">
                        <InputField
                            name={spaSelected ? 'spaTitle' : 'title'}
                            value={spaSelected ? data.spaTitle : data.title}
                            updateData={updateData}
                            placeholder='Title'
                        />
                        <InputField
                            name={spaSelected ? 'spaSubtitle' : 'subtitle'}
                            value={spaSelected ? data.spaSubtitle : data.subtitle}
                            updateData={updateData}
                            placeholder='Sub-title'
                        />
                        <InputField
                            name='tags'
                            value={data.tags}
                            updateData={updateData}
                            placeholder='Tags (e.g experience, study, worship)'
                        />
                    </div>
                    <div className="editor__input-col">
                        <InputField
                            name='imageUrl'
                            value={data.imageUrl}
                            updateData={updateData}
                            placeholder='Image URL (https://example.com/image.png)'
                        />
                        <InputField
                            name={spaSelected ? 'spaOverlap' : 'overlap'}
                            value={spaSelected ? data.spaOverlap : data.overlap}
                            updateData={updateData}
                            placeholder='Overlap (title over image)'
                        />
                        <InputField
                            name={spaSelected ? 'spaDescription' : 'description'}
                            value={spaSelected ? data.spaDescription : data.description}
                            updateData={updateData}
                            placeholder='Description (short text)'
                        />
                        {/* <InputField
                    name='type'
                    updateData={updateData}
                    placeholder='Type (optional)'
                /> */}
                    </div>
                </div>
                {/* <GrammarlyEditorPlugin clientId={process.env.REACT_APP_GRAMMAR_CID}> */}
                <Editor
                    onInit={(_, editor) => editorRef.current = editor}
                    initialValue=""
                    value={spaSelected ? spaHtml : html}
                    onEditorChange={handleEditorChange}
                    apiKey={process.env.REACT_APP_TINYMCE_API_KEY}
                    init={{
                        height: 700,
                        menubar: true,
                        plugins: 'link image lists wordcount emoticons',
                        statusbar: false,
                        toolbar:
                            'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons wordcount',
                        file_picker_callback: filePickerCallback
                    }}
                />
                {/* </GrammarlyEditorPlugin> */}
                {!isMobile ?
                    <div className="editor__btns">
                        <Button
                            label='Discard'
                            handleClick={() => isUpdate ? history.goBack() : history.go(0)}
                            bgColor='lightgray'
                            disabled={!isEdited && !isUpdate}
                            style={{ width: '45%' }}
                        />
                        <Button
                            label={isUpdate ? 'Update' : 'Save'}
                            handleClick={handleSave}
                            disabled={!isEdited && !isUpdate}
                            style={{ width: '45%' }}
                        />
                    </div>
                    : ''}
            </div>
            {showSide ?
                <div className="editor__right-col">
                    <h1 className="editor__side-images-title">Side Images</h1>
                    <div className="editor__side-images-list">
                        {sideImages.map((image, i) =>
                            <div key={i}>
                                <Slider
                                    name=''
                                    type=''
                                    label='Image Size'
                                    sign='px'
                                    value={getImageProp('width', i) || 500}
                                    setValue={value => updateImgStyles('width', value, i)}
                                    min={1}
                                    max={1000}
                                />
                                <div key={i} className="editor__side-images-item-wrapper" style={{ maxWidth: getImageProp('width', i) || '100%' }}>
                                    <img
                                        className='editor__side-images-item'
                                        src={image}
                                        alt='Post Image'
                                        loading='lazy'
                                        style={sideImgStyles[i] || {}}
                                    />
                                    <h4 className="editor__side-images-item-remove" onClick={() => removeSideImage(i)}>X</h4>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="editor__side-images-input">
                        <InputField
                            name='sideImage'
                            value={data.sideImage}
                            updateData={updateData}
                            placeholder='Add new image (https://example.com/image.png)'
                        />
                        <Button
                            label='Add'
                            handleClick={addSideImage}
                            disabled={!isEdited && !isUpdate}
                        />
                    </div>
                </div> : ''}
            {isMobile ?
                <div className="editor__btns">
                    <Button
                        label='Discard changes'
                        handleClick={() => isUpdate ? history.goBack() : history.go(0)}
                        bgColor='lightgray'
                        disabled={!isEdited && !isUpdate}
                    />
                    <Button
                        label={isUpdate ? 'Update post' : 'Save post'}
                        handleClick={handleSave}
                        disabled={!isEdited && !isUpdate}
                    />
                </div> : ''}
        </div >
        : <div></div>
}