import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services/post'
import { AppContext } from '../../AppContext'
import LandingDany from '../../assets/images/landing-1.jpg'
import LandingFlowers from '../../assets/images/landing-3.jpg'
import LandingSweden from '../../assets/images/landing-4.jpg'
import Button from '../../components/Button/Button'
import { APP_COLORS } from '../../constants/app'
import { TEXT } from '../../constants/lang'
import Player from '../../components/Player/Player'
const Track1 = require('../../assets/audio/Jamie-Duffy_Solas.mp3')
const Track2 = require('../../assets/audio/Je-Te-Laisserai_Des-Mots.mp3')

export default function Home() {
    const [showUp, setShowUp] = useState(false)
    const [allPosts, setAllPosts] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [showPlayer, setShowPlayer] = useState(false)
    const { lang, isMobile, isLoggedIn } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        const parallaxScroll = () => {
            const parallaxImages = document.querySelectorAll('.home__parallax-image') as any
            parallaxImages.forEach((image: any, index: number) => {
                const speed = parseFloat(image.dataset.speed) || 0.4
                const offset = window.scrollY - image.parentElement.offsetTop - (index * index * 1000)
                image.style.transform = `translateY(${offset * speed}px)`
            })
        }

        window.addEventListener('scroll', parallaxScroll)
        return () => window.removeEventListener('scroll', parallaxScroll)
    }, [])

    useEffect(() => {
        getPosts()
        // if (isLoggedIn) setTimeout(() => setShowPlayer(true), 2000)
    }, [isLoggedIn])

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
                style={{ transform: 'scale(1.2)', marginBottom: '4rem' }}
            />

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

            <h2 className="home__landing-title">{TEXT[lang]['inspiration']}</h2>
            <h3 className="home__landing-subtitle">{TEXT[lang]['inspiration_cap']}</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {filterPosts('inspiration').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>}
            <Button
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=inspiration`)}
                style={{ transform: 'scale(1.3)', marginBottom: '4rem' }}
            />

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

            <h2 className="home__landing-title">MOTHERHOOD</h2>
            <h3 className="home__landing-subtitle">A Rollercoaster of Love and Learning</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {filterPosts('motherhood').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>}
            <Button
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=motherhood`)}
                style={{ transform: 'scale(1.3)' }}
            />

            <p className="home__landing-caption">
                "I love an easy-going morning at home with soft music, a little sun, and <i>mates</i>.<br />Just a perfect scenario to get my notebook and write."
            </p>
            <h2 className="home__landing-title">LIFE ABROAD</h2>
            <h3 className="home__landing-subtitle">Journey Through Life and Travel</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {filterPosts('life abroad').map((post, i) => i < 4 ? <PostCard style={{ width: isMobile ? '70%' : '20vw' }} index={i} key={i} post={post} /> : null)}
                </div>}
            <Button
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=life_abroad`)}
                style={{ transform: 'scale(1.3)' }}
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
                    title='Inspiration'
                    count={journeyWithin.length + ' posts'}
                    category='inspiration'
                // subtitle='Sharing moments of deep awareness '
                />
                <CategoryCard
                    images={embracingMotherhood}
                    title='Embracing Motherhood'
                    count={embracingMotherhood.length + ' posts'}
                    category='motherhood'
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
        {showPlayer ? <Player filePath={[Track1, Track2]} setShowPlayer={setShowPlayer} /> : ''}
    </div>
}