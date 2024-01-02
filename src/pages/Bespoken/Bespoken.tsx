import React, { useContext, useEffect, useState } from 'react'
import StoryImage from '../../assets/images/bespoken-story.png'
import BespokenOneYear from '../../assets/images/bespoken-one-year.png'
import Carousel from '../../components/Carousel/Carousel'
import Carousel1 from '../../assets/images/carousel1.png'
import Carousel2 from '../../assets/images/carousel2.png'
import Carousel3 from '../../assets/images/carousel3.png'
import Carousel4 from '../../assets/images/carousel4.png'
import OurDiyWedding1 from '../../assets/images/ourdiywedding1.png'
import { AppContext } from '../../AppContext'
import { useHistory, useLocation } from 'react-router-dom'
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
    const location = useLocation()

    const arrangementsUrl = 'https://www.pinterest.se/bespoken_ar/flower-arrangements/'
    const adornmentsUrl = 'https://www.pinterest.se/bespoken_ar/flower-adornments/'
    const giftsUrl = 'https://www.pinterest.se/bespoken_ar/bespoken-gifts/'
    const weddingUrl = 'https://www.pinterest.se/bespoken_ar/our-diy-wedding/'

    const adornmentsCaption = `I started composing natural flower crowns at the cottage of my in-laws in the summer of 2021. From that time on, I started learning about flowers and techniques so I could create different designs for crowns and ear-cuffs. Materials: Natural flowers, fabric, cold porcelain, stones, among others.`
    const giftsCaption = `It's all about the intention, the love and the details ✨ I found myself creating different gift proposals I called "experiences", as they involve the sensory levels of seeing, touching, tasting and smelling. These were all crafted with a lot of detail and time. All of them were carefully designed for each customer with selected products and brands. As for the packaging and presentation, I chose carton boxes, jute twine, dried flowers and our personalised stamp with sealing wax.`
    const arrangementsCaptions = 'There is a very special feeling I get when I’m out picking flowers, when I bring them home to arrange them and make a composition. Although I have a tendency of “perfection” I like to be a free creator and make my own designs. My dream is to keep my hands busy creating, learning and enjoying the pleasure of holding flowers and making people and spaces joyful and beautiful.'

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
        const category = new URLSearchParams(document.location.search).get('category')
        const categories: { [value: string]: string } = {
            'arrangements': 'Flower Arrangements',
            'adornments': 'Flower Adornments',
            'gifts': 'Bespoken Gifts'
        }
        if (category) setProducts(categories[category])
        else setProducts('')
    }, [location])

    useEffect(() => {
        const imgs = getName(products, 'arrangements') ? arrangements :
            getName(products, 'adornments') ? adornments :
                getName(products, 'gifts') ? gifts : []

        setImages(imgs)
        getPinterestPage()
    }, [products, arrangements, adornments, gifts])

    const getName = (products: string, name: string) => {
        return products.toLowerCase().includes(name)
    }

    const getPinterestImages = async () => {
        try {
            if (page && page.includes('WEDDING')) {
                const _wedding = await scrapeUrl({ url: weddingUrl })
                if (_wedding && Array.isArray(_wedding)) setWedding(_wedding.filter(img => img))
            } else {
                const _arrangements = await scrapeUrl({ url: arrangementsUrl })
                if (_arrangements && Array.isArray(_arrangements)) setArrangements(_arrangements.filter(img => img))

                const _adornments = await scrapeUrl({ url: adornmentsUrl })
                if (_adornments && Array.isArray(_adornments)) setAdornments(_adornments.filter(img => img))

                const _gifts = await scrapeUrl({ url: giftsUrl })
                if (_gifts && Array.isArray(_gifts)) setGifts(_gifts.filter(img => img))
            }

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
                getName(products, 'gifts') ? giftsUrl : weddingUrl)
    }

    const getPinterestUrl = (url: string) => `https://www.pinterest.se/pin/create/button/?url=${encodeURIComponent(url)}`

    const renderStory = () => {
        return (
            <div className="bespoken__container">
                <div className="page__header"><p className="bespoken__product-goback" onClick={() => history.push('/')}>↩ {TEXT[lang].bydanygarcia}</p>
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
                    {products ?
                        <p className="bespoken__product-goback" onClick={() => setProducts('')}>↩ {TEXT[lang].categories_low}</p>
                        : <p className="bespoken__product-goback" onClick={() => history.push('/')}>↩ {TEXT[lang].bydanygarcia}</p>
                    }
                    <h1
                        className="page__header-title"
                        style={{ cursor: 'pointer' }}>
                        {products || 'Products'}
                    </h1>
                    {!products ?
                        <div className="bespoken__product-cards">
                            <div className="bespoken__product-card" onClick={() => history.push('/bespoken/products?category=arrangements')}>
                                <p className="bespoken__product-card-title">Flower<br />Arrangements</p>
                                <img src='https://i.postimg.cc/QMSsn3L9/Screen-Shot-2023-11-02-at-21-47-24.png' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
                            <div className="bespoken__product-card" onClick={() => history.push('/bespoken/products?category=adornments')}>
                                <p className="bespoken__product-card-title">Flower<br />Adornments</p>
                                <img src='https://i.pinimg.com/564x/e5/81/86/e58186617e8c5ec8eb6e2f55ad438901.jpg' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
                            <div className="bespoken__product-card" onClick={() => history.push('/bespoken/products?category=gifts')}>
                                <p className="bespoken__product-card-title">Bespoken<br />Gifts</p>
                                <img src='https://i.postimg.cc/m2wypXXz/Screen-Shot-2023-11-02-at-21-52-53.png' alt="Bespoken" className="bespoken__product-card-img" />
                            </div>
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
                <p className="bespoken__product-goback" onClick={() => history.push('/')}>↩ {TEXT[lang].bydanygarcia}</p>
                <div className="page__header">
                    <h1 className="page__header-title">{page ? TEXT[lang][page.toLowerCase()] || page : ''}</h1>
                </div>
                {lang === 'es' ?
                    <div className="bespoken__row">
                        <div className="bespoken__col" style={{ width: '45vw' }}>
                            <h2 className="bespoken__subtitle">
                                Propuesta
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Guille me propuso matrimonio una tarde cuando regresábamos de un viaje a la costa. Pasamos por un campo de girasoles y hicimos una parada porque "quería grabar un video con su dron". Mientras yo sostenía a Indie y recogía algunas flores (completamente ajena a lo que estaba sucediendo), me pidió que tomara el control remoto por un minuto y de repente vi cómo se arrodillaba, sosteniendo una cajita roja con un hermoso anillo. Estaba en estado de shock por lo que estaba sucediendo y sentí una profunda emoción en mi cuerpo. Un torrente de pensamientos inundó mi mente con un poco de adrenalina y felicidad. ¡Por supuesto que dije que sí!
                            </p>
                            <div className="bespoken__row" >
                                <div className="bespoken__col">
                                    <img src={OurDiyWedding1} alt="Story Image" className="bespoken__story-img" />
                                </div>
                            </div>
                            <br /><br />
                            <h2 className="bespoken__subtitle">
                                Planificación
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Y así, poco a poco, comenzó la planificación. Era el año 2021, estábamos en medio de la pandemia de COVID-19 y también en un año en el que ambos dejamos nuestros trabajos para emprender y cambiar nuestra trayectoria profesional, por lo que establecer una fecha (y un presupuesto) nos llevó un poco de tiempo, pero finalmente decidimos que sería en marzo de 2022.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Tanto Guille como yo amamos ser anfitriones y somos buenos haciendo cosas. Yo acababa de terminar un trabajo de tres años como coordinadora de eventos, así que desde el principio sabíamos quiénes serían los planificadores de nuestra boda (nosotros, por supuesto).
                            </p>

                            <h2 className="bespoken__subtitle">
                                Resumen del paso a paso
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                1. Pensamos en qué tipo de boda queríamos y dónde. Acordamos un estilo de boda bohemia/campestre en Buenos Aires.
                                <br /><br />2. Revisamos lugares, lugares y precios. Elegimos <a href='https://hosteriaelcazador.com.ar/' target='_blank'>Hostería el Cazador</a>, un hermoso lugar histórico en Escobar.
                                <br /><br />3. Guille creó nuestro  <a href='https://danyguille.vercel.app/' target='_blank'>sitio web</a> de boda personal..
                                <br /><br />4. Hicimos la lista de invitados, diseñamos las invitaciones y las enviamos.
                                <br /><br />5. En medio de todo esto, hice un viaje de 3 meses a Colombia donde pude pasar tiempo con mi familia y también hacer mi vestido con la modista de la familia, Estelita. Tuve una despedida de soltera sorpresa organizada por mi mamá con amigas cercanas de la familia en Cartagena.
                                <br /><br />6. Sesiones de lluvia de ideas (gracias Pinterest) y compras para la decoración. Nos encantó ir a Tigre, donde encontramos muchos productos hechos a mano.
                                <br /><br />7. Armado de presupuestos y planificación general, contratación de proveedores (maquillaje y estilista, fotógrafos, diseñador de pasteles, ambientación, etc) degustación de alimentos.
                                <br /><br />8. Diseños, disposición del evento, logística, pagos, diagramas de asientos, listas de reproducción de música.
                                <br /><br />9. Sesión de fotos preboda.
                                <br /><br />10. Organizar visitas familiares, alojamiento y viajes, componer mi corona de flores, boutonnières, entre otras cosas.
                            </p>

                            <h2 className="bespoken__subtitle">
                                El día
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Esperábamos alrededor de 120 invitados. No teníamos idea de cuánto trabajo tendríamos que hacer ese día y el día anterior... Fui un poco ingenua en cuanto a los tiempos y la preparación de arreglos florales y decoración, además de todos los detalles que necesitas atender. ¡Así que tuvimos la suerte de contar con varias personas, unas 15, entre amigos y familiares, que nos ayudaron con todo el montaje. Fue intenso, pero lo disfrutamos. Aunque debo decir que si organizo o aconsejo a alguien sobre su armado de boda, definitivamente sé ahora cuáles son las cosas que debes delegar y los tiempos aproximados.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Tuvimos a nuestra coordinadora de bodas durante el evento, algo que no puedes pasar por alto. Además, el servicio de catering, la música y parte de la ambientación se contrataron para trabajar sin nuestra ayuda. También, en el lugar había una pequeña casa lateral donde pudimos prepararnos.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Ese día el clima no estaba soleado y en realidad se preveía lluvia en el pronóstico, por lo que tuvimos que trasladar la boda al interior del edificio. ¡Hablemos de cambios de planes y ajustes! Pero resultó increíble y lo disfrutamos mucho.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                ¡Disfruten de nuestras fotos!
                            </p>
                        </div>
                    </div>
                    :
                    <div className="bespoken__row">
                        <div className="bespoken__col" style={{ width: '45vw' }}>
                            <h2 className="bespoken__subtitle">
                                Proposal
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Guille proposed to me an afternoon when we were coming back from a weekend coast trip in the summer. We passed by a field of sunflowers and made a stop because he “wanted to make a video with his drone”. As I was holding Indie and picking up flowers (completely unaware of what was happening), he asked me to take his control remote for a minute and suddenly I saw how he was down in one knee, with a red little box holding a beautiful ring. I was in shock of what was happening and felt a deep pressure in my body. A rush of thoughts came to my mind with a bit of adrenaline and happiness. Of course I said yes!
                            </p>
                            <div className="bespoken__row" >
                                <div className="bespoken__col">
                                    <img src={OurDiyWedding1} alt="Story Image" className="bespoken__story-img" />
                                </div>
                            </div>
                            <br /><br />
                            <h2 className="bespoken__subtitle">
                                Planning
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                And so, little by little the planning started. This was the year 2021, we were in the middle of covid and also in a year where we had both left our jobs to entrepreneur and make a change in our career path, so setting up a date (and budget) took us a bit of time but we finally decided for March of 2022.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Both Guille and I love being hosts and are great at doing things. I had also just finished a three year job as event manager, so we knew from the start who would be our wedding’s planners (us, of course).
                            </p>

                            <h2 className="bespoken__subtitle">
                                Step-by-step summary
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                1. We thought about what type of wedding we wanted and where. We agreed on a bohemian/country wedding style in Buenos Aires.
                                <br /><br />2. Overviewed venues, places and prices. We chose <a href='https://hosteriaelcazador.com.ar/' target='_blank'>Hostería el Cazador</a>, a beautiful historical venue in Escobar.
                                <br /><br />3. Guille created our personal <a href='https://danyguille.vercel.app/' target='_blank'>wedding website</a>.
                                <br /><br />4. Made the guest list, designed the invitations and sent them out.
                                <br /><br />5. In the middle I took a 3 month trip to Colombia where I was able to spend some time with my family and also have my dress done by the family dressmaker, Estelita. I had a surprise Bachelorette party from my mom with very close family friends.
                                <br /><br />6. Budgets, planning, suppliers, food tasting, make-up and hair stylist, photographers, cake designer.
                                <br /><br />7. Pinterest “brain-imagestorm” and shopping for decor. We loved hitting Tigre, where we found so many hand-made products.
                                <br /><br />8. Designs, event layout, logistics, payments, seating charts, music playlists!
                                <br /><br />9. Pre-wedding shoot.
                                <br /><br />10. Arrange family visits, accommodation and travel, compose my flower-crown, boutonnières, among other things.
                            </p>

                            <h2 className="bespoken__subtitle">
                                The day
                            </h2>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                We expected around 120 guests. We had no idea how much work we would have to do that day and the day before...I was a bit naive about timings and putting together flower arrangements and decoration, plus all the details that you need to attend. So we were lucky to have more then 15 people (friends and family members) helping us out everywhere! It was intense, but we enjoyed every moment of it. Although, I have to say that if I organise or advice someone about a DIY wedding, I definitely know now what are the things that you need to delegate and approximate timings.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                We did have our wedding coordinator during the event, which is something you cannot miss. Plus, the catering, music and part of the setting was all hired to work without any of our help. Also, within the venue, there was a little side-house where we were able to ready.
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                That day the weather wasn’t sunny and there was in fact some rain predicted in the forecast, so we had to move the wedding inside the building. Talk about plans changing and readjusting! But, it turned out amazing and we enjoyed it so much!
                            </p>
                            <p className="bespoken__text" style={{ alignSelf: 'flex-start' }}>
                                Enjoy our photos!
                            </p>
                        </div>
                    </div>}
                <br /><br />
                <div className='bespoken__product-col'>
                    <div className="bespoken__product-list">
                        {wedding.map((imageUrl: string, i: number) =>
                            <div
                                key={i}
                                className="bespoken__product-image-wrapper"
                                onMouseEnter={() => setShowPin(i)}
                                onMouseLeave={() => setShowPin(-1)}
                                style={{ animationDelay: `${i * 200}ms`, height: '10vw' }}
                            >
                                <img src={imageUrl} alt={`Image ${i}`} className='bespoken__product-image' style={{ height: '10vw' }} />
                                <a href={getPinterestUrl(imageUrl)} target='_blank'>
                                    <img
                                        src={PinterestSave}
                                        alt='Save to Pinterest'
                                        className={`bespoken__product-image-pin${showPin === i ? '--show' : ''}`}
                                    />
                                </a>
                            </div>)}
                    </div>
                    {wedding.length ?
                        <a href={pinterestPage} target='_blank'><button className="bespoken__product-seemore">See more ➤</button></a>
                        :
                        <div>
                            <span className="loader" style={{ position: 'relative' }}></span>
                            <p>Connecting with Pinterest...</p>
                        </div>}
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