import React, { useContext, useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'
import { catMapType, postType } from '../../types'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'

type Props = {
    setPost: React.Dispatch<React.SetStateAction<any>>
}

export default function Blog({ setPost }: Props) {
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [showUp, setShowUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState('')
    const { isLoggedIn, lang } = useContext(AppContext)

    console.log(allPosts)

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
        const localPosts = duedate && !hasCaducated(JSON.parse(duedate)) && localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
        const posts = localPosts.length ? localPosts : await getAllPosts(isLoggedIn)
        setLoading(false)
        if (posts && Array.isArray(posts)) {
            if (cat) {
                setShowUp(false)
                const filtered = posts.filter((post: postType) => post.tags && post.tags.toLowerCase().includes(cat.replace(/_/g, '')))
                setAllPosts(isLoggedIn ? filtered : filtered.filter(post => post.published))
            } else {
                setShowUp(false)
                setAllPosts(isLoggedIn ? posts : posts.filter(post => post.published))
            }
            localStorage.setItem('posts', JSON.stringify(posts))
            localStorage.setItem('duedate', JSON.stringify(new Date()))
        }
    }

    const hasCaducated = (dateToCheck: Date | string) => {
        const currentDate = new Date()
        const twoHoursAgo = new Date(currentDate.getTime() - 2 * 60 * 60 * 1000)
        const parsedDate = new Date(dateToCheck)
        return parsedDate < twoHoursAgo
    }

    const parseCategory = (cat: string) => TEXT[lang][cat]

    return (
        <div className='blog__container'>
            <div className="page__header">
                <h4 className="page__header-title">{category ? parseCategory(category) : 'OPEN JOURNAL'}</h4>
                {category ? <h4 className="page__header-subtitle">{TEXT[lang][`${category}_cap`]}</h4> : ''}
                <p className="blog__caption">
                    {!category ?
                        lang === 'es' ?
                            'Cada publicación lleva consigo una chispa de alegría y vivencia personal. Se acompañan de fotos que buscan realzar la historia y concluyen con un deseo de conexión.'
                            :
                            'In each post, there is a little spark of joy and personal experience. There are photos that try to complement the story and a closing that wishes for connection.'
                        : ''
                    }
                </p>
            </div>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.map((post, i) => <PostCard key={i} setPost={setPost} post={post} />)}
                </div>
            }
        </div>
    )
}