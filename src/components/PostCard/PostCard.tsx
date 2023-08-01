import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import postImagePlaceholder from '../../assets/logos/isologo.png'
import { AppContext } from '../../AppContext'

type Props = {
    post: { [key: string | number]: any }
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostCard({ post, setPost }: Props) {
    const [spanish, setSpanish] = useState(false)
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        setSpanish(lang === 'es')
    }, [])

    const handleClick = () => {
        setPost({
            ...post,
            sideImages: post.sideImgs ? JSON.parse(post.sideImgs) : [],
            sideStyles: post.sideStyles ? JSON.parse(post.sideStyles) : []
        })
        if (post._id) history.push(`/post?id=${post._id}`)
    }

    const getPreview = () => {
        return post.imageUrl || JSON.parse(post.sideImgs || '[]')[0] || postImagePlaceholder
    }

    return (
        <div className='postcard__container' onClick={handleClick}>
            <div className="postcard__image-div" >
                <h4 className="postcard__image-overlap">{spanish && post.spaOverlap ? post.spaOverlap : post.overlap || ''}</h4>
                <img
                    src={getPreview()}
                    alt="Post Image"
                    className="postcard__image"
                    style={{
                        objectFit: !post.imageUrl && !JSON.parse(post.sideImgs || '[]')[0] ? 'contain' : 'cover',
                        minWidth: !post.imageUrl && !JSON.parse(post.sideImgs || '[]')[0] ? '50%' : '100%',
                        height: !post.imageUrl && !JSON.parse(post.sideImgs || '[]')[0] ? '50%' : '100%',
                    }}
                />
            </div>
            <div className="postcard__text">
                <h4 className="postcard__text-subtitle">{spanish && post.spaSubtitle ? post.spaSubtitle : post.subtitle || ''}</h4>
                <h4 className="postcard__text-title">{spanish && post.spaTitle ? post.spaTitle : post.title || ''}</h4>
                <h4 className="postcard__text-description">{spanish && post.spaDescription ? post.spaDescription : post.description || ''}</h4>
            </div>
        </div>
    )
}