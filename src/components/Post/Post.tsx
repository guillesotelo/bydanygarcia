import React, { useEffect, useState } from 'react'

type Props = {
    content?: string
    headers: { [key: number | string]: any }
}

export default function Post({ headers, content }: Props) {

    return (
        <div className='post__container'>
            <div className="post__headers">
                <h4 className="post__title">{headers.title || ''}</h4>
                <h4 className="post__subtitle">{headers.subtitle || ''}</h4>
            </div>
            <div className="post__content" dangerouslySetInnerHTML={{ __html: content || '' }}></div>
        </div>
    )
}