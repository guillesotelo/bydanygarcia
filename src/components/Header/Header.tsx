import React, { useEffect, useState } from 'react'
import Menu from '../../assets/icons/menu-icon.svg'
import ChevronDown from '../../assets/icons/chevron-down.svg'
import Instagram from '../../assets/icons/instagram.svg'
import Pinterest from '../../assets/icons/pinterest.svg'
import Youtube from '../../assets/icons/youtube.svg'
import Search from '../../assets/icons/search-icon.svg'
import { useHistory } from 'react-router-dom'
import Button from '../Button/Button'
import DeleteIcon from '../../assets/icons/delete.svg'
import EditIcon from '../../assets/icons/edit.svg'
import { deletePost } from '../../services'
import { toast } from 'react-hot-toast'

type Props = {}

export default function Header({ }: Props) {
    const [postId, setPostId] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)
    const history = useHistory()

    useEffect(() => {
        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}
        if (user && user.token && user.username) setIsAdmin(true)
    }, [])

    useEffect(() => {
        const id = new URLSearchParams(document.location.search).get('id')
        if (id) setPostId(id)
        else setPostId('')
    }, [window.location.pathname])

    useEffect(() => {
        const postViewr = document.querySelector<HTMLElement>('.postviewer__container')
        if (postViewr) {
            if (deleteModal) postViewr.style.filter = 'blur(10px)'
            else postViewr.style.filter = ''
        }
    }, [deleteModal])

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
            <div className='header__menu'>
                <img className="header__menu-svg" src={Menu} />
            </div>
            <div className="header__logo">
                <h4 className="header__logo-text" onClick={() => history.push('/')}>by DANY GARCIA</h4>
            </div>
            <div className="header__items">
                <div className="header__item">
                    <h4 className="header__item-text" onClick={() => history.push('/blog')}>BLOG</h4>
                    {/* <img className="header__item-svg" src={ChevronDown} /> */}
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
                    <h4 className="header__item-text" onClick={() => history.push('/about')}>ABOUT</h4>
                    {/* <img className="header__item-svg" src={ChevronDown} /> */}
                </div>
                <div className="header__social">
                    <img className="header__social-svg" onClick={() => window.open('https://www.instagram.com/by.danygarcia/', '_blank', 'noreferrer')} src={Instagram} />
                    <img className="header__social-svg" onClick={() => window.open('https://www.pinterest.se/bespoken_ar/', '_blank', 'noreferrer')} src={Pinterest} />
                    <img className="header__social-svg" onClick={() => window.open('https://www.youtube.com/@bydanygarcia5800', '_blank', 'noreferrer')} src={Youtube} />
                </div>
                <div className="header__admin-btns">
                    <Button
                        label='CREATE'
                        handleClick={() => history.push('/editor')}
                        bgColor='#ece7e6'
                    />
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
                </div>
                <div className="header__search">
                    <img className="header__search-svg" src={Search} />
                    <input type="text" className="header__search-input" placeholder='Search' />
                </div>
            </div>
        </div>
    )
}