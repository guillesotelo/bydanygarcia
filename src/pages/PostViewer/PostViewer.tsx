import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet-async';
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {}

export default function PostViewer({ }: Props) {
    const [post, setPost] = useState({ title: '', subtitle: '', imageUrl: '' })
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

    useEffect(() => {
        renderHelmet()
    }, [post, postId])

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

    const renderHelmet = () => {
        return <Helmet>
            <meta property="og:title" content={post.title} />
            <meta property="og:description" content={post.subtitle} />
            <meta property="og:image" content={post.imageUrl} />
            <meta property="og:url" content={`${REACT_APP_PAGE}/post?id=${postId}`} />
        </Helmet>
    }

    return (
        <div className='postviewer__container'>
            {renderHelmet()}
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