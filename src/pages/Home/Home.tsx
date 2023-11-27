import React, { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'
import { dataObj } from '../../types'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import LandingDany from '../../assets/images/landing-dany.png'
import Button from '../../components/Button/Button'

export default function Home() {
    const [showUp, setShowUp] = useState(false)
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [journeyWithin, setJourneyWithin] = useState<string[]>([])
    const [embracingMotherhood, setEmbracingMotherhood] = useState<string[]>([])
    const [roamingSoul, setRoamingSoul] = useState<string[]>([])
    const [loading, setLoading] = useState(false)
    const { lang, isMobile, isLoggedIn, setPost } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        getPosts()
    }, [])

    useEffect(() => {
        getCategoryImages()
    }, [allPosts])

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
        const duedate = localStorage.getItem('duedate') ? localStorage.getItem('duedate') : null
        const localPosts = duedate && !hasCaducated(JSON.parse(duedate)) && localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
        const posts = localPosts.length ? localPosts : await getAllPosts(isLoggedIn)
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
            if (postImage) {
                if (tags.includes('inspiration') || tags.includes('journey')) inspiration.push(postImage)
                if (tags.includes('motherhood')) motherhood.push(postImage)
                if (tags.includes('lifeabroad') || tags.includes('roaming')) lifeabroad.push(postImage)
            }
        })
        setJourneyWithin(inspiration)
        setEmbracingMotherhood(motherhood)
        setRoamingSoul(lifeabroad)
    }

    return <div className="home__container">
        <div className="home__landing">
            <div className="home__landing-image-wrapper">
                <img src={LandingDany} alt="Dany Garcia" className="home__landing-image" />
            </div>
            <p className="home__landing-text">
                {lang === 'es' ?
                    'Hace algunos años, cuando empecé a bajar la velocidad y comencé mi viaje interior, la escritura se convirtió en una forma constante de expresar mis pensamientos. Las palabras juntas se convirtieron en una manera de comunicarme y conectar con otros sobre procesos procesos de la vida similares.'
                    :
                    'Some years ago as I started slowing down and began my inward journey, writing became a constant form of expression for my thoughts.  My words put together became a way to communicate and connect with others about relatable life processes. '
                }
            </p>
            <p className="home__landing-text">
                {lang === 'es' ?
                    'Nunca pensé que encontraría tanta creatividad y significado dentro de mí, pero eso fue lo que sucedió cuando pare y, en silencio, escuché.'
                    :
                    'I never thought I would find so much creativity and meaning within myself, but this is what happened when I stopped the rush and in silence, listened.'
                }
            </p>
            <p className="home__landing-text">
                {lang === 'es' ?
                    'Mi intención con este blog es tener un proyecto en constante evolución, un lugar en línea donde pueda escribir y compartir libremente lo que deseo y donde las personas puedan venir a leer contenido refrescante. Como mamá, a veces no hay mucho tiempo, pero he aplicado la estrategia de dar pequeños pasos y avanzar un día a la vez.'
                    :
                    'My intention with this blog is to have an evolving side project, an online-space were I can freely write and share what I want to and where people can come and read refreshing content.  As a mom, sometimes there is not much time, but I have applied the strategy of taking little steps and going one day at a time.'
                }
            </p>

            <Button
                label='Read more'
                handleClick={() => history.push(`/about`)}
                bgColor='#ECE7E6'
            />

            <p className="home__landing-caption">
                "There is nothing more lovely than the smell of fresh coffee, the sound of people chatting and a little tune playing at a cozy coffee house."
            </p>
            <h2 className="home__landing-title">THE JOURNEY WITHIN</h2>
            <h3 className="home__landing-subtitle">Finding Inspiration and Personal Growth</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.filter(post => post.tags.toLowerCase().includes('journey')).map((post, i) => i < 4 ? <PostCard key={i} setPost={setPost} post={post} /> : null)}
                </div>}
            <Button
                label='View all'
                handleClick={() => history.push(`/blog?category=the_journey_within`)}
                bgColor='#ECE7E6'
            />

            <p className="home__landing-caption">
                "As I give myself the freedom to be part and be discovered, I will give people the same opportunity too."
            </p>
            <h2 className="home__landing-title">EMBRACING MOTHERHOOD</h2>
            <h3 className="home__landing-subtitle">A Rollercoaster of Love and Learning</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.filter(post => post.tags.toLowerCase().includes('motherhood')).map((post, i) => i < 4 ? <PostCard key={i} setPost={setPost} post={post} /> : null)}
                </div>}
            <Button
                label='View all'
                handleClick={() => history.push(`/blog?category=embracing_motherhood`)}
                bgColor='#ECE7E6'
            />

            <p className="home__landing-caption">
                "I love an easy going morning at home with soft music, a little sun ray and <strong>mates</strong> anywhere I can get my notebook and write."
            </p>
            <h2 className="home__landing-title">ROAMING SOUL</h2>
            <h3 className="home__landing-subtitle">Journey Through Life and Travel</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.filter(post => post.tags.toLowerCase().includes('roaming')).map((post, i) => i < 4 ? <PostCard key={i} setPost={setPost} post={post} /> : null)}
                </div>}
            <Button
                label='View all'
                handleClick={() => history.push(`/blog?category=roaming_soul`)}
                bgColor='#ECE7E6'
            />
        </div>
        {/* <div className="page__header">
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
        } */}
    </div>
}