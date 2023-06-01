import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import ShareIcon from '../../assets/icons/share.svg'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'

type Props = {
    content?: string
    spaContent?: string
    headers: { [key: number | string]: any }
}

export default function Post({ headers, content, spaContent }: Props) {
    const [sideImages, setSideImages] = useState<string[]>([])
    const [spanish, setSpanish] = useState(false)
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        setSpanish(lang === 'es')
    }, [])

    useEffect(() => {
        if (headers.sideImages) setSideImages(headers.sideImages)
    }, [content])

    const copyLink = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl)
        toast.success(TEXT[lang]['link_copied'])
    }

    return (
        <div className='post__container' style={{
            flexDirection: !isMobile && sideImages.length ? 'row' : 'column'
        }}>
            <div className="post__body" style={{
                width: !isMobile && sideImages.length ? '60%' : '100%'
            }}>
                <div className="post__headers">
                    <img className="post__share-icon" onClick={copyLink} src={ShareIcon} />
                    <h1 className="post__title">{spanish && headers.spaTitle ? headers.spaTitle : headers.title || ''}</h1>
                    <h3 className="post__subtitle">{spanish && headers.spaSubtitle ? headers.spaSubtitle : headers.subtitle || ''}</h3>
                </div>
                <img
                    src={headers.imageUrl || ''}
                    alt='Background Image'
                    loading='lazy'
                    className="post__image"
                    style={{

                    }}
                />
                <div
                    className="post__content"
                    dangerouslySetInnerHTML={{ __html: spanish && spaContent ? spaContent : content || '' }}

                />
            </div>
            <div className="post__side-images">
                {sideImages.map((image, i) =>
                    <img key={i} className='post__side-image' src={image} alt='Post Image' loading='lazy' />
                )}
            </div>
        </div>
    )
}