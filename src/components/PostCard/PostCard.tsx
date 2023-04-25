import React from 'react'

type Props = {
    subtitle: string,
    title: string,
    description: string,
    overlap: string,
    img: string,
}

export default function PostCard({ subtitle, title, description, overlap, img }: Props) {

    return (
        <div className='postcard__container'>
            <div className="postcard__image-div">
                <h4 className="postcard__image-overlap">{overlap}</h4>
                <img src={img} alt="" className="postcard__image" />
            </div>
            <div className="postcard__text">
                <h4 className="postcard__text-subtitle">{subtitle}</h4>
                <h4 className="postcard__text-title">{title}</h4>
                <h4 className="postcard__text-description">{description}</h4>
            </div>
        </div>
    )
}