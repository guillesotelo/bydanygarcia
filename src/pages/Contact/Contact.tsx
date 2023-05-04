import React, { useState } from 'react'

type Props = {}

export default function Contact({ }: Props) {
    const [messageSent, setMessageSent] = useState(false)

    return messageSent ?
        <div className="contact__container">
            <h1 className="contact__title" > Thank you! 😊</h1>
            <h4 className="contact__text">I will respond you as soon as possible.</h4>
        </div >
        :
        <div className="contact__container">
            <div className="subscribe__row-container">
                <div className="subscribe__info">
                    <h2>Concact Me</h2>
                    <h4>Have a question, comment, or concern? Please fill out the form and I'll get back to you as soon as possible.</h4>
                    <br /> <br /> <br /> <br />
                    <p>
                    By submitting this form, you agree to our Privacy Policy. I will only use your information to respond to your inquiry and will not share or sell it to third-party organizations.
                    </p>
                </div>
                <div className="contact__box">
                    <input type="text" className="contact__input" placeholder='Your Name' />
                    <input type="text" className="contact__input" placeholder='Your Email' />
                    <textarea rows={8} className="contact__input-textarea" placeholder='Your Message' />
                    <h4 className="contact__btn" onClick={() => setMessageSent(true)}>Send</h4>
                </div>
            </div>
        </div>
}

