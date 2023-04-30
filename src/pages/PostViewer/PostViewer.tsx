import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';

type Props = {}

export default function PostViewer({ }: Props) {
    const [post, setPost] = useState({})
    const [rawData, setRawData] = useState('')
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id) setPostId(id)
    }, [])

    useEffect(() => {
        if (postId) getPost(postId)
    }, [postId])

    const getPost = async (id: string) => {
        setLoading(true)
        const _post = await getPostById(id)
        if (_post) {
            setPost(_post)
            if (_post.rawData) {
                const htmlContent = draftToHtml(JSON.parse(_post.rawData || {}))
                setRawData(htmlContent || '')
            }
        }
        setLoading(false)
    }
    return (
        <div className='postviewer__container'>
            {loading ? <span className="loader"></span>
                :
                <Post
                    headers={post}
                    content={rawData}
                />
            }
        </div>
    )
}