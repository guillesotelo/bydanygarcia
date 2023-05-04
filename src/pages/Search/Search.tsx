import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'

type Props = {
    search: string[]
}

export default function Blog({ search }: Props) {
    const [allPosts, setAllPosts] = useState<{ [key: string | number]: any }[]>([])
    const [filteredPosts, setFilteredPosts] = useState<{ [key: string | number]: any }[]>([])
    const [showUp, setShowUp] = useState(false)

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        if (search) filterPosts()
        setShowUp(false)
    }, [search, allPosts])

    useEffect(() => {
        render()
        setTimeout(() => applyAnimation(), 50)
    }, [allPosts, filteredPosts])

    const getPosts = async () => {
        const posts = await getAllPosts()
        if (posts) setAllPosts(posts.length ? posts : [])
    }

    const applyAnimation = () => {
        if (filteredPosts.length && !showUp) {
            const cards = Array.from(document.getElementsByClassName('postcard__container') as HTMLCollectionOf<HTMLElement>)
            if (cards && cards.length) cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.display = 'flex'
                    card.style.transition = '.5s'
                }, i * 120)
            })
            setShowUp(true)
        }
    }

    const filterPosts = () => {
        const posts = allPosts.filter(post => {
            let matches = false
            search.forEach((word: string) => {
                if (JSON.stringify(post).toLocaleLowerCase().includes(word.toLocaleLowerCase())) matches = true
            })
            if (matches) return post
        })
        setFilteredPosts(posts)
    }

    const render = () => {
        setTimeout(() => applyAnimation(), 50)
        return filteredPosts.length ?
            filteredPosts.map((post, i) => <PostCard key={i} post={post} />)
            : search.length ?
                <h4 className='search__no-results'>No results found for <strong>{search.join(', ')}</strong></h4>
                :
                <h4 className='search__no-results'>Find anything on the site</h4>
    }

    return (
        <div className='blog__container'>
            <div className="page__header">
                <h4 className="page__header-title">{search.length ? 'SEARCH RESULTS' : 'SEARCH'}</h4>
            </div>
            <div className="blog__list">
                {render()}
            </div>
        </div>
    )
}