import React, { useState } from 'react'
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useHistory } from 'react-router-dom';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import { createPost, updatePost } from '../../services';
import { toast } from 'react-hot-toast';

type Props = {}

export default function PostEditor({ }: Props) {
    const [data, setData] = useState({})
    const [isEdited, setIsEdited] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
    const history = useHistory()

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        if (!isEdited) setIsEdited(true)
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const handleEditorChange = (state: EditorState) => {
        setEditorState(state);
    };

    const handleSave = async () => {
        const rawData = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        if (isUpdate) {
            await toast.promise(
                updatePost({ ...data, rawData }),
                {
                    loading: 'Updating...',
                    success: <b>Post updated successfully</b>,
                    error: <b>Error updating post</b>,
                }
            )
        } else {
            await toast.promise(
                createPost({ ...data, rawData }),
                {
                    loading: 'Saving...',
                    success: <b>Post saved successfully</b>,
                    error: <b>Error saving post</b>,
                }
            )
        }
        setIsEdited(false)
        setEditorState(EditorState.createEmpty())
        setData({})
    };


    return (
        <div className='editor__container'>
            <h1 className="page__title">Edit New Post</h1>
            <div className="editor__data-input">
                <div className="editor__input-col">
                <InputField
                    name='title'
                    updateData={updateData}
                    placeholder='Title'
                />
                <InputField
                    name='subtitle'
                    updateData={updateData}
                    placeholder='Sub-title'
                />
                <InputField
                    name='tags'
                    updateData={updateData}
                    placeholder='Tags (e.g experience, study, worship)'
                />
                </div>
                <div className="editor__input-col">
                <InputField
                    name='imageUrl'
                    updateData={updateData}
                    placeholder='Image URL (https://image.png)'
                />
                <InputField
                    name='overlap'
                    updateData={updateData}
                    placeholder='Overlap (title over image)'
                />
                 <InputField
                    name='description'
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
                    disabled={!isEdited}
                />
                <Button
                    label='Save'
                    handleClick={handleSave}
                    disabled={!isEdited}
                />
            </div>
        </div>
    )
}