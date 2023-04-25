import React, { useEffect, useLayoutEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from '../../components/Header/Header'
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
        <Header />
        <h4>REST OF THE PAGE</h4>
    </div>
}