import React, { useContext, useEffect, useState } from 'react'
import { getAllPosts } from '../../services'
import PostCard from '../../components/PostCard/PostCard'
import { catMapType, postType } from '../../types'
import { AppContext } from '../../AppContext'

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
                setAllPosts(filtered)
            } else {
                setShowUp(false)
                setAllPosts(posts)
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

    const catMap: catMapType = {
        'the_journey_within': 'Finding Inspiration and Personal Growth',
        'embracing_motherhood': 'A Rollercoaster of Love and Learning',
        'roaming_soul': 'Journeying Through Life and Travel',
    }

    return (
        <div className='blog__container'>
            <div className="page__header">
                <h4 className="page__header-title">{category ? category.replace(/_/g, ' ').toUpperCase() : 'OPEN JOURNAL'}</h4>
                {category ? <h4 className="page__header-subtitle">{catMap[category]}</h4> : ''}
                <p className="blog__caption">
                    {lang === 'es' ?
                        'Me gusta plasmar palabras a mis pensamientos y compartirlos. Me gusta llevar un registro de historias y fotografías. Esto me da un sentido de propósito y satisfacción personal. Pero también es una forma de conectar, acompañar y compartir palabras que pueden sanar, empoderar, inspirar o simplemente sacar una sonrisa.'
                        :
                        'I like to put word to my thoughts and share them.  I like to keep record of stories and photographs. It gives me a sense of purpose and personal fulfillment. But also, it is a way to connect, accompany and share words can that can heal, empower, inspire or just bring out a smile.'}
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