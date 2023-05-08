import React, { useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'

type Props = {}

export default function Contact({ }: Props) {
    const [data, setData] = useState({ email: '', name: '', message: '' })
    const [messageSent, setMessageSent] = useState(false)

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    return messageSent ?
        <div className="contact__container">
            <h1 className="contact__title" > Thank you! 😊</h1>
            <h4 className="contact__text">I will respond you as soon as possible.</h4>
        </div >
        :
        <div className="contact__container">
            <div className="contact__row-container">
                <div className="contact__info">
                    <h2>Concact Me</h2>
                    <h4>Have a question, comment, or concern? Please fill out the form and I'll get back to you as soon as possible.</h4>
                    <br /> <br /> <br /> <br />
                    <p>
                        By submitting this form, you agree to our Privacy Policy. I will only use your information to respond to your inquiry and will not share or sell it to third-party organizations.
                    </p>
                </div>
                <div className="contact__box">
                    <InputField
                        name='name'
                        updateData={updateData}
                        placeholder='Your Name'
                        type='text'
                    />
                    <InputField
                        name='email'
                        updateData={updateData}
                        placeholder='Your Email'
                        type='email'
                    />
                    <InputField
                        name='message'
                        updateData={updateData}
                        placeholder='Your Message'
                        type='textarea'
                        rows={7}
                    />
                    <Button
                        label='Login'
                        handleClick={() => setMessageSent(true)}
                        disabled={!data.email || !data.name || !data.message}
                        style={{ alignSelf: 'center' }}
                    />
                </div>
            </div>
        </div>
}

