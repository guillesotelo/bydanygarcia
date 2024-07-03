import { useContext, useEffect, useState } from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Search from '../../assets/icons/search-icon.svg'
import SpainFlag from '../../assets/icons/spain-flag.png'
import UsaFlag from '../../assets/icons/usa-flag.png'
import { useHistory, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import NotificationIcon from '../../assets/icons/notification.svg'
import { deletePost, verifyToken } from '../../services'
import { toast } from 'react-hot-toast'
import { APP_VERSION } from '../../constants/app'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import byDanyLogo from '../../assets/logos/logo_cropped.png'
import { onChangeEventType, postType } from '../../types'

type Props = {
    search: string[]
    setSearch: (value: string[]) => void
    bespokenLogo?: string
}

export default function Header({ search, setSearch, bespokenLogo }: Props) {
    const { lang, setLang, isMobile } = useContext(AppContext)
    const [postId, setPostId] = useState('')
    const [prompt, setPrompt] = useState('')
    const [deleteModal, setDeleteModal] = useState(false)
    const [menuToggle, setMenuToggle] = useState(false)
    const [blogToggle, setBlogToggle] = useState(false)
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
            if (clicked === container
                || clicked === home
                || clicked === blog
                || clicked === list) {
                setSearchClicked(false)
            }
        })
        activateHeaderHeight()
        if (localStorage.getItem('user')) verifyUser()
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

    const handleSearch = (e: onChangeEventType) => {
        const { value } = e.target
        setPrompt(value)
    }

    const triggerSearch = () => {
        if (isMobile) setSearchClicked(true)
        if (prompt.trim()) {
            setSearchClicked(false)
            setSearch(prompt.split(' '))
            history.push('/search')
            setPrompt('')
        }
    }

    const handleDeletePost = async () => {
        try {
            await toast.promise(
                deletePost({ _id: postId }),
                {
                    loading: TEXT[lang]['deleting_post'],
                    success: <b>Post deleted successfully. Redirecting...</b>,
                    error: <b>Error deleting post</b>,
                }
            )
            setDeleteModal(false)
            localStorage.removeItem('posts')
            setTimeout(() => history.push('/blog'), 1500)
        } catch (err) {
            console.error(err)
            setDeleteModal(false)
            toast.error('An error occurred while trying to delete the post')
        }
    }

    const logOut = () => {
        localStorage.clear()
        toast.success(TEXT[lang]['see_you_later'])
        setTimeout(() => {
            setIsLoggedIn(false)
            const posts = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
            localStorage.setItem('posts', posts.filter((post: postType) => post.published))
            setPostId('')
            history.push('/')
        }, 1500)
    }

    const changeLanguage = (language: string) => {
        setLang(language)
        localStorage.setItem('preferedLang', language)
    }

    const renderMobile = () => {
        return (
            <>
                <div className='header__menu' onClick={() => setMenuToggle(!menuToggle)} >
                    <img className="header__menu-svg" src={Menu} />
                    <div className={`header__menu-sidebar${menuToggle ? '--toggled' : '--hidden'}`}>
                        <div className="header__menu-item" style={{ marginTop: isMobile ? '6vw' : '2vw' }}>
                            <h4 className="header__menu-item-text" onClick={() => {
                                // setTimeout(() => setMenuToggle(false), 50)
                                // history.push('/blog')
                                setBlogToggle(!blogToggle)
                            }}>{TEXT[lang]['blog']}</h4>
                        </div>
                        {blogToggle ?
                            <div className="header__menu-subitem">
                                <h4 
                                className="header__menu-subitem-text" 
                                onClick={() => {
                                    setTimeout(() => setMenuToggle(false), 50)
                                    history.push('/blog?category=inspiration')
                                }}>{TEXT[lang]['inspiration']}</h4>
                                <h4 
                                className="header__menu-subitem-text" 
                                style={{ animationDelay: '.2s' }}
                                onClick={() => {
                                    setTimeout(() => setMenuToggle(false), 50)
                                    history.push('/blog?category=motherhood')
                                }}>{TEXT[lang]['motherhood']}</h4>
                                <h4 
                                className="header__menu-subitem-text" 
                                style={{ animationDelay: '.4s' }}
                                onClick={() => {
                                    setTimeout(() => setMenuToggle(false), 50)
                                    history.push('/blog?category=life_abroad')
                                }}>{TEXT[lang]['life_abroad']}</h4>
                            </div>
                            : ''}
                        {!blogToggle ?
                            <>
                                <div className="header__menu-item">
                                    <h4 className="header__menu-item-text" onClick={() => {
                                        setTimeout(() => setMenuToggle(false), 50)
                                        history.push('/bespoken/home')
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
                                    <div className="header__menu-item-text" onClick={() => {
                                        changeLanguage(lang === 'en' ? 'es' : 'en')
                                        setTimeout(() => setMenuToggle(false), 1000)
                                    }}>
                                        {lang === 'es' ?
                                            <img src={UsaFlag} alt="" className="header__item-dropdown-img header__item-dropdown-text" />
                                            : <img src={SpainFlag} alt="" className="header__item-dropdown-img header__item-dropdown-text" />
                                        }</div>
                                </div>
                                {isLoggedIn ?
                                    <div className="header__menu-item" >
                                        <h4 className="header__menu-item-text" onClick={() => {
                                            setTimeout(() => setMenuToggle(false), 50)
                                            logOut()
                                        }}>Logout</h4>
                                    </div>
                                    : ''}
                            </> : ''}
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
                {isLoggedIn && !searchClicked ?
                    <div className="header__admin-btns" style={{ margin: '0 4vw', gap: '3vw', border: 'none' }}>
                        <Button
                            label='Create'
                            handleClick={() => history.push('/editor?new=true')}
                        />
                        {postId ?
                            <Button
                                svg={EditIcon}
                                handleClick={() => history.push(`/editor?id=${postId}`)}
                            />
                            : ''}
                        {postId ?
                            <Button
                                svg={DeleteIcon}
                                handleClick={() => setDeleteModal(true)}
                            />
                            : ''}
                    </div>
                    : ''}
                {!searchClicked && !isLoggedIn ?
                    <div className="header__logo"
                        onClick={() => {
                            setSearch([])
                            setPrompt('')
                            if (bespokenLogo) history.push('/bespoken/home')
                            else history.push('/')
                        }}>
                        {/* <h4 className="header__logo-text">by DANY GARCIA</h4> */}
                        <img
                            className="header__logo-image"
                            style={{
                                maxHeight: bespokenLogo ? '9vw' : '',
                                margin: bespokenLogo ? 0 : ''
                            }}
                            src={bespokenLogo || byDanyLogo}
                            alt='by Dany Garcia'
                            loading='lazy' />
                    </div>
                    : ''}
                <div className="header__search" >
                    <img className="header__search-svg" src={Search} onClick={triggerSearch} />
                    {searchClicked ?
                        <input type="text" className="header__search-input" placeholder={TEXT[lang]['search']} onChange={handleSearch} onKeyDown={e => {
                            if (e.key === 'Enter') triggerSearch()
                        }} />
                        : ''}
                </div>
            </>
        )
    }

    const renderDesktop = () => {
        return (
            <>
                <div className="header__items" style={{ height: bigHeader ? '5rem' : '2rem' }}>
                    <div className="header__item">
                        <h4 className="header__item-text no-pointer">{TEXT[lang]['blog']}</h4>
                        <img className="header__item-svg" src={ChevronDown} />
                        <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '5rem' : '3rem' }}>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/blog?category=inspiration')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['inspiration']}
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/blog?category=motherhood')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['motherhood']}
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/blog?category=life_abroad')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['life_abroad']}
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/blog')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['see_all']}
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
                        <h4 className="header__item-text">{TEXT[lang]['bespoken']}</h4>
                        <img className="header__item-svg" src={ChevronDown} />
                        <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '5rem' : '3rem' }}>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/bespoken/story')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['story_of_brand']}
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/bespoken/products')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['products']}
                                </h4>
                            </div>
                            <div className="header__item-dropdown-row" onClick={() => history.push('/bespoken/our_handcrafted_wedding')}>
                                <h4 className="header__item-dropdown-text">
                                    {TEXT[lang]['our_handcrafted_wedding']}
                                </h4>
                            </div>
                            {/* <div className="header__item-dropdown-row" onClick={() => history.push('/bespoken/values')}>
                                    <h4 className="header__item-dropdown-text">
                                        {TEXT[lang]['values']}
                                    </h4>
                                </div> */}
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
                            if (bespokenLogo) history.push('/bespoken/story')
                            else history.push('/')
                        }}>
                        {/* <h4 className="header__logo-text">by DANY GARCIA</h4> */}
                        <img
                            className="header__logo-image"
                            style={{
                                height: bigHeader ? bespokenLogo ? '3vw' : '4.5vw' : bespokenLogo ? '1.8vw' : '2.5vw',
                                margin: bespokenLogo ? 0 : bigHeader ? '.5vw 3vw 1vw 3vw' : '3vw .5vw'
                            }}
                            src={bespokenLogo || byDanyLogo}
                            alt='by Dany Garcia'
                            loading='lazy' />
                    </div>
                    : ''}

                <div className='header__admin-panel'>
                    {isLoggedIn ?
                        <div className="header__admin-btns"
                            style={{
                                borderRight: bigHeader ? '' : '1px solid #aaaaaa',
                                borderLeft: bigHeader ? '' : '1px solid #aaaaaa',
                                borderBottom: bigHeader ? '' : 'none',
                                borderTop: bigHeader ? '' : 'none'
                            }}
                        >
                            <Button
                                label='Create'
                                handleClick={() => history.push('/editor?new=true')}
                            />
                            {postId ?
                                <>
                                    <Button
                                        svg={EditIcon}
                                        handleClick={() => history.push(`/editor?id=${postId}`)}
                                    />
                                    <Button
                                        svg={DeleteIcon}
                                        handleClick={() => setDeleteModal(true)}
                                    />
                                </>
                                : ''}
                            <Button
                                svg={NotificationIcon}
                                handleClick={() => history.push('/notifications')}
                            />
                            <Button
                                label='Logout'
                                handleClick={logOut}
                                bgColor='transparent'
                            />
                        </div>
                        : ''}

                    <div className="header__search" >
                        <div className="header__item header__language" style={{ justifySelf: 'flex-end' }}>
                            <h4 className="header__item-text">{lang.toUpperCase()}</h4>
                            <img className="header__item-svg" src={ChevronDown} />
                            <div className="header__item-dropdown" style={{ marginTop: bigHeader ? '5rem' : '3rem' }}>
                                <div className="header__item-dropdown-row" onClick={() => changeLanguage('en')}>
                                    <img src={UsaFlag} alt="" className="header__item-dropdown-img header__item-dropdown-text" />
                                    <h4 className="header__item-dropdown-text">
                                        ENGLISH
                                    </h4>
                                </div>
                                <div className="header__item-dropdown-row" onClick={() => changeLanguage('es')}>
                                    <img src={SpainFlag} alt="" className="header__item-dropdown-img header__item-dropdown-text" />
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
            </>)
    }

    return (
        <div className='header__container' style={{ height: bigHeader ? '8rem' : '4rem' }}>
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
            {isMobile ? renderMobile() : renderDesktop()}
        </div>
    )
}