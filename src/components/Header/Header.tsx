import React from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Pinterest from '../../assets/icons/pinterest.svg'
import Youtube from '../../assets/icons/youtube.svg'
import Search from '../../assets/icons/search-icon.svg'
import { useHistory } from 'react-router-dom'

type Props = {}

export default function Header({ }: Props) {
    const history = useHistory()

    return (
        <div className='header__container'>
            <div className='header__menu'>
                <img className="header__menu-svg" src={Menu} />
            </div>
            <div className="header__logo">
                <h4 className="header__logo-text" onClick={() => history.push('/')}>by DANY GARCIA</h4>
            </div>
            <div className="header__items">
                <div className="header__item">
                    <h4 className="header__item-text" onClick={() => history.push('/blog')}>BLOG</h4>
                    <img className="header__item-svg" src={ChevronDown} />
                </div>
                <div className="header__item">
                    <h4 className="header__item-text">JOURNAL</h4>
                    <img className="header__item-svg" src={ChevronDown} />
                </div>
                <div className="header__item">
                    <h4 className="header__item-text">BESPOKEN</h4>
                    <img className="header__item-svg" src={ChevronDown} />
                </div>
                <div className="header__item">
                    <h4 className="header__item-text">DISCOVER</h4>
                    <img className="header__item-svg" src={ChevronDown} />
                </div>
                <div className="header__item">
                    <h4 className="header__item-text">ABOUT</h4>
                    {/* <img className="header__item-svg" src={ChevronDown} /> */}
                </div>
                <div className="header__social">
                    <img className="header__social-svg" src={Instagram} />
                    <img className="header__social-svg" src={Pinterest} />
                    <img className="header__social-svg" src={Youtube} />
                </div>
                <div className="header__search">
                    <img className="header__search-svg" src={Search} />
                    <input type="text" className="header__search-input" placeholder='Search' />
                </div>
            </div>
        </div>
    )
}