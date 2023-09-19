import React, { useState } from 'react'
import StoryImage from '../../assets/images/bespoken-story.png'
import BespokenOneYear from '../../assets/images/bespoken-one-year.png'
import Carousel from '../../components/Carousel/Carousel'
import Carousel1 from '../../assets/images/carousel1.png'
import Carousel2 from '../../assets/images/carousel2.png'
import Carousel3 from '../../assets/images/carousel3.png'
import Carousel4 from '../../assets/images/carousel4.png'

type Props = {
    page?: string
}

export default function Bespoken({ page }: Props) {
    const carouselImages = [
        {
            image: Carousel1
        },
        {
            image: Carousel2
        },
        {
            image: Carousel3
        },
        {
            image: Carousel4
        },
    ]

    const renderStory = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page}</h1>
                    {/* <h1 className="page__header-subtitle">{page == 'STORY' ? `Story of the brand's begining` : ''}</h1> */}
                </div>
                <div className="bespoken__row">
                    <div className="bespoken__col">
                        <h2 className="bespoken__subtitle">
                            Story of the brand's begining
                        </h2>
                        <p className="bespoken__text">
                            It was the summer of 2021 and I was in the search of something new. I had just finished leading a mayor online even for the company I worked at, making it the biggest coordination project of my career so far. Gift boxes for employees became a hit during pandemic times and by being close to the logistics of selecting and sending them, I felt I really enjoyed doing it. There were a lot of things I enjoyed about my job, but I was ready to move on and find new, creative horizons that made sense to the type of life I wanted to live...I just didn’t know how or whereto.
                        </p>
                        <p className="bespoken__text">
                            So during holidays, one afternoon at my parents-in-law’s cottage near the Uruguay river,  I collected some flowers and long leaves. I felt like a little girl, fascinated and lost in time. Creativity took hold of me and I started making adornments to put over our heads. It was at that exact moment when the DREAM of the brand came to be. <strong>Flowers, adornments, crafting, gifts!</strong> I would use all of my insights and experiences, my values and the things I found lovely to create all the details of the brand.
                        </p>
                        <p className="bespoken__text">
                            And so BESPOKEN was born to offer a unique service of crafted gifts/events experiences and  flower adornments, clearly defined with a bohemian nature, well-known products and charming details.
                        </p>
                        <p className="bespoken__text">
                            The heart's business was inspired by my own life values. I wanted the accompaniment to my clients in their moments and helping them enhance their intention of gifting and celebrating.
                        </p>
                    </div>
                    <div className="bespoken__col">
                        <img src={StoryImage} alt="Story Image" className="bespoken__story-img" />
                    </div>
                </div>
                <div className="bespoken__row" style={{ marginTop: '6rem' }}>
                    <div className="bespoken__col" style={{ width: '100%' }}>
                        <h2 className="bespoken__subtitle" style={{ alignSelf: 'center' }}>
                            In just one year...
                        </h2>
                        <p className="bespoken__text" style={{ textAlign: 'center' }}>
                            +60 sales and clients from Argentina, Colombia, Peru and the USA
                            <br /><br />
                            Worked with local and imported products from Argentina, Colombia, Turkey and India
                            <br /><br />
                            Incorporated handmade works with gold baths and native craftsmen for jewellery .
                            <br /><br />
                            Produced wedding bouquets, crowns and exclusive ear adornments.
                            <br /><br />
                            Participated in local fairs for entrepreneurs and had a 2 week showroom.
                            <br /><br />
                            Better to give - 5% of sales where destined for people in need.
                        </p>
                    </div>
                </div>
                <div className="bespoken__row" style={{ marginTop: '6rem' }}>
                    <Carousel cards={carouselImages} />
                </div>

                <div className="bespoken__row" style={{ marginTop: '6rem' }}>
                    <div className="bespoken__col">
                        <h2 className="bespoken__subtitle">
                            Client's Experience
                        </h2>
                        <h3 className="bespoken__subtitle" >
                            Gift boxes/Regalos y Experiencias
                        </h3>
                        <p className="bespoken__text" >
                            “Dany querida, gracias por el amor puesto en todo. Descubro detalles amorosos”
                            <br /><br />
                            “Gracias a vos, se siente cuando las cosas son hechas con amor!”.
                            <br /><br />
                            “Hola! Re lindo, le encanto! Dijo: !Qué presentación!  Espectacular y el sello le da un toque muy especial. Quedo muy contenta y yo quede re bien! Mil gracias, Dios te bendiga”.
                            <br /><br />
                            “Estoy taaan orgullosa de ser tu amiga, cada experiencia es increible y única! Pero siempre tienes más y me sorprendes. El mundo es tuyo amiga!”
                            <br /><br />
                            “El toque delicado y personal que le das a las cajas es tremendamente hermoso”.
                            <br /><br />
                            “Le encanto, Daniela! Gracias. El cafe sale muy rico! Todo increíble, mis dieces”.
                            <br /><br />
                            “She absolutely LOVED IT”!
                            <br /><br />
                            “Le encanto! Quedo hermoso, te felicito Dani. Está todo tan bien cuidado, con amor y atención al detalle. La curación de las fotos simplemente WOW. El nivel de personalización en la atención, paciencia y armado del regalo es simplemente impecable. Sabía que puedo confiar en vos. Pura magia BESPOKEN! Gracias por ser mi complice”!
                            <br /><br />
                        </p>

                        <h3 className="bespoken__subtitle">
                            Adornments & Bouquets/ Tocados y Ramos
                        </h3>
                        <p className="bespoken__text" >
                            “Delicado, hermoso, único! Gracias por tu buen gusto y por tu dedicación. Amamos y valoramos tu espectacular trabajo”.
                            <br /><br />
                            “Una belleza! Hermosas flores, hermosa presentación”!
                            <br /><br />
                            “Tu trabajo resalta la belleza de mis nenas”.
                            <br /><br />
                            “Le encanto! Quedo hermoso, te felicito Dani. Está todo tan bien cuidado, con amor y atención al detalle. La curación de las fotos simplemente WOW. El nivel de personalización en la atención, paciencia y armado del regalo es simplemente impecable. Sabía que puedo confiar en vos. Pura magia BESPOKEN! Gracias por ser mi complice”!
                            <br /><br />
                        </p>
                    </div>
                    <div className="bespoken__col">
                        <img src={BespokenOneYear} alt="Story Image" className="bespoken__story-img" />
                        <p><i>Bespoken One Year's anniversary - Buenos Aires 2022</i></p>
                    </div>
                </div>
            </div>
        )
    }

    const renderProducts = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page}</h1>
                    {/* <h1 className="page__header-subtitle">{page == 'STORY' ? `Story of the brand's begining` : ''}</h1> */}
                </div>
            </div>
        )
    }

    return page === 'STORY' ? renderStory() :
        page === 'PRODUCTS' ? renderProducts() : null
}