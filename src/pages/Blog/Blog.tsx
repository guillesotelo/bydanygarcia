import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'

type Props = {}

export default function Blog({ }: Props) {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const posts = await getAllPosts()
        if (posts) setAllPosts(posts)
    }

    return (
        <div className='blog__container'>
            <div className="home__header">
                <h4 className="home__header-title">LATEST POSTS</h4>
            </div>
            <div className="blog__list">
                {allPosts.map(post => <PostCard post={post} />)}
            </div>
        </div>
    )
}