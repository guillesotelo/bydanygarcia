import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function Blog({ setPost }: Props) {
    const [allPosts, setAllPosts] = useState([])
    const [showUp, setShowUp] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getPosts()
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

    const getPosts = async () => {
        setLoading(true)
        const posts = await getAllPosts()
        setLoading(false)
        if (posts) setAllPosts(posts.length ? posts : [])
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