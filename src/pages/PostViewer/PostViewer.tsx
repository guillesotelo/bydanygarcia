import React, { useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {
    post: { [key: number | string]: any }
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostViewer({ post, setPost }: Props) {
    const [rawData, setRawData] = useState('')
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false)
    const [sideImages, setSideImages] = useState<string[]>([])
    const location = useLocation()

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        const updated = new URLSearchParams(document.location.search).get('updated')

        if (updated && id) getPost(id)
        if (id) setPostId(id)
    }, [location])

    useEffect(() => {
        renderHelmet()
        if (postId && (!post || !post.title)) getPost(postId)
        if (post.rawData) {
            const htmlContent = draftToHtml(JSON.parse(post.rawData || {}))
            setRawData(htmlContent || '')
        }

        if (post.sideImages) setSideImages(post.sideImages)
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
            if (_post.sideImgs) {
                const sideImgs = JSON.parse(_post.sideImgs)
                setSideImages(sideImgs)
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
                    headers={{ ...post, sideImages }}
                    content={rawData}
                />
            }
        </div>
    )
}