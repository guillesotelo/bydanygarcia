import React, { useEffect, useState } from 'react'
import { getProductById } from '../../services/product'
import { useLocation } from 'react-router-dom'
import { productType } from '../../types'

type Props = {}

export default function Product({ }: Props) {
    const [product, setProduct] = useState<null | productType>(null)
    const location = useLocation()

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id && !product) getProduct(id)
    }, [location])

    const getProduct = async (id: string) => {
        try {
            const p = await getProductById(id)
            if (p && p._id) setProduct(p)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="product__container">
            <div className="product__row">
                <div className="product__image-wrapper">
                    <img src={product ? product.image : ''} alt={product?.title} className="product__image" />
                </div>
                <div className="product__information">
                    <p className="product__title">{product?.title}</p>
                    <p className="product__price">{product?.price} sek</p>
                    <p className="product__description">{product?.description}</p>
                </div>
            </div>
        </div>
    )
}