import React, { useContext, useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { AppContext } from '../../AppContext'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { getAllProducts } from '../../services/product'
import { productType } from '../../types'

type Props = {}

export default function Store({ }: Props) {
  const [products, setProducts] = useState<productType[]>([])
  const [loading, setLoading] = useState(false)
  const { isLoggedIn } = useContext(AppContext)
  const history = useHistory()

  useEffect(() => {
    getProducts()
  }, [])

  const getProducts = async () => {
    try {
      setLoading(true)
      const _products = await getAllProducts()
      if (_products && Array.isArray(_products)) setProducts(_products)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const goToEditStore = () => {
    history.push('/store/edit')
  }

  return (
    <div className="store__container">
      {isLoggedIn && <Button
        label='Edit Store'
        handleClick={goToEditStore}
        style={{
          position: 'absolute',
          right: '2rem',
          top: '2rem'
        }}
      />}
      <h1 className="store__title">Store</h1>
      <div className="store__list">
        {loading ?
          <p>Loading products...</p>
          :
          products.map((product, index) => <ProductCard product={product} index={index} />)}
      </div>
    </div>
  )
}