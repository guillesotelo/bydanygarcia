import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { testImages } from '../../constants/dev'
type Props = {}

export default function Home({ }: Props) {
    const [showUp, setShowUp] = useState(false)
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (testImages.length && !showUp) {
            const cards = Array.from(document.getElementsByClassName('postcard__container') as HTMLCollectionOf<HTMLElement>)
            if (cards && cards.length) cards.forEach((card, i) => {
                setTimeout(() => {
                    card.style.display = 'flex'
                    card.style.transition = '.5s'
                }, i * 120)
            })
            setShowUp(true)
        }
    }, [testImages])

    return <div className="home__container">
        <div className="home__header">
            <h4 className="home__header-title">LATEST POSTS</h4>
        </div>
        {loading ? <span className="loader"></span>
            :
            <div className="home__postlist">
                {testImages.map((image, i) =>
                    <PostCard
                        key={i}
                        subtitle='MALMÖ, SWEDEN'
                        title='A GREAT WAY TO START YOUR DAY'
                        overlap='Title over image'
                        description=''
                        img={image}
                        post={{}}
                    />
                )}
            </div>
        }
    </div>
}