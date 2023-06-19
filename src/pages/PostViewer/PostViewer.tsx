import React, { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {
    post: { [key: number | string]: any }
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostViewer({ post, setPost }: Props) {
    const [rawData, setRawData] = useState('')
    const [spaRawData, setSpaRawData] = useState('')
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false)
    const [spanish, setSpanish] = useState(false)
    const [sideImages, setSideImages] = useState<string[]>([])
    const [linkLang, setLinkLang] = useState('')
    const location = useLocation()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        setSpanish(lang === 'es')
    }, [])

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        const updated = new URLSearchParams(document.location.search).get('updated')
        const language = new URLSearchParams(document.location.search).get('lang')

        if (updated && id) getPost(id)
        if (id) setPostId(id)
        if (language) setLinkLang(language)
    }, [location])

    useEffect(() => {
        renderHelmet()
        if (postId && (!post || !post.title)) getPost(postId)
        if (post.rawData) {
            const htmlContent = draftToHtml(JSON.parse(post.rawData || {}))
            setRawData(htmlContent || '')
        }
        if (post.spaRawData) {
            const htmlContent = draftToHtml(JSON.parse(post.spaRawData || {}))
            setSpaRawData(htmlContent || '')
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
            if (_post.spaRawData) {
                const htmlContent = draftToHtml(JSON.parse(_post.spaRawData || {}))
                setSpaRawData(htmlContent || '')
            }
            if (_post.sideImgs) {
                const sideImgs = JSON.parse(_post.sideImgs)
                setSideImages(sideImgs)
            }
        }
        setLoading(false)
    }

    const getOgDescription = () => {
        if (spanish && post.spaSubtitle) return post.spaSubtitle
        if (post.subtitle) return post.subtitle

        const div = document.createElement('div')
        div.innerHTML = spanish ? spaRawData : rawData
        return div.textContent?.substring(0, 40) + '...'
    }

    const renderHelmet = () => {
        return <Helmet>
            <meta property="og:title" content={spanish && post.spaTitle ? post.spaTitle : post.title} />
            <meta property="og:type" content='website' />
            <meta property="og:description" content={getOgDescription()} />
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
                    spaContent={spaRawData}
                    linkLang={linkLang}
                />
            }
        </div>
    )
}