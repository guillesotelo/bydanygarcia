import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services/post'
import { AppContext } from '../../AppContext'
import LandingDany from '../../assets/images/landing-1.jpg'
import LandingFlowers from '../../assets/images/landing-3.jpg'
import LandingSweden from '../../assets/images/landing-4.jpg'
import Button from '../../components/Button/Button'
import { APP_COLORS } from '../../constants/app'
import Player from '../../components/Player/Player'
import ProductCard from '../../components/ProductCard/ProductCard'
import { getAllProducts } from '../../services/product'
import { productType } from '../../types'
const Track1 = require('../../assets/audio/Jamie-Duffy_Solas.mp3')
const Track2 = require('../../assets/audio/Je-Te-Laisserai_Des-Mots.mp3')

export default function Home() {
    const [showUp, setShowUp] = useState(false)
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showPlayer, setShowPlayer] = useState(false)
    const [products, setProducts] = useState<productType[]>([])
    const { lang, isMobile, isLoggedIn } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        const parallaxScroll = () => {
            const parallaxImages = document.querySelectorAll('.home__parallax-image') as any
            parallaxImages.forEach((image: any, index: number) => {
                const speed = parseFloat(image.dataset.speed) || 0.3
                const offset = window.scrollY - image.parentElement.offsetTop - (index * (isMobile ? index * 1000 : window.innerHeight * 1.8))
                image.style.transform = `translateY(${offset * speed}px)`
            })
        }

        getPosts()
        getProducts()

        window.addEventListener('scroll', parallaxScroll)
        return () => window.removeEventListener('scroll', parallaxScroll)
    }, [])

    // useEffect(() => {
    // if (isLoggedIn) setTimeout(() => setShowPlayer(true), 2000)
    // }, [isLoggedIn])

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

    const getProducts = async () => {
        try {
            setLoading(true)
            const _products = await getAllProducts()
            if (_products && Array.isArray(_products)) setProducts(_products)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error(error)
        }
    }

    const getPosts = async () => {
        setLoading(true)
        const duedate = localStorage.getItem('duedate') ? localStorage.getItem('duedate') : null
        const localPosts = duedate && !hasCaducated(JSON.parse(duedate)) && localStorage.getItem('posts') ? JSON.parse(localStorage.getItem('posts') || '[]') : []
        const posts = localPosts.length ? localPosts : await getAllPosts(isLoggedIn || false)
        setLoading(false)
        if (posts && Array.isArray(posts)) {
            setAllPosts(isLoggedIn ? posts : posts.filter(post => post.published))
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

    const filterPosts = (filter: string) => {
        return allPosts.filter(post => (post.category && post.category.toLowerCase().includes(filter.toLowerCase())))
    }

    return <div className="home__container">
        <div className="home__landing">
            <div className="home__landing-image-wrapper">
                <div className="home__landing-image-overlap">
                    <h4 className="header__logo-text">An Echo of the Heart</h4>
                    {/* <p className="home__landing-title" style={{ fontSize: '2rem', margin: '15vh auto 0 auto', color: '#fff', background: '#000', width: 'fit-content', padding: '0 .5rem' }}>One heart's story, resonating with many.</p> */}
                </div>
                <div className="home__parallax-container">
                    <img src={LandingDany} alt="Dany Garcia" className="home__landing-image home__parallax-image" />
                </div>
            </div>
            <div className="home__section">
                <p className="home__landing-title" style={{ fontSize: '1.5rem', margin: '.5rem' }}>A blog by Daniela García | Travel, Motherhood, Inspired Living & Bespoken Flower Design</p>
                <p className="home__landing-text">
                    <p>Welcome—I'm Dany García. I created An Echo of the Heart as a gentle space for storytelling, motherhood, travel reflections, and personal growth. I also run Bespoken, where I design with floweres.</p>
                    <p>Here, I share what moves me—writing from a place of authenticity, hoping my words may echo something in you, too.</p>
                </p>

                <Button
                    label={lang === 'es' ? 'Conóceme' : 'Read My Story'}
                    handleClick={() => history.push(`/about`)}
                    bgColor={APP_COLORS.GRASS}
                    textColor='white'
                    style={{ transform: 'scale(1.2)' }}
                />
            </div>

            <div className="home__landing-image-wrapper">
                <div className="home__parallax-container">
                    <img src={LandingFlowers} alt="Dany Garcia" className="home__landing-image home__parallax-image" />
                </div>
                <div className="home__landing-image-overlap">
                    <p className="home__landing-caption" style={{ color: '#fff', fontSize: isMobile ? '' : '2rem', fontWeight: 'bold', margin: 'auto' }}>
                        “No man ever steps in the same river twice, for it's not the same river and he's not the same man.”  Heraclitus
                    </p>
                </div>
            </div>

            <div className="home__section" style={{ height: 'fit-content' }}>
                <h2 className="home__landing-title">Inspiration</h2>
                <h3 className="home__landing-subtitle">Inspiring stories about personal growth, inner strength, and living with intention and awareness</h3>
                <div className="blog__list">
                    {filterPosts('inspiration').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>
                <Button
                    label={lang === 'es' ? 'Ver todo' : 'View all'}
                    handleClick={() => history.push(`/blog?category=inspiration`)}
                    style={{ transform: 'scale(1.3)', margin: '0 0 4rem' }}
                />
            </div>

            <div className="home__landing-image-wrapper">
                <div className="home__parallax-container">
                    <img src={LandingSweden} alt="Dany Garcia" className="home__landing-image home__parallax-image" />
                </div>
                <div className="home__landing-image-overlap">
                    <p className="home__landing-caption" style={{ color: '#fff', fontSize: isMobile ? '' : '2rem', fontWeight: 'bold', margin: 'auto' }}>
                        "En este mundo finito quiero encontrar mi equilibrio infinito espiritual contigo."
                    </p>
                </div>
            </div>

            <div className="home__section" style={{ height: 'fit-content' }}>
                <h2 className="home__landing-title">Bespoken by Dany</h2>
                <h3 className="home__landing-subtitle">Floral designs & handcrafted gifts</h3>
                <div className="blog__list">
                    {products.map((product, i) => i < 4 ? <ProductCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} product={product} /> : null)}
                </div>
                <Button
                    label='View store'
                    handleClick={() => history.push(`/store`)}
                    style={{ transform: 'scale(1.3)', margin: '0 0 4rem' }}
                />
            </div>

            <div className="home__section" style={{ height: 'fit-content' }}>
                <h2 className="home__landing-title">Motherhood</h2>
                <h3 className="home__landing-subtitle">Honest reflections on the growth, learning, and everyday moments of motherhood</h3>
                <div className="blog__list">
                    {filterPosts('motherhood').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>
                <Button
                    label={lang === 'es' ? 'Ver todo' : 'View all'}
                    handleClick={() => history.push(`/blog?category=motherhood`)}
                    style={{ transform: 'scale(1.3)', margin: '0 0 4rem' }}
                />
            </div>

            <p className="home__landing-caption">
                "I love an easy-going morning at home with soft music, a little sun, and <i>mates</i>.<br />Just a perfect scenario to get my notebook and write."
            </p>

            <div className="home__section" style={{ height: 'fit-content' }}>
                <h2 className="home__landing-title">Life Abroad</h2>
                <h3 className="home__landing-subtitle">Insightful stories of self-discovery, cultural adaptation, and expat life in foreign countries</h3>
                <div className="blog__list">
                    {filterPosts('life abroad').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>
                <Button
                    label={lang === 'es' ? 'Ver todo' : 'View all'}
                    handleClick={() => history.push(`/blog?category=life_abroad`)}
                    style={{ transform: 'scale(1.3)', margin: '0 0 4rem' }}
                />
            </div>
        </div>
        {showPlayer ? <Player filePath={[Track1, Track2]} setShowPlayer={setShowPlayer} /> : ''}
    </div>
}