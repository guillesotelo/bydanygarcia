import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import postImagePlaceholder from '../../assets/logos/isologo.png'
import { AppContext } from '../../AppContext'
import Lock from '../../assets/icons/lock.svg'
import { postType } from '../../types'

type Props = {
    post: postType
    index: number
    style?: React.CSSProperties
}

export default function PostCard({ post, index, style }: Props) {
    const [spanish, setSpanish] = useState(false)
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        setSpanish(lang === 'es')
    }, [])

    const handleClick = () => {
        if (post.title) history.push(`/post/${(post.title || post.spaTitle)?.replaceAll(' ', '-')}`)
    }

    const getPreview = () => {
        return post.imageUrl || JSON.parse(post.sideImgs || '[]')[0] || postImagePlaceholder
    }

    const getOverlap = () => {
        const readMore = spanish ? 'Ver post' : 'See post'
        return spanish && post.spaOverlap ? post.spaOverlap : post.overlap ? post.overlap : spanish && post.spaDescription ? post.spaDescription : post.description || readMore
    }

    return (
        <div
            className='postcard__container'
            onClick={handleClick}
            style={{
                opacity: !post.published ? '.5' : '1',
                width: isMobile ? '70%' : index % 5 === 0 ? '45%' : '',
                ...style
            }}
        >
            <div className="postcard__image-div" >
                {!post.published ? <img src={Lock} alt="Not Published" className="postcard__image-lock" /> : ''}
                <h4 className="postcard__image-overlap">{getOverlap()}</h4>
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
                <h4 className="postcard__text-subtitle">{spanish && post.spaSubtitle ? post.spaSubtitle : post.subtitle || post.spaSubtitle || ''}</h4>
                <h4 className="postcard__text-title">{spanish && post.spaTitle ? post.spaTitle : post.title || post.spaTitle || ''}</h4>
                {/* <h4 className="postcard__text-description">{spanish && post.spaDescription ? post.spaDescription : post.description || post.spaDescription || ''}</h4> */}
            </div>
        </div>
    )
}