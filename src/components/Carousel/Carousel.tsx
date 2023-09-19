import React, { useEffect, useState } from 'react'

type Props = {
    title?: string
    caption?: string
    cards?: any[]
}

export default function Carousel({ title, caption, cards = [] }: Props) {
    const [allCards, setAllCards] = useState<any[]>(cards)
    const [currentIndex, setCurrentIndex] = useState<number>(0)
    const [miliseconds, setMiliseconds] = useState<number>(0)

    const nextSlide = () => {
        if (currentIndex < allCards.length - 1) {
            setCurrentIndex(currentIndex + 1)
            setAllCards((previous => previous.concat(previous[currentIndex])))
            setMiliseconds((n) => n + 1)
            console.log(miliseconds)
        }
        else {
            setCurrentIndex(0)
        }
    }

    useEffect(() => {
        const interval = setInterval(nextSlide, 100)
        return () => clearInterval(interval)
    }, [currentIndex])

    return (
        <div className="carousel__container">
            <h1 className="carousel__title"></h1>
            <div className="carousel__list-wrapper">
                <div className="carousel__list" style={{ transform: `translateX(-${(miliseconds / currentIndex) * 100}px)` }}>
                    {allCards.map((card, i) =>
                        <div key={i} className="carousel__card-container">
                            <div className="carousel__card-img-container">
                                <img src={card.image} alt='Card Image' className="carousel__card-img" />
                            </div>
                            <h1 className="carousel__card-title">{card.title}</h1>
                            <p className="carousel__card-text">{card.text}</p>
                        </div>
                    )}
                </div>
            </div>
            <h1 className="carousel__caption"></h1>
        </div>
    )
}