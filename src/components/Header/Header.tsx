import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Search from '../../assets/icons/search-icon.svg'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { deletePost, getAllPosts, verifyToken } from '../../services'
import { toast } from 'react-hot-toast'
import { APP_VERSION } from '../../constants/app'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import byDanyLogo from '../../assets/logos/logo_cropped.png'

type Props = {
    search: string[]
    setSearch: (value: string[]) => void
}

export default function Header({ search, setSearch }: Props) {
    const { lang, setLang, isMobile } = useContext(AppContext)
    const [postId, setPostId] = useState('')
    const [prompt, setPrompt] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [searchClicked, setSearchClicked] = useState(false)
    const [bigHeader, setBigHeader] = useState(true)
    const history = useHistory()
    const location = useLocation()
    const { setIsLoggedIn, isLoggedIn } = useContext(AppContext)

    useEffect(() => {
        const svg = document.querySelector('.header__menu-svg')
        const container = document.querySelector('.header__container')
        const list = document.querySelector('.home__postlist')
        const home = document.querySelector('.home__container')
        const blog = document.querySelector('.blog__container')
        window.addEventListener('mouseup', e => {
            const clicked = e.target
            if (clicked !== svg) setMenuToggle(false)
            if (clicked == container
                || clicked == home
                || clicked == blog
                || clicked == list) {
                setSearchClicked(false)
            }
        })
        activateHeaderHeight()
        verifyUser()
    }, [])

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id) setPostId(id)
        else setPostId('')
    }, [location])

    useEffect(() => {
        const postViewr = document.querySelector<HTMLElement>('.postviewer__container')
        const postEditor = document.querySelector<HTMLElement>('.editor__container')
        if (postViewr) {
            if (deleteModal) postViewr.style.filter = 'blur(10px)'
            else postViewr.style.filter = ''
        }
        if (postEditor) {
            if (deleteModal) postEditor.style.filter = 'blur(10px)'
            else postEditor.style.filter = ''
        }
    }, [deleteModal])

    const verifyUser = async () => {
        try {
            const isLodded = await verifyToken()
            if (isLodded) setIsLoggedIn(isLodded)
        } catch (err) {
            console.error(err)
        }
    }

    const activateHeaderHeight = () => {
        window.addEventListener('scroll', function () {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop
            if (scrollTop > 200) setBigHeader(false)
            else setBigHeader(true)
        })
    }

    const handleSearch = (e: any) => {
        const { value } = e.target
        setPrompt(value)
    }

    const triggerSearch = () => {
        setSearchClicked(true)
        if (prompt.trim()) {
            setSearchClicked(false)
            setSearch(prompt.split(' '))
            history.push('/search')
        }
    }

    const handleDeletePost = async () => {
        await toast.promise(
            deletePost({ _id: postId }),
            {
                loading: TEXT[lang]['deleting_post'],
                success: <b>Post deleted successfully. Redirecting...</b>,
                error: <b>Error deleting post</b>,
            }
        )
        setDeleteModal(false)
        setTimeout(() => history.push('/blog'), 1500)
    }

    const logOut = () => {
        localStorage.clear()
        toast.success(TEXT[lang]['see_you_later'])
        setTimeout(() => {
            setIsLoggedIn(false)
            setPostId('')
            history.push('/')
        }, 1500)
    }

    const changeLanguage = (language: string) => {
        setLang(language)
        localStorage.setItem('preferedLang', language)
    }

    return (
        <div className='header__container' style={{ height: bigHeader ? '10vw' : '4vw' }}>
            {deleteModal ?
                <div className='header__delete-modal'>
                    <h4 className="header__delete-modal-text">Are you sure you want to delete this post?</h4>
                    <div className="header__delete-modal-btns">
                        <Button
                            label='Cancel'
                            handleClick={() => setDeleteModal(false)}
                            bgColor='lightgray'
                        />
                        <Button
                            label='Delete'
                            handleClick={handleDeletePost}
                        />
                    </div>
                </div>
                : ''}
            {!isMobile ?
                <>
                    <div className="header__items" style={{ height: bigHeader ? '10vw' : '4vw' }}>
                        <div className="header__item">
                            <h4 className="header__item-text" onClick={() => history.push('/blog')}>{TEXT[lang]['blog']}</h4>
                            <img className="header__item-svg" src={ChevronDown} />
                            <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '7vw' : '4vw' }}>
                                <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['life_abroad']}
                                    </h4>
                                </div>
                                <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['motherhood']}
                                    </h4>
                                </div>
                                {/* <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text" onClick={() => history.push('/subscribe')}>
                                        {TEXT[lang]['subscribe']}
                                    </h4>
                                </div> */}
                            </div>
                        </div>
                        <div className="header__item">
                            <h4 className="header__item-text" onClick={() => history.push('/blog')}>{TEXT[lang]['bespoken']}</h4>
                            <img className="header__item-svg" src={ChevronDown} />
                            <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '7vw' : '4vw' }}>
                                <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['story_of_brand']}
                                    </h4>
                                </div>
                                <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['products']}
                                    </h4>
                                </div>
                                <div className="header__item-dropdown-row">
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['our_diy_wedding']}
                                    </h4>
                                </div>
                            </div>
                        </div>
                        <div className="header__item" onClick={() => history.push('/about')}>
                            <h4 className="header__item-text">{TEXT[lang]['about_greeting']}</h4>
                        </div>
                    </div>

                    {!searchClicked || !isLoggedIn ?
                        <div className="header__logo"
                            onClick={() => {
                                setSearch([])
                                setPrompt('')
                                history.push('/')
                            }}>
                            {/* <h4 className="header__logo-text">by DANY GARCIA</h4> */}
                            <img
                                className="header__logo-image"
                                style={{
                                    height: bigHeader ? '6vw' : '3vw',
                                    margin: bigHeader ? '0 3vw 1vw 3vw' : '0 3vw .5vw 3vw'
                                }}
                                src={byDanyLogo}
                                alt='by Dany Garcia'
                                loading='lazy' />
                        </div>
                        : ''}

                    <div className='header__admin-search'>
                        <div className="header__admin-btns">
                            {isLoggedIn ?
                                <Button
                                    label='CREATE'
                                    handleClick={() => history.push('/editor?new=true')}
                                    bgColor='#ece7e6'
                                /> : ''}
                            {postId && isLoggedIn ?
                                <Button
                                    svg={EditIcon}
                                    handleClick={() => history.push(`/editor?id=${postId}`)}
                                    bgColor='#ece7e6'
                                />
                                : ''}
                            {postId && isLoggedIn ?
                                <Button
                                    svg={DeleteIcon}
                                    handleClick={() => setDeleteModal(true)}
                                    bgColor='#ece7e6'
                                />
                                : ''}
                            {isLoggedIn ?
                                <div className="header__item">
                                    <h4 className="header__item-text" onClick={logOut}>LOGOUT</h4>
                                </div>
                                : ''}
                        </div>

                        <div className="header__search" >
                            <div className="header__item header__language" style={{ justifySelf: 'flex-end' }}>
                                <h4 className="header__item-text">{lang.toUpperCase()}</h4>
                                <img className="header__item-svg" src={ChevronDown} />
                                <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '7vw' : '4vw' }}>
                                    <div className="header__item-dropdown-row" onClick={() => changeLanguage('en')}>
                                        <h4 className="header__item-dropdown-text">
                                            ENGLISH
                                        </h4>
                                    </div>
                                    <div className="header__item-dropdown-row" onClick={() => changeLanguage('es')}>
                                        <h4 className="header__item-dropdown-text">
                                            ESPAÑOL
                                        </h4>
                                    </div>
                                </div>
                            </div>
                            <img className="header__search-svg" src={Search} onClick={triggerSearch} />
                            {searchClicked || !isMobile ?
                                <input type="text" className="header__search-input" placeholder={TEXT[lang]['search']} onChange={handleSearch} onKeyDown={e => {
                                    if (e.key === 'Enter') triggerSearch()
                                }} />
                                : ''}
                        </div>
                    </div>
                </>
                : ''}
            {isMobile ?
                <div className='header__menu' onClick={() => setMenuToggle(!menuToggle)} >
                    <img className="header__menu-svg" src={Menu} />
                    <div className={`header__menu-sidebar${menuToggle ? '--toggled' : '--hidden'}`}>
                        <div className="header__menu-item" style={{ marginTop: isMobile ? '6vw' : '2vw' }}>
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/blog')
                            }}>{TEXT[lang]['blog']}</h4>
                        </div>
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/bespoken')
                            }}>{TEXT[lang]['bespoken']}</h4>
                        </div>
                        {/* <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/subscribe')
                            }}>{TEXT[lang]['subscribe']}</h4>
                        </div> */}
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" style={{ paddingBottom: '8vw' }} onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/about')
                            }}>{TEXT[lang]['about_greeting']}</h4>
                        </div>
                        <div className="header__menu-item header__language">
                            <h4 className="header__menu-item-text" onClick={() => {
                                changeLanguage(lang === 'en' ? 'es' : 'en')
                                setTimeout(() => setMenuToggle(false), 1000)
                            }}>{lang === 'es' ? '[ES]' : '[EN]'}</h4>
                        </div>
                        {isLoggedIn ?
                            <div className="header__menu-item" >
                                <h4 className="header__menu-item-text" onClick={() => {
                                    setTimeout(() => setMenuToggle(false), 50)
                                    logOut()
                                }}>LOGOUT</h4>
                            </div>
                            : ''}
                        <div className="header__menu-item" style={{
                            // position: 'relative'
                        }}>
                            <h4 className="header__menu-item-text" style={{
                                position: 'fixed',
                                bottom: '20%',
                                marginBottom: '4vw',
                                color: 'gray',
                                fontSize: isMobile ? '3vw' : '.7vw'
                            }}
                                onClick={() => window.open('https://github.com/guillesotelo/bydanygarcia', '_blank', 'noreferrer')}>{APP_VERSION}</h4>
                        </div>
                    </div>
                </div>
                : ''}
            {isMobile && isLoggedIn && !searchClicked ?
                <div className="header__admin-btns" style={{ margin: '0 4vw', gap: '3vw' }}>
                    <Button
                        label='CREATE'
                        handleClick={() => history.push('/editor?new=true')}
                        bgColor='#ece7e6'
                    />
                    {postId ?
                        <Button
                            svg={EditIcon}
                            handleClick={() => history.push(`/editor?id=${postId}`)}
                            bgColor='#ece7e6'
                        />
                        : ''}
                    {postId ?
                        <Button
                            svg={DeleteIcon}
                            handleClick={() => setDeleteModal(true)}
                            bgColor='#ece7e6'
                        />
                        : ''}
                </div>
                : ''}
            {isMobile && !searchClicked && !isLoggedIn ?
                <div className="header__logo"
                    onClick={() => {
                        setSearch([])
                        setPrompt('')
                        history.push('/')
                    }}>
                    {/* <h4 className="header__logo-text">by DANY GARCIA</h4> */}
                    <img
                        className="header__logo-image"
                        src={byDanyLogo}
                        alt='by Dany Garcia'
                        loading='lazy' />
                </div>
                : ''}
            {isMobile ?
                <div className="header__search" >
                    <img className="header__search-svg" src={Search} onClick={triggerSearch} />
                    {searchClicked || !isMobile ?
                        <input type="text" className="header__search-input" placeholder={TEXT[lang]['search']} onChange={handleSearch} onKeyDown={e => {
                            if (e.key === 'Enter') triggerSearch()
                        }} />
                        : ''}
                </div>
                : ''}
        </div>
    )
}