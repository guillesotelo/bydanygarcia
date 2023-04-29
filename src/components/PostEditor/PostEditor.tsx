import React, { useEffect, useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';
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
}

export default function PostEditor({ }: Props) {
    const [data, setData] = useState(voidData)
    const [rawData, setRawData] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [isEdited, setIsEdited] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [postId, setPostId] = useState('')
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const history = useHistory()

    console.log('data', data)

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
        if (!user || !user.token || !user.username) return history.push('/')
        setIsAdmin(true)

        const id = new URLSearchParams(document.location.search).get('id')
        if (id) setPostId(id)
    }, [])

    useEffect(() => {
        if (postId) getPost(postId)
    }, [postId])

    const getPost = async (id: string) => {
        const _post = await getPostById(id)
        if (_post) {
            setData(_post)
            if (_post.rawData) {
                const rawContent = JSON.parse(_post.rawData || {})
                const htmlContent = draftToHtml(rawContent)
                setRawData(htmlContent || '')
                setEditorState(EditorState.createWithContent(convertFromRaw(rawContent)))
            }
            setIsUpdate(true)
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
        if (isUpdate) {
            const updated = await updatePost({ ...data, rawData })
            if (updated) {
                toast.success('Post updated successfully')
                setTimeout(() => history.push(`/post?id=${postId}`), 1500)
            } else toast.error('Error updating post, try again later')
            getPost(postId)
        } else {
            const saved = await updatePost({ ...data, rawData })
            if (saved) {
                toast.success('Post saved successfully')
                setTimeout(() => history.push(`/post?id=${postId}`), 1500)
            } else toast.error('Error saving post, try again later')
        }
        setIsEdited(false)
        setEditorState(EditorState.createEmpty())
        setData(voidData)
        return toast.remove(loading)
    };


    return isAdmin ?
        <div className='editor__container'>
            <h1 className="page__title">Edit New Post</h1>
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
                        placeholder='Image URL (https://image.png)'
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
                    handleClick={() => history.go(0)}
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
        : ''
}