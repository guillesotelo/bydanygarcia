import React, { SyntheticEvent, useContext, useEffect, useState } from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Pinterest from '../../assets/icons/pinterest.svg'
import Youtube from '../../assets/icons/youtube.svg'
import Search from '../../assets/icons/search-icon.svg'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { deletePost, getAllPosts } from '../../services'
import { toast } from 'react-hot-toast'
import { APP_VERSION } from '../../constants/app'
import { AppContext } from '../../AppContext'

type Props = {
    search: string[]
    setSearch: (value: string[]) => void
}

export default function Header({ search, setSearch }: Props) {
    const [postId, setPostId] = useState('')
    const [prompt, setPrompt] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [searchClicked, setSearchClicked] = useState(false)
    const { lang, isMobile } = useContext(AppContext)
    const history = useHistory()
    const location = useLocation()

    useEffect(() => {
        const menu = document.querySelector('.header__menu')
        const svg = document.querySelector('.header__menu-svg')
        const container = document.querySelector('.header__container')
        const list = document.querySelector('.home__postlist')
        const home = document.querySelector('.home__container')
        window.addEventListener('mouseup', e => {
            const clicked = e.target
            if (clicked != menu) setMenuToggle(false)
            if (clicked == svg
                || clicked == container
                || clicked == home
                || clicked == menu
                || clicked == list) {
                setSearchClicked(false)
            }
        })
    }, [])

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
        if (user && user.token && user.username) setIsAdmin(true)

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

    const handleSearch = (e: any) => {
        const { value } = e.target
        setPrompt(value)
    }

    const triggerSearch = () => {
        setSearchClicked(true)
        if (prompt) {
            setSearchClicked(false)
            setSearch(prompt.split(' '))
            history.push('/search')
        }
    }

    const handleDeletePost = async () => {
        await toast.promise(
            deletePost({ _id: postId }),
            {
                loading: 'Deleting post...',
                success: <b>Post deleted successfully. Redirecting...</b>,
                error: <b>Error deleting post</b>,
            }
        )
        setDeleteModal(false)
        setTimeout(() => history.push('/blog'), 1500)
    }

    const logOut = () => {
        localStorage.clear()
        toast.success('See you later!')
        setTimeout(() => {
            setIsAdmin(false)
            setPostId('')
            history.push('/')
        }, 1500)
    }

    return (
        <div className='header__container'>
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
            {isMobile ?
                <div className='header__menu' onClick={() => setMenuToggle(!menuToggle)}>
                    <img className="header__menu-svg" src={Menu} />
                    <div className={`header__menu-sidebar${menuToggle ? '--toggled' : '--hidden'}`}>
                        <div className="header__menu-item" style={{ marginTop: isMobile ? '6vw' : '2vw' }}>
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/blog')
                            }}>BLOG</h4>
                        </div>
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/bespoken')
                            }}>BESPOKEN</h4>
                        </div>
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/baby-and-you')
                            }}>BABY & YOU</h4>
                        </div>
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/subscribe')
                            }}>SUBSCRIBE</h4>
                        </div>
                        <div className="header__menu-item">
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/about')
                            }}>WHO AM I</h4>
                        </div>
                        <div className="header__menu-item" style={{ paddingBottom: '8vw' }}>
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                history.push('/contact')
                            }}>CONTACT</h4>
                        </div>
                        <div className="header__menu-item" style={{ paddingTop: '8vw' }}>
                            <h4 className="header__menu-item-text" onClick={() => {
                                setTimeout(() => setMenuToggle(false), 50)
                                if (isAdmin) return logOut()
                                history.push('/login')
                            }}>{isAdmin ? 'LOGOUT' : 'LOGIN'}</h4>
                        </div>
                        <div className="header__menu-item" style={{
                            // position: 'relative'
                        }}>
                            <h4 className="header__menu-item-text" style={{
                                position: 'fixed',
                                bottom: '15%',
                                marginBottom: '4vw',
                                color: 'gray',
                                fontSize: isMobile ? '3vw' : '.7vw'
                            }}
                                onClick={() => window.open('https://github.com/guillesotelo/bydanygarcia', '_blank', 'noreferrer')}>{APP_VERSION}</h4>
                        </div>
                    </div>
                </div>
                : ''}
            {(!isMobile && !searchClicked) || !isAdmin ?
                <div className="header__logo" onClick={() => {
                    setSearch([])
                    setPrompt('')
                    history.push('/')
                }}>
                    <h4 className="header__logo-text">by DANY GARCIA</h4>
                </div>
                : ''}
            {isMobile && isAdmin ?
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
            {!isMobile ?
                <div className="header__items">
                    <div className="header__item" onClick={() => history.push('/blog')}>
                        <h4 className="header__item-text">BLOG</h4>
                    </div>
                    <div className="header__item">
                        <h4 className="header__item-text">JOURNAL</h4>
                        <img className="header__item-svg" src={ChevronDown} />
                        <div className="header__item-dropdown">
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    WHAT I'VE LEARNED
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    HYGGE
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    LIFE IN THE NORTH
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="header__item">
                        <h4 className="header__item-text">BESPOKEN</h4>
                        <img className="header__item-svg" src={ChevronDown} />
                        <div className="header__item-dropdown">
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    SHOP
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    THE BRANCH
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="header__item">
                        <h4 className="header__item-text">DISCOVER</h4>
                        <img className="header__item-svg" src={ChevronDown} />
                        <div className="header__item-dropdown">
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    BABY & YOU
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    TRAVEL & CONTEMPLATION
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    MINDFULNESS
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row">
                                <h4 className="header__item-dropdown-text">
                                    VIDEOS
                                </h4>
                            </div>
                        </div>
                    </div>
                    <div className="header__item" onClick={() => history.push('/about')}>
                        <h4 className="header__item-text">ABOUT</h4>
                        {/* <img className="header__item-svg" src={ChevronDown} /> */}
                    </div>
                    <div className="header__social">
                        <img className="header__social-svg" onClick={() => window.open('https://www.instagram.com/by.danygarcia/', '_blank', 'noreferrer')} src={Instagram} />
                        <img className="header__social-svg" onClick={() => window.open('https://www.pinterest.se/bespoken_ar/', '_blank', 'noreferrer')} src={Pinterest} />
                        <img className="header__social-svg" onClick={() => window.open('https://www.youtube.com/@bydanygarcia5800', '_blank', 'noreferrer')} src={Youtube} />
                    </div>
                    <div className="header__admin-btns">
                        {isAdmin ?
                            <Button
                                label='CREATE'
                                handleClick={() => history.push('/editor?new=true')}
                                bgColor='#ece7e6'
                            /> : ''}
                        {postId && isAdmin ?
                            <Button
                                svg={EditIcon}
                                handleClick={() => history.push(`/editor?id=${postId}`)}
                                bgColor='#ece7e6'
                            />
                            : ''}
                        {postId && isAdmin ?
                            <Button
                                svg={DeleteIcon}
                                handleClick={() => setDeleteModal(true)}
                                bgColor='#ece7e6'
                            />
                            : ''}
                        <div className="header__item">
                            <h4 className="header__item-text" onClick={() => {
                                if (isAdmin) logOut()
                                else history.push('/login')
                            }}>{isAdmin ? 'LOGOUT' : 'LOGIN'}</h4>
                        </div>
                    </div>
                </div>
                : ''}
            <div className="header__search">
                <img className="header__search-svg" src={Search} onClick={triggerSearch} />
                {searchClicked || !isMobile ?
                    <input type="text" className="header__search-input" placeholder='Search' onChange={handleSearch} onKeyDown={e => {
                        if (e.key === 'Enter') triggerSearch()
                    }} />
                    : ''}
            </div>
        </div>
    )
}