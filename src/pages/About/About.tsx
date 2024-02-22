import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'

type Props = {}

export default function About({ }: Props) {
  const { lang, isMobile } = useContext(AppContext)

  return (
    <div className="about__container">
      {isMobile ?
        <div className="about__col">
          <h1 className="about__title">{TEXT[lang]['about_greeting2']}</h1>
          <div className="about__wrapper">
            <div className="about__image-div">
              <img src="https://i.postimg.cc/XvgKwDnq/Screenshot-from-2023-08-01-14-08-58.png" alt="" className="about__image" />
            </div>
            {lang === 'es' ?
              <p className='about__text'>
                <p>¡Hola, Soy Dany García! Bienvenidos a este espacio en línea donde me encanta escribir, contar historias y compartir un poco de mi trabajo.</p>
                <p>Nací en Colombia, crecí durante algunos años en Estados Unidos, viví una década en Argentina con algunos viajes en el medio, y ahora vivo muy al norte en Escandinavia. Soy mamá de Benja, esposa de Guille y dueña de nuestro pequeña Jack Russell, Indie.</p>
                <p>Me he aventurado mucho por el mundo y pasado por muchas etapas de la vida adulta joven. Siempre he sido una persona a la que le gusta celebrar la vida y los momentos, bailar y reunirse con amigos y familiares. Mi carrera, Administración Hotelera, fue elegida por verdadera vocación, y trabajé para hoteles y empresas privadas en servicios para huéspedes y empleados. Al mirar hacia atrás, tiendo a sonreír, recordando todas las experiencias de aprendizaje y esa sensación reconfortante de haber estado conectada con tanta gente.</p>
                <p>Después de eso, comencé mi negocio soñado en Buenos Aires llamado Bespoken. Había abrazado mi creatividad y realice tocado hechos a mano, confección de regalos y arreglos florales. Dos años después la vida nos trajo a Suecia y hasta el día de hoy me dedico a ser mamá a tiempo completo. ¡Hablemos de GRANDES cambios! Aceptar los cambios y nuevos aprendizajes, compartir partes de mi vida mientras los atravieso, y luego escribir sobre ellos es parte de mi expresión y la forma en que me conecto con los demás. Y mientras escribo y comparto contenido, yo crezco también.</p>
                <p>El cambio siempre es constante; es parte de la vida, y nunca somos los mismos, pero al mismo tiempo, llevamos dentro de nosotros todo lo que alguna vez seremos. Como una pequeña semilla de roble que lleva el potencial de convertirse en un gran árbol de roble, está en nosotros todo el tiempo. Mi objetivo es alcanzar cada día mi completa aceptación y la de los demás, ser sin miedo, ser verdadera y amable conmigo misma, y vivir con libertad y grandeza.</p>
                <p>Tendemos a hacer lo que hacen otras personas, y es fácil caer en la comparación o dudar de nosotros mismos y de nuestro trabajo, pero como dijo Marshall Rosenberg, esto te impide tener compasión hacia ti mismo y hacia los demás. La compasión es observar sin juicio.</p>
                <p>Me llevó algunos años poner en marcha este proyecto de sitio web hasta que finalmente entendí:</p>
                <p><strong>1)</strong> Las cosas se pueden hacer a tu propio ritmo; no hay necesidad de apresurarse. Ve un día a la vez, acompañado de pequeños pasos.</p>
                <p><strong>2)</strong> Todo en la vida es para disfrutar, no para valorar. Una clave para vivir verdaderamente la vida de manera muy presente.</p>
                <p><strong>3)</strong> Puedes inspirarte en otros, pero al final, la clave es ser tú mismo y apreciar tu toque único. Todo lo que alguna vez serás está dentro de ti, así como está en todos los que te rodean.</p>
                <p><strong>4)</strong> El perdón diario es clave para seguir adelante y alcanzar niveles más altos y poderosos.</p>
                <p>Espero que disfrutes leyendo y, mientras lo haces, puedas sentirte Inspirado, Consciente y Creativo con tu propia vida y talentos. Nunca es demasiado tarde para empezar a mirar hacia adentro.</p>
                <p>Con amor,</p>
                <p>Dany</p>
              </p>
              :
              <p className='about__text'>
                <p>I'm Dany García! Welcome to this online space where I love to write, tell stories and share of some of my work.</p>
                <p>I was born in Colombia, raised for a few years in the US, have lived a decade of life in Argentina with a few trips in the middle, and now live way up north in Scandinavia. I am momma to little Benja, wife to Guille and owner of our little Jack Russell, Indie.</p>
                <p>I have adventured around the world quite a lot and have come through many stages of a young adult's life. I've always been a person who likes to celebrate life and moments, to dance, and to get together with friends and family. My career, Hospitality Management, was chosen out of true vocation, and I worked for hotels and private companies within guest and employee services. I look back and tend to smile, remembering all the learning experiences and that heartwarming feeling of having been connected to so many people.</p>
                <p>After that, I started my dream business in Buenos Aires called Bespoken. I had embraced my creativity for crafted adornments, gifts and flowers. Fast-forward two years, and life brought us to Sweden, with my main job as a full-time mom. Talk about BIG changes. Embracing changes and new learnings, sharing bits of my life as I go through them, and then writing about them is part of my expression and the way I connect with others. And as I write and share content, I grow, too.</p>
                <p>Change is always a constant; it is part of life, and we are never the same, but at the same time, we hold in ourselves everything we will ever be. Like a little oak seed holding the potential of becoming a big oak tree, it's in us all the time. My goal is to reach every day my full acceptance and of others, to be fearless, to be true and gentle to myself, and to live in freedom and greatness.</p>
                <p>We tend to do what other people are doing, and it is easy to fall into comparison or doubt about our own selves and our work, but as Marshall Rosenberg said, this blocks you from compassion towards yourself and others. Compassion is to observe without judgement.</p>
                <p>It took me some years to get this website project moving until I finally understood:</p>
                <p><strong>1)</strong> Things can be done at your own pace; there is no need to rush. Go one day at a time, with little steps accompanying.</p>
                <p><strong>2)</strong> Everything in life is to be enjoyed, not valued. A key to truly living life in a very present way.</p>
                <p><strong>3)</strong> You can get inspired by others, but at the end, the key is to be yourself and appreciate your unique touch. Everything you will ever be lies within you, as it lies in everyone around you.</p>
                <p><strong>4)</strong> Daily forgiveness is key to keeping going and reaching higher and more powerful grounds.</p>
                <p>I hope you enjoy reading and, while you are at it, can get Inspired, Aware and Creative with your own life and talents. It is never too late to start looking inside of You.</p>
                <p>With love,</p>
                <p>Dany</p>
              </p>
            }
          </div>
        </div>
        : ''}

      {!isMobile ?
        <div className="about__col">
          <h1 className="about__title">{TEXT[lang]['about_greeting2']}</h1>
          <div className="about__wrapper">
            {lang === 'es' ?
              <p className='about__text'>
                <p>¡Hola, Soy Dany García! Bienvenidos a este espacio en línea donde me encanta escribir, contar historias y compartir un poco de mi trabajo.</p>
                <p>Nací en Colombia, crecí durante algunos años en Estados Unidos, viví una década en Argentina con algunos viajes en el medio, y ahora vivo muy al norte en Escandinavia. Soy mamá de Benja, esposa de Guille y dueña de nuestro pequeña Jack Russell, Indie.</p>
                <p>Me he aventurado mucho por el mundo y pasado por muchas etapas de la vida adulta joven. Siempre he sido una persona a la que le gusta celebrar la vida y los momentos, bailar y reunirse con amigos y familiares. Mi carrera, Administración Hotelera, fue elegida por verdadera vocación, y trabajé para hoteles y empresas privadas en servicios para huéspedes y empleados. Al mirar hacia atrás, tiendo a sonreír, recordando todas las experiencias de aprendizaje y esa sensación reconfortante de haber estado conectada con tanta gente.</p>
                <p>Después de eso, comencé mi negocio soñado en Buenos Aires llamado Bespoken. Había abrazado mi creatividad y realice tocado hechos a mano, confección de regalos y arreglos florales. Dos años después la vida nos trajo a Suecia y hasta el día de hoy me dedico a ser mamá a tiempo completo. ¡Hablemos de GRANDES cambios! Aceptar los cambios y nuevos aprendizajes, compartir partes de mi vida mientras los atravieso, y luego escribir sobre ellos es parte de mi expresión y la forma en que me conecto con los demás. Y mientras escribo y comparto contenido, yo crezco también.</p>
                <p>El cambio siempre es constante; es parte de la vida, y nunca somos los mismos, pero al mismo tiempo, llevamos dentro de nosotros todo lo que alguna vez seremos. Como una pequeña semilla de roble que lleva el potencial de convertirse en un gran árbol de roble, está en nosotros todo el tiempo. Mi objetivo es alcanzar cada día mi completa aceptación y la de los demás, ser sin miedo, ser verdadera y amable conmigo misma, y vivir con libertad y grandeza.</p>
                <p>Tendemos a hacer lo que hacen otras personas, y es fácil caer en la comparación o dudar de nosotros mismos y de nuestro trabajo, pero como dijo Marshall Rosenberg, esto te impide tener compasión hacia ti mismo y hacia los demás. La compasión es observar sin juicio.</p>
                <p>Me llevó algunos años poner en marcha este proyecto de sitio web hasta que finalmente entendí:</p>
                <p><strong>1)</strong> Las cosas se pueden hacer a tu propio ritmo; no hay necesidad de apresurarse. Ve un día a la vez, acompañado de pequeños pasos.</p>
                <p><strong>2)</strong> Todo en la vida es para disfrutar, no para valorar. Una clave para vivir verdaderamente la vida de manera muy presente.</p>
                <p><strong>3)</strong> Puedes inspirarte en otros, pero al final, la clave es ser tú mismo y apreciar tu toque único. Todo lo que alguna vez serás está dentro de ti, así como está en todos los que te rodean.</p>
                <p><strong>4)</strong> El perdón diario es clave para seguir adelante y alcanzar niveles más altos y poderosos.</p>
                <p>Espero que disfrutes leyendo y, mientras lo haces, puedas sentirte Inspirado, Consciente y Creativo con tu propia vida y talentos. Nunca es demasiado tarde para empezar a mirar hacia adentro.</p>
                <p>Con amor,</p>
                <p>Dany</p>
              </p>
              :
              <p className='about__text'>
                <p>I'm Dany García! Welcome to this online space where I love to write, tell stories and share of some of my work.</p>
                <p>I was born in Colombia, raised for a few years in the US, have lived a decade of life in Argentina with a few trips in the middle, and now live way up north in Scandinavia. I am momma to little Benja, wife to Guille and owner of our little Jack Russell, Indie.</p>
                <p>I have adventured around the world quite a lot and have come through many stages of a young adult's life. I've always been a person who likes to celebrate life and moments, to dance, and to get together with friends and family. My career, Hospitality Management, was chosen out of true vocation, and I worked for hotels and private companies within guest and employee services. I look back and tend to smile, remembering all the learning experiences and that heartwarming feeling of having been connected to so many people.</p>
                <p>After that, I started my dream business in Buenos Aires called Bespoken. I had embraced my creativity for crafted adornments, gifts and flowers. Fast-forward two years, and life brought us to Sweden, with my main job as a full-time mom. Talk about BIG changes. Embracing changes and new learnings, sharing bits of my life as I go through them, and then writing about them is part of my expression and the way I connect with others. And as I write and share content, I grow, too.</p>
                <p>Change is always a constant; it is part of life, and we are never the same, but at the same time, we hold in ourselves everything we will ever be. Like a little oak seed holding the potential of becoming a big oak tree, it's in us all the time. My goal is to reach every day my full acceptance and of others, to be fearless, to be true and gentle to myself, and to live in freedom and greatness.</p>
                <p>We tend to do what other people are doing, and it is easy to fall into comparison or doubt about our own selves and our work, but as Marshall Rosenberg said, this blocks you from compassion towards yourself and others. Compassion is to observe without judgement.</p>
                <p>It took me some years to get this website project moving until I finally understood:</p>
                <p><strong>1)</strong> Things can be done at your own pace; there is no need to rush. Go one day at a time, with little steps accompanying.</p>
                <p><strong>2)</strong> Everything in life is to be enjoyed, not valued. A key to truly living life in a very present way.</p>
                <p><strong>3)</strong> You can get inspired by others, but at the end, the key is to be yourself and appreciate your unique touch. Everything you will ever be lies within you, as it lies in everyone around you.</p>
                <p><strong>4)</strong> Daily forgiveness is key to keeping going and reaching higher and more powerful grounds.</p>
                <p>I hope you enjoy reading and, while you are at it, can get Inspired, Aware and Creative with your own life and talents. It is never too late to start looking inside of You.</p>
                <p>With love,</p>
                <p>Dany</p>
              </p>
            }            <div className="about__image-div">
              <img src="https://i.postimg.cc/XvgKwDnq/Screenshot-from-2023-08-01-14-08-58.png" alt="" className="about__image" />
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}