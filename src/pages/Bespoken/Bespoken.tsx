import React, { useContext, useEffect, useState } from 'react'
import StoryImage from '../../assets/images/bespoken-story.png'
import BespokenOneYear from '../../assets/images/bespoken-one-year.png'
import Carousel from '../../components/Carousel/Carousel'
import Carousel1 from '../../assets/images/carousel1.png'
import Carousel2 from '../../assets/images/carousel2.png'
import Carousel3 from '../../assets/images/carousel3.png'
import Carousel4 from '../../assets/images/carousel4.png'
import { AppContext } from '../../AppContext'
import { useHistory } from 'react-router-dom'
import PinterestSave from '../../assets/icons/pinterest-color.svg'
import { scrapeUrl } from '../../services'
import { TEXT } from '../../constants/lang'

type Props = {
    page?: string
}

export default function Bespoken({ page }: Props) {
    const { lang, isMobile } = useContext(AppContext)
    const history = useHistory()
    const [arrangements, setArrangements] = useState<any>([])
    const [adornments, setAdornments] = useState<any>([])
    const [gifts, setGifts] = useState<any>([])
    const [wedding, setWedding] = useState<any>([])
    const [images, setImages] = useState<any>([])
    const [products, setProducts] = useState('')
    const [pinterestPage, setPinterestPage] = useState('')
    const [showPin, setShowPin] = useState(-1)

    const arrangementsUrl = 'https://www.pinterest.se/bespoken_ar/flower-arrangements/'
    const adornmentsUrl = 'https://www.pinterest.se/bespoken_ar/flower-adornments/'
    const giftsUrl = 'https://www.pinterest.se/bespoken_ar/bespoken-gifts/'
    const weddingUrl = 'https://www.pinterest.se/bespoken_ar/our-diy-wedding/'

    const adornmentsCaption = `I started composing natural flower crowns at the cottage of my in-laws in the summer of 2021. From that time on, I started learning about flowers and techniques so I could create different designs for crowns and ear-cuffs. Materials: Natural flowers, fabric, cold porcelain, stones, among others.`
    const giftsCaption = `It's all about the intention, the love and the details ✨ I found myself creating different gift proposals I called "experiences", as they involve the sensory levels of seeing, touching, tasting and smelling. These were all crafted with a lot of detail and time. `
    const arrangementsCaptions = 'As I started navigating the world of flowers, arrangements design became an appealing and very enjoyable practice for me. I began with some online courses and started working. There is a very special feeling I get when I’m out picking flowers, when I bring them home to arrange them and make a composition. Although I have a tendency of “perfection” I like to be a free creator and make my own designs. My dream is to keep my hands busy creating, learning and enjoying the pleasure of holding flowers and making people and spaces joyful and beautiful.'

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

    useEffect(() => {
        getPinterestImages()
    }, [])

    useEffect(() => {
        if (getName(products, 'arrangements')) setImages(arrangements)
        if (getName(products, 'adornments')) setImages(adornments)
        if (getName(products, 'gifts')) setImages(gifts)
        if (getName(products, 'wedding')) setImages(wedding)
    }, [arrangements, adornments, gifts, wedding])

    useEffect(() => {
        const imgs = getName(products, 'arrangements') ? arrangements :
            getName(products, 'adornments') ? adornments :
                getName(products, 'gifts') ? gifts :
                    getName(products, 'wedding') ? wedding : []

        setImages(imgs)
        getPinterestPage()
    }, [products])

    const getName = (products: string, name: string) => {
        return products.toLowerCase().includes(name)
    }

    const getPinterestImages = async () => {
        try {
            const _arrangements = await scrapeUrl({ url: arrangementsUrl })
            if (_arrangements && Array.isArray(_arrangements)) setArrangements(_arrangements.filter(img => img))

            const _adornments = await scrapeUrl({ url: adornmentsUrl })
            if (_adornments && Array.isArray(_adornments)) setAdornments(_adornments.filter(img => img))

            const _gifts = await scrapeUrl({ url: giftsUrl })
            if (_gifts && Array.isArray(_gifts)) setGifts(_gifts.filter(img => img))

            // const _wedding = await scrapeUrl({ url: weddingUrl })
            // if (_wedding && Array.isArray(_wedding)) setWedding(_wedding.filter(img => img))

        } catch (err) {
            console.error(err)
        }
    }

    const getProductCaption = () => {
        return getName(products, 'arrangements') ? arrangementsCaptions :
            getName(products, 'adornments') ? adornmentsCaption :
                getName(products, 'gifts') ? giftsCaption : ''
    }

    const getPinterestPage = () => {
        setPinterestPage(getName(products, 'arrangements') ? arrangementsUrl :
            getName(products, 'adornments') ? adornmentsUrl :
                getName(products, 'gifts') ? giftsUrl :
                    getName(products, 'wedding') ? weddingUrl : '')
    }

    const getPinterestUrl = (url: string) => `https://www.pinterest.se/pin/create/button/?url=${encodeURIComponent(url)}`

    const renderStory = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                    {/* <h1 className="page__header-subtitle">{page === 'STORY' ? `Story of the brand's begining` : ''}</h1> */}
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
                <div className="bespoken__row" style={{ marginTop: '6rem', width: '100vw' }}>
                    <Carousel cards={carouselImages} />
                </div>

                <div className="bespoken__row" style={{ marginTop: '6rem' }}>
                    <div className="bespoken__col" style={{ width: '100%' }}>
                        <h2 className="bespoken__subtitle" style={{ textAlign: 'center', width: '100%' }}>
                            Client's Experience
                        </h2>
                        <div className="bespoken__row" style={{ alignItems: isMobile ? '' : 'flex-start' }}>
                            <div className="bespoken__col">
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
                            </div>
                            <div className="bespoken__col">
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
                        </div>
                        <div className="bespoken__row" >
                            <div className="bespoken__col">
                                <img src={BespokenOneYear} alt="Story Image" className="bespoken__story-img" />
                                <p><i>Bespoken's One Year anniversary - Buenos Aires 2022</i></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderProducts = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title" style={{ cursor: 'pointer' }} onClick={() => setProducts('')}>{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                    {products && images.length ?
                        <div>
                            <p>{products}</p>
                        </div>
                        : ''}
                    {!products ?
                        <div className="bespoken__product-cards">
                            <div className="bespoken__product-card" onClick={() => setProducts('Flower Arrangements')}>
                                <p className="bespoken__product-card-title">Flower<br />Arrangements</p>
                                <img src='https://i.postimg.cc/QMSsn3L9/Screen-Shot-2023-11-02-at-21-47-24.png' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
                            <div className="bespoken__product-card" onClick={() => setProducts('Flower Adornments')}>
                                <p className="bespoken__product-card-title">Flower<br />Adornments</p>
                                <img src='https://i.pinimg.com/564x/e5/81/86/e58186617e8c5ec8eb6e2f55ad438901.jpg' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
                            <div className="bespoken__product-card" onClick={() => setProducts('Bespoken Gifts')}>
                                <p className="bespoken__product-card-title">Bespoken<br />Gifts</p>
                                <img src='https://i.postimg.cc/m2wypXXz/Screen-Shot-2023-11-02-at-21-52-53.png' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
                            {/* <div className="bespoken__product-card" onClick={() => setProducts('Our DIY Wedding')}>
                                <p className="bespoken__product-card-title">Our DIY Wedding</p>
                                <img src='https://i.pinimg.com/236x/b8/a5/fb/b8a5fbb39acfaf780674a62847eccccf.jpg' alt="Bespoken" className="bespoken__product-card-img" />
                            </div> */}
                        </div>
                        : ''}
                    {products ? !images.length ?
                        <div>
                            <span className="loader"></span>
                            <p>Connecting with Pinterest...</p>
                        </div>
                        :
                        <div className='bespoken__product-col'>
                            <p className='bespoken__product-caption'>{getProductCaption()}</p>
                            <div className="bespoken__product-list">
                                {images.map((imageUrl: string, i: number) =>
                                    <div
                                        key={i}
                                        className="bespoken__product-image-wrapper"
                                        onMouseEnter={() => setShowPin(i)}
                                        onMouseLeave={() => setShowPin(-1)}
                                        style={{ animationDelay: `${i * 200}ms` }}
                                    >
                                        <img src={imageUrl} alt={`Image ${i}`} className='bespoken__product-image' />
                                        <a href={getPinterestUrl(imageUrl)} target='_blank'>
                                            <img
                                                src={PinterestSave}
                                                alt='Save to Pinterest'
                                                className={`bespoken__product-image-pin${showPin === i ? '--show' : ''}`}
                                            />
                                        </a>
                                    </div>)}
                            </div>
                            <a href={pinterestPage} target='_blank'><button className="bespoken__product-seemore">See more ➤</button></a>
                        </div>
                        : ''}
                </div>
            </div>
        )
    }

    const renderDiyWedding = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                    <div className="bespoken__row" style={{ marginTop: '10rem' }}>
                        <div className="bespoken__col" style={{ width: '80vw' }}>
                            <h2 className="bespoken__subtitle" style={{ alignSelf: 'center' }}>
                                Coming soon...
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const renderValues = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                </div>
                <div className="bespoken__row">
                    <div className="bespoken__col" style={{ width: '80vw' }}>
                        <p className="bespoken__text" style={{ textAlign: isMobile ? 'left' : 'justify' }}>
                            <strong>I DREAM</strong> of a business where I can express my work in my best way and people can find confidence, detail, excellence and purpose in what they are doing and receiving.
                            <br />
                            <br />
                            <strong>LIFE VALUES</strong> are implied in the product itself and the human relationship that is built behind it. A caring, living and sustainable environment.
                            <br />
                            <br />
                            <strong>CONFI TUNES</strong> may accompany your workplace, coffee, creativity moments and conversations.
                            <br />
                            <br />
                            <strong>BREATH IN DEEPLY & EXHALE SLOWLY</strong> as you move on in your day, because you understand the value of your mind and body as your only vehicle in life. That is your precious production machine.
                            <br />
                            <br />
                            <strong>TRUTHFUL & HONEST</strong> work habits will make it a transparent & good workplace to be.
                            <br />
                            <br />
                            <strong>APPRECIATIVE AND KING LANGUAGE</strong> become pillars of conversations and communication with everyone.
                            <br />
                            <br />
                            <strong>SERVING ONE ANOTHER</strong> with respect, care and love create the product itself.
                            <br />
                            <br />
                            <strong>BE GRACEFUL & COMPASSIONATE</strong> means to give a second chance from your heart. All humans can make mistakes.
                            <br />
                            <br />
                            <strong>YOU CAN FIND A QUIET ROOM</strong> in a garden, a couch or a terrace, where you can converse or think if you need it.
                            <br />
                            <br />
                            <strong>GROWTH GOES IS HAND WITH EVERYTHING THAT YOU DO</strong> Care for your family, your friends, your job & for you.
                            <br />
                            <br />
                            <strong>PURSUIT YOUR PERSONAL TALENTS</strong> your uniqueness, abilities & capacities. Accompany them with a higher thinking of gratitude.
                            <br />
                            <br />
                            <strong>THIS IS A PLACE FOR ABUNDANCE & GIVING</strong> for sharing and growing.
                            <br />
                            <br />
                            That this part of your lifetime might be truly gratifying, edifying and nurturing to your soul!
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    const renderHome = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header">
                    <h1 className="page__header-title">{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                </div>
                <div className="bespoken__section-card" onClick={() => history.push('/bespoken/story')}>
                    <h2 className="bespoken__section-title">{TEXT[lang]['story']}</h2>
                    <h3 className="bespoken__section-description">A bit of the brand's history</h3>
                </div>
                <div className="bespoken__section-card" onClick={() => history.push('/bespoken/products')}>
                    <h2 className="bespoken__section-title">{TEXT[lang]['products']}</h2>
                    <h3 className="bespoken__section-description">See what's being made at the workshop</h3>
                </div>
                <div className="bespoken__section-card" onClick={() => history.push('/bespoken/diy-wedding')}>
                    <h2 className="bespoken__section-title">{TEXT[lang]['our_diy_wedding']}</h2>
                    <h3 className="bespoken__section-description">Our way of celebrating commitment</h3>
                </div>
                <div className="bespoken__section-card" onClick={() => history.push('/bespoken/values')}>
                    <h2 className="bespoken__section-title">{TEXT[lang]['values']}</h2>
                    <h3 className="bespoken__section-description">The heartbeat upon the making</h3>
                </div>
            </div>
        )
    }

    return page === 'HOME' ? renderHome() :
        page === 'STORY' ? renderStory() :
            page === 'VALUES' ? renderValues() :
                page === 'PRODUCTS' ? renderProducts() :
                    page === 'DIY WEDDING' ? renderDiyWedding() : null
}