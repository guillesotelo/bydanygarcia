import React, { useEffect, useState } from 'react'

type Props = {
    content?: string
    headers: { [key: number | string]: any }
}

export default function Post({ headers, content }: Props) {

    return (
        <div className='post__container'>
            <div className="post__headers">
                <h1 className="post__title">{headers.title || ''}</h1>
                <h3 className="post__subtitle">{headers.subtitle || ''}</h3>
            </div>
            <img src={headers.imageUrl || ''} alt="" className="post__image" />
            <div className="post__content" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
        </div>
    )
}