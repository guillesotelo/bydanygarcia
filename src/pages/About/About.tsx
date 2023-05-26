import React, { useContext } from 'react'
import { AppContext } from '../../AppContext'

type Props = {}

export default function About({ }: Props) {
  const { lang, isMobile } = useContext(AppContext)

  return (
    <div className="about__container">
      <h2 className="about__title">About me</h2>
      {isMobile ?
        <div className="about__image-div">
          <img src="https://i.postimg.cc/x8gxHVTx/dany.png" alt="" className="about__image" />
        </div>
        : ''}
      <p className="about__text">Hi, I'm Daniela Garcia, and welcome to my blog! I'm a passionate writer who loves to share her ideas and experiences with the world. I started this blog as a way to connect with other like-minded people and to create a space where we can all learn and grow together.</p>
      <p className="about__text">I have a degree in Tourism & Hospitality with deep focus in Service and Event Management, and have been writing for over 5 years. I'm constantly seeking out new ideas and inspiration for my writing, and I love to explore different topics and perspectives. On this blog, you'll find a mix of personal stories, lifestyle tips, and thought-provoking articles on a variety of subjects.</p>
      <p className="about__text">When I'm not writing, I enjoy spending time with my family, reading books, and traveling to new places. I'm also a big fan of painting meditation, and I believe in the power of faith and mindfulness to transform our lives.</p>
      <p className="about__text">Thank you for visiting my blog, and I hope you enjoy reading my posts as much as I enjoy writing them!</p>
      {!isMobile ?
        <div className="about__image-div">
          <img src="https://i.postimg.cc/x8gxHVTx/dany.png" alt="" className="about__image" />
        </div>
        : ''}
    </div>
  )
}