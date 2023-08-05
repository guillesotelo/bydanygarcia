import React, { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { dataObj } from '../../types';
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {
    post: { [key: number | string]: any }
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostViewer({ post, setPost }: Props) {
    const [html, setHtml] = useState('')
    const [spaHtml, setspaHtml] = useState('')
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false)
    const [spanish, setSpanish] = useState(false)
    const [sideImages, setSideImages] = useState<string[]>([])
    const [sideImgStyles, setSideImgStyles] = useState<dataObj[]>([])
    const [linkLang, setLinkLang] = useState('')
    const [category, setCategory] = useState('')
    const location = useLocation()
    const history = useHistory()
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
        if (post.html) setHtml(post.html)

        if (post.spaHtml) setspaHtml(post.spaHtml)

        if (post.sideImages) setSideImages(post.sideImages)
        if (post.sideStyles) setSideImgStyles(post.sideStyles)

        if (post.tags) getCategory(post)
    }, [post, postId])

    const getCategory = (post: dataObj) => {
        console.log(post)
        const tags = post.tags.replace(/#/g, '').replace(/_/g, ' ').split(' ')
        if (tags.length) setCategory(tags[0])
    }

    const getPost = async (id: string) => {
        setLoading(true)
        const _post = await getPostById(id)
        if (_post) {
            setPost(_post)
            if (_post.html) setHtml(_post.html)
            if (_post.spaHtml) setspaHtml(_post.spaHtml)

            if (_post.sideImgs) {
                const sideImgs = JSON.parse(_post.sideImgs)
                setSideImages(sideImgs)
            }
            if (_post.sideStyles) {
                const sideStyles = JSON.parse(_post.sideStyles)
                setSideImgStyles(sideStyles)
            }
        }
        setLoading(false)
    }

    const getOgDescription = () => {
        if (spanish && post.spaSubtitle) return post.spaSubtitle
        if (post.subtitle) return post.subtitle

        const div = document.createElement('div')
        div.innerHTML = spanish ? spaHtml : html
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
            <div className="postviewer__routes">
                <h4 className='postviewer__routes-link' onClick={() => history.push('/blog')}>OPEN JOURNAL</h4>
                <h4> &nbsp;-&nbsp; </h4>
                <h4 className='postviewer__routes-link' onClick={() => history.push(`/blog?category=${category}`)}>{category.toUpperCase()}</h4>
            </div>
            {renderHelmet()}
            {loading ? <span className="loader"></span>
                :
                <Post
                    headers={{ ...post, sideImages, sideImgStyles }}
                    content={html}
                    spaContent={spaHtml}
                    linkLang={linkLang}
                />
            }
        </div>
    )
}