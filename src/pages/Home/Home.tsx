import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { testImages } from '../../constants/dev'
import { getAllPosts } from '../../services'
type Props = {
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function Home({ setPost }: Props) {
    const [showUp, setShowUp] = useState(false)
    const [allPosts, setAllPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        getPosts()
    }, [])

    // useEffect(() => {
    //     if (testImages.length && !showUp) {
    //         const cards = Array.from(document.getElementsByClassName('postcard__container') as HTMLCollectionOf<HTMLElement>)
    //         if (cards && cards.length) cards.forEach((card, i) => {
    //             setTimeout(() => {
    //                 card.style.display = 'flex'
    //                 card.style.transition = '.5s'
    //             }, i * 120)
    //         })
    //         setShowUp(true)
    //     }
    // }, [testImages])

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

    return <div className="home__container">
        <div className="page__header">
            <h4 className="page__header-title">LATEST POSTS</h4>
        </div>
        {loading ? <span className="loader"></span>
            :
            <div className="home__postlist">
                {allPosts.map((post, i) => <PostCard setPost={setPost} key={i} post={post} />)}
            </div>
        }
    </div>
}