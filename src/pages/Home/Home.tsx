import React, { useEffect, useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import PostCard from '../../components/PostCard/PostCard'
import { testImages } from '../../constants/dev'
type Props = {}

export default function Home({ }: Props) {
    const history = useHistory()

    useLayoutEffect(() => {
        startCounters()
    })

    const startCounters = () => {
        const targetDiv = document.querySelector('.counter-cell');

        window.addEventListener('scroll', () => {
            const viewportHeight = window.innerHeight;
            if (targetDiv) {
                const targetDivRect = targetDiv.getBoundingClientRect();
                const targetDivTop = targetDivRect.top;
                const targetDivBottom = targetDivRect.bottom;

                if (targetDivTop < viewportHeight && targetDivBottom >= 0) {
                    const precounter1 = document.getElementById('precounter1')
                    const precounter2 = document.getElementById('precounter2')

                    if (precounter1) setInterval(() => {
                        if (Number(precounter1.innerText) < 433) precounter1.innerText = `${Number(precounter1.innerText) + 1}`
                    }, 10)
                    if (precounter2) setInterval(() => {
                        if (Number(precounter2.innerText) < 720) precounter2.innerText = `${Number(precounter2.innerText) + 1}`
                    }, 10)
                }

            }
        });
    }

    const topFunction = () => {
        document.body.scrollTop = 0; // for Safari
        document.documentElement.scrollTop = 0; // for Chrome, Firefox, IE and Opera
    }

    return <div className="home__container">
        <div className="home__header">
            <h4 className="home__header-title">LATEST POSTS</h4>
        </div>
        <div className="home__postlist">
            {testImages.map((image, i) =>
                <PostCard
                    key={i}
                    subtitle='MALMÖ, SWEDEN'
                    title='A GREAT WAY TO START YOUR DAY'
                    overlap='Title over image'
                    description=''
                    img={image}
                />
            )}
        </div>
    </div>
}