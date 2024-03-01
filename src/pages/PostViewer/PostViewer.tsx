import React, { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById } from '../../services/post'
import draftToHtml from 'draftjs-to-html';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { AppContext } from '../../AppContext';
import { commentType, onChangeEventType, postType } from '../../types';
import InputField from '../../components/InputField/InputField';
import Comment from '../../components/Comment/Comment';
import { createComment, getAllComments, getPostComments } from '../../services';
import Button from '../../components/Button/Button';
import toast from 'react-hot-toast';
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {
    post: postType
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostViewer({ post, setPost }: Props) {
    const [data, setData] = useState({ fullname: '', email: '', comment: '', postId: '' })
    const [html, setHtml] = useState('')
    const [spaHtml, setspaHtml] = useState('')
    const [postId, setPostId] = useState('')
    const [loading, setLoading] = useState(false)
    const [spanish, setSpanish] = useState(false)
    const [sideImages, setSideImages] = useState<string[]>([])
    const [postComments, setPostComments] = useState<commentType[]>([])
    const [sideImgStyles, setSideImgStyles] = useState<React.CSSProperties[]>([])
    const [linkLang, setLinkLang] = useState('')
    const [category, setCategory] = useState('')
    const [reply, setReply] = useState(false)
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
        if (postId && (!post || !post._id)) getPost(postId)
        else if (!postComments.length) getComments(postId)
        if (post.html) setHtml(post.html)

        if (post.spaHtml) setspaHtml(post.spaHtml)

        if (post.sideImages) setSideImages(post.sideImages)
        if (post.sideImgsStyles) setSideImgStyles(post.sideImgsStyles)

        if (post.tags) getCategory(post)
    }, [post, postId])

    const getCategory = (post: postType) => {
        const _category = post.category ? post.category.includes(',') ?
            post.category.split(',')[0] : post.category :
            post.tags ? post.tags.replace(/#/g, '').replace(/_/g, ' ').split(' ')[0] : ''
        if (_category.length) setCategory(_category)
    }

    const getPost = async (id: string) => {
        setLoading(true)
        const _id = id || post._id || ''
        const _post = await getPostById(_id)
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
        setData({ ...data, postId: _id })
        getComments(_id)
        setLoading(false)
    }

    const getComments = async (postId: string) => {
        try {
            const comments = await getPostComments(postId)
            if (comments && Array.isArray(comments)) setPostComments(comments)
        } catch (error) {
            console.error(error)
        }
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
            <meta property="og:title" content={spanish && post.spaTitle ? post.spaTitle : post.title || post.spaTitle || ''} />
            <meta property="og:type" content='website' />
            <meta property="og:description" content={getOgDescription()} />
            <meta property="og:image" content={post.imageUrl} />
            <meta property="og:url" content={`${REACT_APP_PAGE}/post?id=${postId}`} />
        </Helmet>
    }

    const updateData = (key: string, e: onChangeEventType) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const postComment = async () => {
        try {
            const posted = await createComment({ ...data, postId })
            if (posted && posted._id) {
                toast.success(lang === 'es' ? 'Comentario añadido!' : 'Comment submitted!')
                getComments(postId)
            }
            else toast.error(lang === 'es' ? 'Error al enviar comentario. Intenta nuevamente.' : 'Error while sending comment. Please try again.')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='postviewer__container'>
            <div className="postviewer__routes">
                <h4 className='postviewer__routes-link' onClick={() => history.push('/blog')}>OPEN JOURNAL</h4>
                {category ? <h4 className='postviewer__routes-link' > &nbsp;-&nbsp; </h4> : ''}
                {category ? <h4 className='postviewer__routes-link' onClick={() => history.push(`/blog?category=${category}`)}>{category.toUpperCase()}</h4> : ''}
            </div>
            {renderHelmet()}
            {loading ? <span className="loader" style={{ marginTop: '10rem' }}></span>
                :
                <Post
                    headers={{ ...post, sideImages, sideImgStyles }}
                    content={html}
                    spaContent={spaHtml}
                    linkLang={linkLang}
                />
            }
            <div className="postviewer__comments-section">
                <h2 className="postviewer__comments-title">{lang === 'es' ? 'Comentarios' : 'Comments'}</h2>
                <div className="postviewer__comments-list" style={{ width: isMobile ? '' : '30vw' }}>
                    {postComments.map((comment, i) => <Comment key={i} comment={comment} reply={reply} setReply={setReply} />)}
                </div>
                {!reply ?
                    <div className="postviewer__comments-post">
                        <h2 className="postviewer__comments-post-title">{lang === 'es' ? 'Deja tu comentario' : 'Leave a comment'}</h2>
                        <div className="postviewer__comments-reply" style={{ width: isMobile ? '' : '30vw' }}>
                            <InputField
                                name='fullname'
                                value={data.fullname}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                            />
                            <InputField
                                name='email'
                                value={data.email}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu email' : 'Your email'}
                            />
                            <InputField
                                name='comment'
                                value={data.comment}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu comentario' : 'Your comment'}
                                type='textarea'
                                rows={8}
                            />
                            <Button
                                label={lang === 'es' ? 'Enviar Comentario' : 'Post Comment'}
                                handleClick={postComment}
                            />
                        </div>
                    </div>
                    : ''}
            </div>
        </div>
    )
}