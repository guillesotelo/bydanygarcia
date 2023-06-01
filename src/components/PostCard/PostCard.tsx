import React from 'react'
import { useHistory } from 'react-router-dom'
import postImagePlaceholder from '../../assets/logos/isologo.png'

type Props = {
    subtitle?: string,
    title?: string,
    description?: string,
    overlap?: string,
    img?: string,
    post: { [key: string | number]: any }
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function PostCard({ subtitle, title, description, overlap, img, post, setPost }: Props) {
    const history = useHistory()

    const handleClick = () => {
        setPost({
            ...post,
            sideImages: post.sideImgs ? JSON.parse(post.sideImgs) : []
        })
        if (post._id) history.push(`/post?id=${post._id}`)
    }

    return (
        <div className='postcard__container' onClick={handleClick}>
            <div className="postcard__image-div" >
                <h4 className="postcard__image-overlap">{overlap || post.overlap || ''}</h4>
                <img
                    src={img || post.imageUrl || postImagePlaceholder}
                    alt="Post Image"
                    className="postcard__image"
                    style={{
                        objectFit: !img && !post.imageUrl ? 'contain' : 'cover',
                        minWidth: !img && !post.imageUrl ? '50%' : '100%',
                        height: !img && !post.imageUrl ? '50%' : '100%',
                    }}
                />
            </div>
            <div className="postcard__text">
                <h4 className="postcard__text-subtitle">{subtitle || post.subtitle || ''}</h4>
                <h4 className="postcard__text-title">{title || post.title || ''}</h4>
                <h4 className="postcard__text-description">{description || post.description || ''}</h4>
            </div>
        </div>
    )
}