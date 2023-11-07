import React, { useContext, useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import { GrammarlyEditorPlugin } from '@grammarly/editor-sdk-react';
import { useHistory, useLocation } from 'react-router-dom';
import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import { createPost, updatePost } from '../../services';
import { toast } from 'react-hot-toast';
import { getPostById } from '../../services/post';
import { AppContext } from '../../AppContext';
import { TEXT } from '../../constants/lang';
import Slider from '../../components/Slider/Slider';
import { dataObj } from '../../types';
import Switch from '../../components/Switch/Switch';

type Props = {}
const voidData = {
    title: '',
    subtitle: '',
    tags: '',
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
    const [showSide, setShowSide] = useState(true)
    const history = useHistory()
    const location = useLocation()
    const { lang, isMobile, isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        activateRenderEffects()
    }, [])

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

        const autosave = localStorage.getItem('autosave')
        const autosaveId = localStorage.getItem('autosaveId')
        const autosaveSpa = localStorage.getItem('autosaveSpa')

        if (autosaveId === id && (autosave || autosaveSpa)) setHasAutosave(true)
    }, [location])

    useEffect(() => {
        if (postId && !html && !spaHtml) getPost(postId)
    }, [postId])

    useEffect(() => {
        const statusBar = document.querySelector('.tox-statusbar')
        if (statusBar) statusBar.remove()
        if (isEdited) {
            localStorage.setItem('autosave', html)
            localStorage.setItem('autosaveSpa', spaHtml)
            localStorage.setItem('autosaveId', postId)
        }
    }, [data, html, spaHtml])


    const activateRenderEffects = () => {
        let position = 0
        window.addEventListener('scroll', function () {
            const item = document.querySelector('.tox-editor-header') as HTMLElement
            if (item) {
                const itemPosition = item.getBoundingClientRect().top
                const scrollTop = document.documentElement.scrollTop

                console.log('scrollTop', scrollTop)
                console.log('itemPosition', itemPosition)
                console.log('position', position)

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

    const loadAutoSave = () => {
        const autosave = localStorage.getItem('autosave')
        const autosaveSpa = localStorage.getItem('autosaveSpa')
        setHtml(autosave || '')
        setSpaHtml(autosaveSpa || '')
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
        }
    }

    const updateData = (key: string, e: { [key: string | number]: any }) => {
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
                published
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
                published
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
    };

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

    return isLoggedIn ?
        <div className='editor__container'>
            <div className="editor__left-col">
                <div className="editor__tab-row">
                    <div className="editor__tab-container">
                        <h4 className={`editor__tab-item ${!spaSelected ? 'editor__tab--selected' : ''}`} onClick={() => setSpaSelected(false)}>English (default)</h4>
                        <h4 className={`editor__tab-item ${spaSelected ? 'editor__tab--selected' : ''}`} onClick={() => setSpaSelected(true)}>Español</h4>
                    </div>
                    <div className='editor__switch-btns'>
                        <Switch
                            label='Show Side'
                            on='Yes'
                            off='No'
                            value={showSide}
                            setValue={setShowSide}
                        />
                        <Switch
                            label='Published'
                            on='Yes'
                            off='No'
                            value={published}
                            setValue={setPublished}
                        />
                    </div>
                </div>
                <h1 className="page__title">{postId ? 'Edit Post' : 'Create New Post'}</h1>
                {hasAutosave ?
                    <Button
                        label='Load autosave'
                        handleClick={loadAutoSave}
                    /> : ''}
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
                <GrammarlyEditorPlugin clientId={process.env.REACT_APP_GRAMMAR_CID}>
                    <Editor
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
                        }}
                    />
                </GrammarlyEditorPlugin>
                {!isMobile ?
                    <div className="editor__btns">
                        <Button
                            label='Discard'
                            handleClick={() => isUpdate ? history.goBack() : history.go(0)}
                            bgColor='lightgray'
                            disabled={!isEdited && !isUpdate}
                        />
                        <Button
                            label={isUpdate ? 'Update' : 'Save'}
                            handleClick={handleSave}
                            disabled={!isEdited && !isUpdate}
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