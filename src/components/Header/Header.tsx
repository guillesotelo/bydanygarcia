import React from 'react'
import Menu from '../../assets/icons/menu-icon.svg'

type Props = {}

export default function Header({}: Props) {
  return (
    <div className='header__container'>
        <img className="header__menu" src={Menu}/>
        <div className="header__logo">
            <h4 className="header__logo-text">by Dany Garcia</h4>
        </div>
        <div className="header__items">
            <div className="header__item">
                <h4 className="header__item-text"></h4>
            </div>
            <div className="header__item">
                <h4 className="header__item-text"></h4>
            </div>
            <div className="header__item">
                <h4 className="header__item-text"></h4>
            </div>
            <div className="header__item">
                <h4 className="header__item-text"></h4>
            </div>
            <div className="header__item">
                <h4 className="header__item-text"></h4>
            </div>
        </div>
    </div>
  )
}