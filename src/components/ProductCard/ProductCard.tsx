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
        image,
        price,
        description,
        _id
    } = product || {}

    const goToProductPage = () => {
        history.push(`/product?id=${_id}`)
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
                <img src={image} alt={title} className="productcard__image" />
            </div>
            <p className="productcard__title">{title}</p>
            <p className="productcard__price">{price} sek</p>
        </div>
    )
}