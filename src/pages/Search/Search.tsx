import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'

type Props = {
    search: string[]
}

export default function Blog({ search }: Props) {
    const [allPosts, setAllPosts] = useState<{ [key: string | number]: any }[]>([])
    const [filteredPosts, setFilteredPosts] = useState<{ [key: string | number]: any }[]>([])

    useEffect(() => {
        getPosts()
    }, [])

    const getPosts = async () => {
        const posts = await getAllPosts()
        if (posts) setAllPosts(posts.length ? posts : [])
    }

    useEffect(() => {
        if (search) filterPosts()
    }, [search, allPosts])

    useEffect(() => {
        render()
    }, [allPosts])

    const filterPosts = () => {
        if (search) {
            const posts = allPosts.filter(post => {
                let matches = false
                search.forEach((word: string) => {
                    if (JSON.stringify(post).toLocaleLowerCase().includes(word.toLocaleLowerCase())) matches = true
                })
                if (matches) return post
            })
            setFilteredPosts(posts)
        }
    }

    const render = () => filteredPosts.map((post, i) => <PostCard key={i} post={post} />)

    return (
        <div className='blog__container'>
            <div className="home__header">
                <h4 className="home__header-title">{search ? `RESULTS FOR: ${search.join(', ')}` : 'LATEST POSTS'}</h4>
            </div>
            <div className="blog__list">
                {render()}
            </div>
        </div>
    )
}