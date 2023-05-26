import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'
import { TEXT } from '../../constants/lang'

type Props = {}

export default function About({ }: Props) {
  const { lang, isMobile } = useContext(AppContext)

  return (
    <div className="about__container">
      <h1 className="about__title">{TEXT[lang]['about_me']}</h1>
      {isMobile ?
        <div className="about__image-div">
          <img src="https://i.postimg.cc/x8gxHVTx/dany.png" alt="" className="about__image" />
        </div>
        : ''}
      <div className='about__text' dangerouslySetInnerHTML={{ __html: TEXT[lang]['about_me_body'] }} />
      {!isMobile ?
        <div className="about__image-div">
          <img src="https://i.postimg.cc/x8gxHVTx/dany.png" alt="" className="about__image" />
        </div>
        : ''}
    </div>
  )
}