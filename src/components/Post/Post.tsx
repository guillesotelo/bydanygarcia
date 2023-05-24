import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ShareIcon from '../../assets/icons/share.svg'

type Props = {
    content?: string
    headers: { [key: number | string]: any }
}

export default function Post({ headers, content }: Props) {

    const copyLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        toast.success('Link copied to clipboard')
    }

    return (
        <div className='post__container'>
            <div className="post__headers">
                <img className="post__share-icon" onClick={copyLink} src={ShareIcon} />
                <h1 className="post__title">{headers.title || ''}</h1>
                <h3 className="post__subtitle">{headers.subtitle || ''}</h3>
            </div>
            <img src={headers.imageUrl || ''} alt="" className="post__image" />
            <div className="post__content" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
        </div>
    )
}