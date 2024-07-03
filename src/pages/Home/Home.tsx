import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services'
import { AppContext } from '../../AppContext'
import { postType } from '../../types'
import LandingDany from '../../assets/images/landing-1.jpg'
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
    const { lang, isMobile, isLoggedIn, setPost } = useContext(AppContext)
    const history = useHistory()

    useEffect(() => {
        getPosts()
        if (isLoggedIn) setTimeout(() => setShowPlayer(true), 2000)
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
                <img src={LandingDany} alt="Dany Garcia" className="home__landing-image" />
            </div>
            <p className="home__landing-text">
                {lang === 'es' ?
                    <>
                        <p>
                            Hace algunos años, mientras ralentizaba y tranquilizaba mi vida un poco, una chispa interna y espiritual brillaba como nunca antes lo había hecho. Comencé a conectar con las palabras de otras personas maravillosas, mientras me tomaba también el tiempo para escuchar mis propios pensamientos. Fue un avance profundo en mi vida, y la escritura se convirtió en una forma de expresar lo que estaba sucediendo. Al compartir algunas de mis escrituras con otros, vi cómo un puente de comunicación me conectaba con sus experiencias también.
                        </p>
                        <p>
                            Nunca pensé que encontraría tanto disfrute, creatividad, cambio, sanación y crecimiento.
                        </p>
                        <p>
                            Mi intención con este blog es tener un proyecto secundario <strong>en evolución</strong>, un espacio en línea donde pueda escribir y compartir libremente lo que deseo y donde las personas puedan venir a leer si así lo desean. Como madre y persona, a veces no hay mucho tiempo, o puede que no me sienta con ánimo de crear contenido, pero vuelvo a los mismos pensamientos de dar pequeños pasos, ir un día a la vez, olvidando las expectativas, la aprobación y simplemente disfrutar de mi tiempo haciéndolo.
                        </p>
                    </>
                    :
                    <>
                        <p>
                            Some years ago, as I slowed and quieted my life down, an inward and spiritual search of myself sparkled as it had never done before. I started connecting with the words of other wonderful people and mentors, while taking the time to listen to my own thoughts and feelings. It was a deep breakthrough in my life, and writing became a way to express what was happening. As I shared some of my writings with others, I saw how a bridge of communication connected me with their experiences, too.
                        </p>
                        <p>
                            I never thought I would find so much enjoyment, creativity, change, healing and growth.
                        </p>
                        <p>
                            My intention with this blog is to have an <strong>evolving side project</strong>, an online space where I can freely write and share what I want to and where people can come and read if they would like. As a mom and person, sometimes there is not much time, or I may not feel in the mood for creating content, but I come back to the same thoughts of taking little steps, going one day at a time, forgetting about the expectations, the approval and just, simply, enjoy my time doing it.
                        </p>
                    </>
                }
            </p>

            <Button
                label={lang === 'es' ? 'Conóceme' : 'Get to know me'}
                handleClick={() => history.push(`/about`)}
                bgColor={APP_COLORS.GRASS}
                textColor='white'
                style={{ transform: 'scale(1.2)' }}
            />

            <p className="home__landing-caption">
                “No man ever steps in the same river twice, for it's not the same river and he's not the same man.”  Heraclitus            </p>
            <h2 className="home__landing-title">{TEXT[lang]['inspiration']}</h2>
            <h3 className="home__landing-subtitle">{TEXT[lang]['inspiration_cap']}</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {filterPosts('inspiration').map((post, i) => i < 4 ? <PostCard style={{ width: '20vw' }} index={i} key={i} setPost={setPost} post={post} /> : null)}
                </div>}
            <Button
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=inspiration`)}
                style={{ transform: 'scale(1.3)' }}
            />

            <p className="home__landing-caption">
                "En este mundo finito quiero encontrar mi equilibrio infinito espiritual contigo."
            </p>
            <h2 className="home__landing-title">MOTHERHOOD</h2>
            <h3 className="home__landing-subtitle">A Rollercoaster of Love and Learning</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {filterPosts('motherhood').map((post, i) => i < 4 ? <PostCard style={{ width: '20vw' }} index={i} key={i} setPost={setPost} post={post} /> : null)}
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
                    {filterPosts('life abroad').map((post, i) => i < 4 ? <PostCard style={{ width: '20vw' }} index={i} key={i} setPost={setPost} post={post} /> : null)}
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