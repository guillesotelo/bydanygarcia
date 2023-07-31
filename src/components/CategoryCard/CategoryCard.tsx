import React from 'react'
import { dataObj } from '../../types'
import postImagePlaceholder from '../../assets/logos/isologo.png'
import { useHistory } from 'react-router-dom'

type Props = {
    images?: any[]
    title?: string
    subtitle?: string
    delay?: string
    category: string
}

export default function CategoryCard({ images, title, subtitle, category }: Props) {
    const history = useHistory()

    return (
        <div className="category-card__container" onClick={() => history.push(`/blog?category=${category}`)}>
            <div className="category-card__images">
                <img src={images ? images[0] : postImagePlaceholder} className='category-card__image-large' loading='lazy' />
                <div className="category-card__images-col">
                    {images?.map((image: any, i: number) =>
                        i > 0 ?
                            <img 
                            key={i} 
                            src={image || postImagePlaceholder} 
                            className='category-card__image'  
                            style={{ 
                                height: !images[2] ? '100%' : '50%',
                                marginBottom: !images[2] ? '0' : '2px'
                            }} 
                            loading='lazy' 
                            />
                            : ''
                    )}
                </div>
            </div>
            <h3 className='category-card__title'>{title}</h3>
            <h4 className='category-card__subtitle'>{subtitle}</h4>
        </div>
    )
}