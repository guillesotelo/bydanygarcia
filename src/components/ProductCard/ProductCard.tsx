import React from 'react'
import { productType } from '../../types'
import { useHistory } from 'react-router-dom'

type Props = {
    product?: productType
    style?: React.CSSProperties
    index?: number
}

export default function ProductCard({ product, style, index }: Props) {
    const history = useHistory()

    const {
        title,
        images,
        price,
        description,
        _id
    } = product || {}

    const goToProductPage = () => {
        history.push(`/store/product?id=${_id}`)
    }

    const getMainImage = (images?: string) => {
        const imgs = JSON.parse(images || '[]')
        return imgs[0] || ''
    }

    const getPrice = (price?: number) => {
        return product?.currency ?
            product.currency === '$' ? `$${price}`
                : `${price} ${product.currency}`
            : ''
    }

    return (
        <div
            className="productcard__container"
            onClick={goToProductPage}
            style={{
                ...style,
                animationDelay: String(index ? index / 20 : 0) + 's'
            }}>
            <div className="productcard__image-wrapper">
                <img src={getMainImage(images)} alt={title} className="productcard__image" />
            </div>
            <p className="productcard__title">{title?.split('-')[0]}</p>
            <p className="productcard__price">{getPrice(price)}</p>
        </div>
    )
}