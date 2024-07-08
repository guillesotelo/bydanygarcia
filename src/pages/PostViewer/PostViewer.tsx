import React, { useContext, useEffect, useState } from 'react'
import Post from '../../components/Post/Post'
import { getPostById, getPostByTitle } from '../../services/post'
import { useHistory, useLocation } from 'react-router-dom'
import { AppContext } from '../../AppContext'
import { commentType, onChangeEventType, postType } from '../../types'
import InputField from '../../components/InputField/InputField'
import Comment from '../../components/Comment/Comment'
import { createComment, getAllComments, getPostComments } from '../../services'
import Button from '../../components/Button/Button'
import toast from 'react-hot-toast'
import Instagram from '../../assets/icons/instagram.svg'
import Facebook from '../../assets/icons/facebook.svg'
import X from '../../assets/icons/x.svg'
import Linkedin from '../../assets/icons/linkedin.svg'
import Whatsapp from '../../assets/icons/whatsapp.svg'
import SEO from '../../components/SEO/Seo'
import WebSignature from '../../assets/illustrations/web-signature.png'
import WebSignatureMobile from '../../assets/illustrations/web-signature-mobile.png'
const REACT_APP_PAGE = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : process.env.REACT_APP_PAGE

type Props = {
    post: postType
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostViewer({ post, setPost }: Props) {
    const [data, setData] = useState<commentType>({})
    const [html, setHtml] = useState('')
    const [spaHtml, setspaHtml] = useState('')
    const [postTitle, setPostTitle] = useState('')
    const [loading, setLoading] = useState(false)
    const [spanish, setSpanish] = useState(false)
    const [sideImages, setSideImages] = useState<string[]>([])
    const [postComments, setPostComments] = useState<commentType[]>([])
    const [sideImgStyles, setSideImgStyles] = useState<React.CSSProperties[]>([])
    const [linkLang, setLinkLang] = useState('')
    const [category, setCategory] = useState('')
    const [submitComment, setSubmitComment] = useState(false)
    const location = useLocation()
    const history = useHistory()
    const { lang, isMobile, isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        setSpanish(lang === 'es')
    }, [])

    useEffect(() => {
        const title = location.pathname.split('/')[2]
        const language = new URLSearchParams(document.location.search).get('lang')
        // const updated = new URLSearchParams(document.location.search).get('updated')

        // if (updated && id) getPost(id)
        if (title) setPostTitle(title)
        if (language) setLinkLang(language)
    }, [location])

    useEffect(() => {
        renderSeo()
        if (!html && !spaHtml && postTitle) getPost(postTitle)
        if (!postComments.length && post && post._id) getComments(post._id)
        if (!category) getCategory()
    }, [post, postTitle])

    useEffect(() => {
        styleImagesInParagraphs()
    }, [html, spaHtml, loading])

    const styleImagesInParagraphs = () => {
        const paragraphsWithImages = Array.from(document.querySelectorAll('p > img'))
        paragraphsWithImages.forEach((image) => {
            if (image.parentElement instanceof HTMLElement) {
                const paragraph = image.parentElement
                paragraph.style.textAlign = 'center';
                // (image as HTMLElement).style.borderRadius = '.5rem';
                (image as HTMLElement).style.margin = '.5rem';
                (image as HTMLElement).style.display = 'inline';
                if (isMobile) (image as HTMLElement).style.width = '90%';
            }
        })
    }

    const getCategory = () => {
        const _category = post.category ? post.category.includes(',') ?
            post.category.split(',')[0] : post.category :
            post.tags ? post.tags.replace(/#/g, '').replace(/_/g, ' ').split(' ')[0] : ''
        if (_category.length) setCategory(_category.toLocaleLowerCase())
    }

    const getPost = async (title: string) => {
        try {
            setLoading(true)
            const _post = await getPostByTitle(title.replaceAll('-', ' '))
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
                setPostTitle(_post._id)
                getComments(_post._id)
                setData({ ...data, postId: _post._id })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const getComments = async (postTitle: string) => {
        try {
            const comments = await getPostComments(postTitle)
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

    const renderSeo = () => {
        const title = spanish && post.spaTitle ? post.spaTitle : post.title || post.spaTitle || ''
        const description = getOgDescription()
        const image = post.imageUrl || 'https://www.bydanygarcia.com/images/stay-connected2.png'
        const url = `${REACT_APP_PAGE}/post/${(post.title || post.spaTitle)?.replaceAll(' ', '-')}`

        return <SEO
            title={title}
            description={description}
            image={image}
            url={url}
            type='website'
        />
    }

    const updateData = (key: string, e: onChangeEventType) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const postComment = async () => {
        try {
            const posted = await createComment({
                ...data,
                postId: post._id,
                isDany: isLoggedIn ? true : false
            })
            if (posted && posted._id) {
                toast.success(lang === 'es' ? 'Comentario añadido!' : 'Comment submitted!')
                getComments(post._id || data.postId || '')
                setData({})
            }
            else toast.error(lang === 'es' ? 'Error al enviar comentario. Intenta nuevamente.' : 'Error while sending comment. Please try again.')
        } catch (error) {
            console.error(error)
        }
    }

    const shareToPlatform = (site: string) => {
        const currentUrl = encodeURIComponent(`${window.location.href}&lang=${lang}`)
        const platforms: any = {
            'facebook': `https://www.facebook.com/sharer/sharer.php?u=`,
            'x': `https://twitter.com/intent/tweet?url=`,
            'linkedin': `https://www.linkedin.com/shareArticle?mini=true&url=`,
            'instagram': `https://www.instagram.com/?url=`,
            'pinterest': `https://www.instagram.com/?url=`,
            'whatsapp': `https://api.whatsapp.com/send?text=`,
        }
        const url = `${platforms[site]}${currentUrl}`
        window.open(url, '_blank', 'noreferrer')
    }

    return (
        <div className='postviewer__container'>
            {renderSeo()}
            <div className="postviewer__routes">
                <h4 className='postviewer__routes-link' onClick={() => history.push('/blog')}>{lang === 'es' ? 'BITÁCORA ABIERTA' : 'OPEN JOURNAL'}</h4>
                {category ?
                    <>
                        {!isMobile ? <h4 className='postviewer__routes-link' >&nbsp;-&nbsp;</h4> : ''}
                        <h4 className='postviewer__routes-link' onClick={() => history.push(`/blog?category=${category.trim().replaceAll(' ', '_')}`)}>{isMobile ? '.' : ''}{category.toUpperCase()}</h4>
                    </>
                    : ''}
                {!isMobile ? <h4 className='postviewer__routes-link' >&nbsp;-&nbsp;</h4> : ''}
                <h4 className='postviewer__routes-link'>{isMobile ? '..' : ''}{lang === 'es' && post.spaTitle ? post.spaTitle.toUpperCase() : post.title?.toUpperCase()}</h4>
            </div>
            {loading ? <span className="loader" style={{ marginTop: '10rem' }}></span>
                :
                <Post
                    headers={{ ...post, sideImages, sideImgStyles }}
                    content={html}
                    spaContent={spaHtml}
                    linkLang={linkLang}
                />
            }
            <img src={isMobile ? WebSignatureMobile : WebSignature} alt="Signature" draggable={false} className="postviewer__signature" />
            <div className="postviewer__row">
                <div className="postviewer__share-section">
                    <h2 className="postviewer__share-text">{lang === 'es' ? 'Comparte este post' : 'Share this post'}</h2>
                    <img className="postviewer__share-icon" onClick={() => shareToPlatform('instagram')} src={Instagram} />
                    <img className="postviewer__share-icon" onClick={() => shareToPlatform('facebook')} src={Facebook} />
                    <img className="postviewer__share-icon" onClick={() => shareToPlatform('x')} src={X} />
                    <img className="postviewer__share-icon" onClick={() => shareToPlatform('linkedin')} src={Linkedin} />
                    <img className="postviewer__share-icon" onClick={() => shareToPlatform('whatsapp')} src={Whatsapp} />
                </div>
            </div>
            <div className="postviewer__comments-section">
                {/* <h2 className="postviewer__comments-title">{lang === 'es' ? 'Comentarios' : 'Comments'}</h2> */}
                <div className="postviewer__comments-list" style={{ width: isMobile ? '90vw' : '30vw' }}>
                    {postComments.map((comment, i) => <Comment key={i} comment={comment} reply={submitComment} setReply={setSubmitComment} />)}
                </div>
                {!submitComment ?
                    <div className="postviewer__comments-post">
                        <h2 className="postviewer__comments-post-title">{lang === 'es' ? 'Deja tu comentario' : 'Leave a comment'}</h2>
                        <div className="postviewer__comments-reply" style={{ width: isMobile ? '90vw' : '30vw' }}>
                            <InputField
                                name='fullname'
                                value={isLoggedIn ? 'Dany' : data.fullname}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                                disabled={isLoggedIn || false}
                            />
                            {isLoggedIn ? '' :
                                <InputField
                                    name='email'
                                    value={data.email}
                                    updateData={updateData}
                                    placeholder={lang === 'es' ? 'Tu email' : 'Your email'}
                                />}
                            <InputField
                                name='comment'
                                value={data.comment}
                                updateData={updateData}
                                placeholder={lang === 'es' ? 'Tu comentario' : 'Your comment'}
                                type='textarea'
                                rows={8}
                            />
                            <Button
                                label={lang === 'es' ? 'Enviar' : 'Post Comment'}
                                handleClick={postComment}
                                style={{ width: '100%' }}
                                disabled={!data.comment || (!isLoggedIn && !data.fullname)}
                            />
                        </div>
                    </div>
                    : ''}
            </div>
        </div>
    )
}