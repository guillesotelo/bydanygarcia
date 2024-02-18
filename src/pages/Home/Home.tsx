import { useContext, useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { getAllPosts } from '../../services'
import { AppContext } from '../../AppContext'
import { postType } from '../../types'
import LandingDany from '../../assets/images/landing-dany.png'
import Button from '../../components/Button/Button'
import { APP_COLORS } from '../../constants/app'

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

    const getCategoryImages = () => {
        const inspiration: string[] = []
        const motherhood: string[] = []
        const lifeabroad: string[] = []
        allPosts.forEach((post: postType) => {
            const imageUrl = post.imageUrl || ''
            const sideImages = JSON.parse(post.sideImgs || '[]') || []
            const postImage = imageUrl ? imageUrl : sideImages.length ? sideImages[0] : ''
            const tags = post.tags ? post.tags.toLowerCase() : ''
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
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=the_journey_within`)}
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
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=embracing_motherhood`)}
            />

            <p className="home__landing-caption">
                "I love an easy going morning at home with soft music, a little sunray and <i>mates</i>.<br /> Just a perfect scenario to get my notebook and write."
            </p>
            <h2 className="home__landing-title">ROAMING SOUL</h2>
            <h3 className="home__landing-subtitle">Journey Through Life and Travel</h3>
            {loading ? <span className="loader"></span>
                :
                <div className="blog__list">
                    {allPosts.filter(post => post.tags.toLowerCase().includes('roaming')).map((post, i) => i < 4 ? <PostCard key={i} setPost={setPost} post={post} /> : null)}
                </div>}
            <Button
                label={lang === 'es' ? 'Ver todo' : 'View all'}
                handleClick={() => history.push(`/blog?category=roaming_soul`)}
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