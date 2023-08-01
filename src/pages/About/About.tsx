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
            <div className='about__text' dangerouslySetInnerHTML={{ __html: TEXT[lang]['about_me_body'] }} />
          </div>
        </div>
        : ''}

      {!isMobile ?
        <div className="about__col">
          <h1 className="about__title">{TEXT[lang]['about_greeting2']}</h1>
          <div className="about__wrapper">
            <div className='about__text' dangerouslySetInnerHTML={{ __html: TEXT[lang]['about_me_body'] }} />
            <div className="about__image-div">
              <img src="https://i.postimg.cc/XvgKwDnq/Screenshot-from-2023-08-01-14-08-58.png" alt="" className="about__image" />
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}