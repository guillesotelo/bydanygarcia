import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory, useLocation } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { createPost, updatePost } from '../../services';
import { toast } from 'react-hot-toast';
import { getPostById } from '../../services/post';
import draftToHtml from 'draftjs-to-html';

type Props = {}
const voidData = {
    title: '',
    subtitle: '',
    tags: '',
    description: '',
    imageUrl: '',
    overlap: '',
    sideImage: ''
}

export default function PostEditor({ }: Props) {
    const [data, setData] = useState(voidData)
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [postId, setPostId] = useState('')
    const [sideImages, setSideImages] = useState<string[]>([])
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
        if (!user || !user.token || !user.username) return history.push('/')
        setIsAdmin(true)

    }, [])

    useEffect(() => {
        const isNew = new URLSearchParams(document.location.search).get('new')
        const id = new URLSearchParams(document.location.search).get('id')

        if (isNew) {
            setData(voidData)
            setEditorState(EditorState.createEmpty())
            setIsEdited(false)
            setPostId('')
        }
        else if (id) setPostId(id)
    }, [location])

    useEffect(() => {
        if (postId) getPost(postId)
    }, [postId])

    const getPost = async (id: string) => {
        const _post = await getPostById(id)
        if (_post) {
            setData(_post)
            if (_post.rawData) {
                const rawContent = JSON.parse(_post.rawData || {})
                setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)))
                setIsUpdate(true)
            }
            if (_post.sideImgs) {
                const sideImgs = JSON.parse(_post.sideImgs)
                setSideImages(sideImgs)
            }
        }
    }

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        if (!isEdited) setIsEdited(true)
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleSave = async () => {
        const loading = toast.loading(isUpdate ? 'Updating...' : 'Saving...')
        const rawData = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        const sideImgs = JSON.stringify(sideImages)
        if (isUpdate) {
            const updated = await updatePost({ ...data, sideImgs, rawData })
            if (updated) {
                toast.success('Post updated successfully. Redirecting...')
                setTimeout(() => history.push(`/post?id=${updated._id}&updated=true`), 1500)
            } else toast.error('Error updating post, try again later')
            getPost(postId)
        } else {
            const saved = await createPost({ ...data, sideImgs, rawData })
            if (saved) {
                toast.success('Post saved successfully. Redirecting...')
                setTimeout(() => history.push(`/post?id=${saved._id}`), 1500)
            } else toast.error('Error saving post, try again later')
        }
        setIsEdited(false)
        setEditorState(EditorState.createEmpty())
        setData(voidData)
        return toast.remove(loading)
    };

    const addSideImage = () => {
        if (data.sideImage) {
            setSideImages(sideImages.concat(data.sideImage))
        }
        setData({ ...data, sideImage: '' })
    }

    const removeSideImage = (index: number) => {
        const _sideImages = [...sideImages]
        _sideImages.splice(index, 1)
        setSideImages(_sideImages)
    }

    return isAdmin ?
        <div className='editor__container'>
            <div className="editor__left-col">
                <h1 className="page__title">{postId ? 'Edit Post' : 'Create New Post'}</h1>
                <div className="editor__data-input">
                    <div className="editor__input-col">
                        <InputField
                            name='title'
                            value={data.title}
                            updateData={updateData}
                            placeholder='Title'
                        />
                        <InputField
                            name='subtitle'
                            value={data.subtitle}
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
                            name='overlap'
                            value={data.overlap}
                            updateData={updateData}
                            placeholder='Overlap (title over image)'
                        />
                        <InputField
                            name='description'
                            value={data.description}
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
                <Editor
                    editorState={editorState}
                    onEditorStateChange={handleEditorChange}
                    toolbarClassName="editor__toolbar"
                    wrapperClassName="editor__wrapper"
                    editorClassName="editor__editor"
                    onFocus={() => { }}
                />
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
            </div>
            <div className="editor__right-col">
                <h1 className="editor__side-images-title">Side Images</h1>
                <div className="editor__side-images-list">
                    {sideImages.map((image, i) => <div key={i} className="editor__side-images-item-wrapper">
                        <img className='editor__side-images-item' src={image} alt='Post Image' loading='lazy' />
                        <h4 className="editor__side-images-item-remove" onClick={() => removeSideImage(i)}>X</h4>
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
            </div>
        </div>
        : <div></div>
}