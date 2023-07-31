import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'
import { dataObj } from '../../types'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function Blog({ setPost }: Props) {
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [showUp, setShowUp] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const category = new URLSearchParams(document.location.search).get('category')
        getPosts(category || null)
    }, [])

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
        const localPosts = localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
        const posts = localPosts.length ? localPosts : await getAllPosts()
        setLoading(false)
        if (posts && Array.isArray(posts)) {
            if(cat) {
                const filtered = posts.filter((post: dataObj) => post.tags.toLowerCase().includes(cat))
                setAllPosts(filtered)
            } else setAllPosts(posts)
            localStorage.setItem('posts', JSON.stringify(posts))
        }
    }

    return (
        <div className='blog__container'>
            <div className="page__header">
                <h4 className="page__header-title">BLOG</h4>
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