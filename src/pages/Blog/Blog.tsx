import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'
import { dataObj } from '../../types'
import { useLocation } from 'react-router-dom'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function Blog({ setPost }: Props) {
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [showUp, setShowUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')

    useEffect(() => {
        const cat = new URLSearchParams(document.location.search).get('category')
        setCategory(cat || '')
        getPosts(cat || '')
    }, [document.location.search])

    useEffect(() => {
        if (allPosts.length && !showUp) {
            const cards = Array.from(document.getElementsByClassName('postcard__container') as HTMLCollectionOf<HTMLElement>)
            if (cards && cards.length) cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.display = 'flex'
                    card.style.transition = '.5s'
                }, i * 120)
            })
            setShowUp(true)
        }
    }, [allPosts])

    const getPosts = async (cat = '') => {
        setLoading(true)
        const duedate = localStorage.getItem('duedate') ? localStorage.getItem('duedate') : null
        const localPosts = duedate && !hasCaducated(duedate) && localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
        const posts = localPosts.length ? localPosts : await getAllPosts()
        setLoading(false)
        if (posts && Array.isArray(posts)) {
            if (cat) {
                const filtered = posts.filter((post: dataObj) => post.tags.toLowerCase().includes(cat.replace(/_/g,'')))
                setAllPosts(filtered)
            } else setAllPosts(posts)
            localStorage.setItem('posts', JSON.stringify(posts))
        }
    }

    const hasCaducated = (dateToCheck: any) => {
        const currentDate = new Date()
        const twoHoursAgo = new Date(currentDate.getTime() - 2 * 60 * 60 * 1000)
        const parsedDate = new Date(dateToCheck)
        return parsedDate < twoHoursAgo
    }

    return (
        <div className='blog__container'>
            <div className="page__header">
                <h4 className="page__header-title">{category ? category.replace(/_/g,' ').toUpperCase() : 'BLOG'}</h4>
            </div>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.map((post, i) => <PostCard setPost={setPost} key={i} post={post} />)}
                </div>
            }
        </div>
    )
}