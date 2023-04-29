import React from 'react'
import { useHistory } from 'react-router-dom'

type Props = {
    subtitle?: string,
    title?: string,
    description?: string,
    overlap?: string,
    img?: string,
    post: { [key: string | number]: any }
}

export default function PostCard({ subtitle, title, description, overlap, img, post }: Props) {
    const history = useHistory()
    const handleClick = () => post._id ? history.push(`/post?id=${post._id}`) : ''

    return (
        <div className='postcard__container' onClick={handleClick}>
            <div className="postcard__image-div">
                <h4 className="postcard__image-overlap">{overlap || post.overlap || ''}</h4>
                <img src={img || post.imageUrl || ''} alt="" className="postcard__image" />
            </div>
            <div className="postcard__text">
                <h4 className="postcard__text-subtitle">{subtitle || post.subtitle || ''}</h4>
                <h4 className="postcard__text-title">{title || post.title || ''}</h4>
                <h4 className="postcard__text-description">{description || post.description || ''}</h4>
            </div>
        </div>
    )
}