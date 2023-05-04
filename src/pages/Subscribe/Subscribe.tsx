import React, { useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { subscribe } from '../../services/user'

type Props = {}

export default function Subscribe({ }: Props) {
    const [data, setData] = useState({ email: '', fullname: '' })
    const history = useHistory()

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const onSubscribe = async () => {
        const loading = toast.loading('Subscribing...')
        const logged = await subscribe(data)
        if (logged) {
            toast.success('Thank you for joining us!')
            setTimeout(() => history.push('/'), 1500)
        } else toast.error('Error subscribing in, try again later')

        return toast.remove(loading)
    }

    return (
        <div className='subscribe__container'>
            <div className="subscribe__row-container">
                <div className="subscribe__info">
                    <h2>Subscribe</h2>
                    <h3>Subscribe to by DANY GARCIA and stay up-to-date with the latest content, news, and special offers from BESPOKEN.</h3>
                    <h4>As a subscriber, you'll receive:</h4>
                    <ul>
                        <li>Regular updates on the latest blog posts and articles</li>
                        <li>Exclusive access to subscriber-only content</li>
                        <li>First dibs on our special offers and promotions from BESPOKEN</li>
                        <li>The option to unsubscribe at any time</li>
                    </ul>
                    <br />
                    <h4>All this for free!</h4>
                    <br /> <br /> <br /> <br />
                    <p>To subscribe, simply enter your email address in the form and click "Subscribe". We'll send you a confirmation email to verify your email address and confirm your subscription.
                        <br />By subscribing, you agree to receive emails and newsletters from by DANY GARCIA. We will never share or sell your email address to third-party organizations. You can unsubscribe at any time by clicking the "unsubscribe" link at the bottom of our emails.

                        <br /> <br />Thank you for subscribing to by DANY GARCIA! I look forward to sharing my latest content and news with you.
                    </p>

                </div>
            </div>
            <div className="subscribe__box">
                <InputField
                    name='fullname'
                    updateData={updateData}
                    placeholder='Your full name'
                />
                <InputField
                    name='email'
                    updateData={updateData}
                    placeholder='Your email'
                    type='email'
                />
                <Button
                    label='Subscribe'
                    handleClick={onSubscribe}
                    disabled={!data.email || !data.fullname}
                    style={{ alignSelf: 'center' }}
                />
            </div>
        </div >
    )
}