import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import { dataObj } from '../../types'
import CategoryCard from '../../components/CategoryCard/CategoryCard'


export default function Home() {
    const [showUp, setShowUp] = useState(false)
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [journeyWithin, setJourneyWithin] = useState<string[]>([])
    const [embracingMotherhood, setEmbracingMotherhood] = useState<string[]>([])
    const [roamingSoul, setRoamingSoul] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const { lang, isMobile } = useContext(AppContext)

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        getCategoryImages()
    }, [allPosts])

    useEffect(() => {
        if (allPosts.length && !showUp) {
            const cards = Array.from(document.getElementsByClassName('category-card__container') as HTMLCollectionOf<HTMLElement>)
            if (cards && cards.length) cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.display = 'flex'
                    card.style.transition = '.5s'
                }, (i + 1) * 300)
            })
            setShowUp(true)
        }
    }, [allPosts])

    const getPosts = async () => {
        setLoading(true)
        const duedate = localStorage.getItem('duedate') ? localStorage.getItem('duedate') : null
        const localPosts = duedate && !hasCaducated(JSON.parse(duedate)) && localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
         const posts = localPosts.length ? localPosts : await getAllPosts()
        setLoading(false)
        if (posts && Array.isArray(posts)) {
            setAllPosts(posts)
            localStorage.setItem('posts', JSON.stringify(posts))
            localStorage.setItem('duedate', JSON.stringify(new Date()))
        }
    }

    const hasCaducated = (dateToCheck: any) => {
        const currentDate = new Date()
        const twoHoursAgo = new Date(currentDate.getTime() - 2 * 60 * 60 * 1000)
        const parsedDate = new Date(dateToCheck)
        return parsedDate < twoHoursAgo
    }

    const getCategoryImages = () => {
        const inspiration: string[] = []
        const motherhood: string[] = []
        const lifeabroad: string[] = []
        allPosts.forEach((post: dataObj) => {
            const imageUrl = post.imageUrl || ''
            const sideImages = JSON.parse(post.sideImgs || '[]') || []
            const postImage = imageUrl ? imageUrl : sideImages.length ? sideImages[0] : ''
            const tags = post.tags.toLowerCase()
            if (tags.includes('inspiration') || tags.includes('journey')) inspiration.push(postImage)
            if (tags.includes('motherhood')) motherhood.push(postImage)
            if (tags.includes('lifeabroad') || tags.includes('roaming')) lifeabroad.push(postImage)
        })
        setJourneyWithin(inspiration)
        setEmbracingMotherhood(motherhood)
        setRoamingSoul(lifeabroad)
    }

    return <div className="home__container">
        <div className="page__header">
            <h4 className="page__header-title">{TEXT[lang]['categories']}</h4>
        </div>
        {loading ? <span className="loader"></span>
            :
            <div className="home__postlist">
                <CategoryCard
                    images={journeyWithin}
                    title='The Journey Within'
                    count={journeyWithin.length + ' posts'}
                    category='the_journey_within'
                    // subtitle='Finding Inspiration and Personal Growth'
                />
                <CategoryCard
                    images={embracingMotherhood}
                    title='Embracing Motherhood'
                    count={embracingMotherhood.length + ' posts'}
                    category='embracing_motherhood'
                    // subtitle='A Rollercoaster of Love and Learning'
                />
                <CategoryCard
                    images={roamingSoul}
                    title='Roaming Soul'
                    count={roamingSoul.length + ' posts'}
                    category='roaming_soul'
                    // subtitle='Journeying Through Life and Travel'
                />
            </div>
        }
    </div>
}