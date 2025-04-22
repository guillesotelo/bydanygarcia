import React, { useContext } from 'react'
import ProductCard from '../../components/ProductCard/ProductCard'
import { AppContext } from '../../AppContext'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function Store({ }: Props) {
  const { isLoggedIn } = useContext(AppContext)
  const history = useHistory()

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

        <ProductCard
          product={{
            _id: "1",
            title: "Dry Flower Ring",
            image: "https://i.pinimg.com/236x/b5/88/8e/b5888e0fbc3592af01a29fd5bdde7dd9.jpg",
            price: 599
          }}
        />
        <ProductCard
          product={{
            _id: "2",
            title: "Seasonal Boutonniere",
            image: "https://i.pinimg.com/736x/e8/d3/ba/e8d3ba4c73c015e229243ab6acf77b8d.jpg",
            price: 299
          }}
        />
        <ProductCard
          product={{
            _id: "3",
            title: "Christmas Ring",
            image: "https://i.pinimg.com/736x/f0/31/4e/f0314e39f4fe59931d5460df3376d319.jpg",
            price: 699
          }}
        />

      </div>
    </div>
  )
}