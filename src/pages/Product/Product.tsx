import React, { useEffect, useState } from 'react'
import { getProductById } from '../../services/product'
import { useHistory, useLocation } from 'react-router-dom'
import { productType } from '../../types'
import Button from '../../components/Button/Button'

type Props = {}

export default function Product({ }: Props) {
    const [product, setProduct] = useState<null | productType>(null)
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const history = useHistory()

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id && !product) getProduct(id)
    }, [location])

    const getProduct = async (id: string) => {
        try {
            setLoading(true)
            const p = await getProductById(id)
            if (p && p._id) setProduct(p)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const buyProduct = () => {
        const a = document.createElement('a')
        const whatsappMessage = `Hi, I'd love to buy this item: ${product?.title}`
        a.href = `https://wa.me/460729678696?text=${encodeURIComponent(whatsappMessage)} [id: ${product?._id}]`
        a.target = '_blank'
        a.click()
        setTimeout(() => a.remove(), 1000)
    }

    return (
        <div className="product__container">
            {loading ? <p>Loading product details...</p>
                :
                !product ? <p>An error occurred while getting the product information. Please <a href='https://store.anechooftheheart.com/'>go back to the store</a> and try again</p>
                    :
                    <div className="product__row">
                        <Button
                            label='Back to the store'
                            handleClick={() => {
                                history.push('/store')
                            }}
                            style={{ left: '0', top: '0', position: 'absolute' }}
                            disabled={loading}
                        />
                        <div className="product__image-wrapper">
                            <img src={product ? product.image : ''} alt={product?.title} className="product__image" />
                        </div>
                        <div className="product__information">
                            <p className="product__title">{product?.title}</p>
                            <p className="product__price">{product?.price} sek</p>
                            <p className="product__description">{product?.description}</p>
                            <Button
                                label='Buy'
                                handleClick={buyProduct}
                                style={{ width: '100%', marginTop: '2rem', fontSize: '1.3rem', padding: '.8rem' }}
                            />
                        </div>
                    </div>
            }
        </div>
    )
}