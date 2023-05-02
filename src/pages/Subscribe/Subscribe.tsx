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
        <div className='login__container'>
            <div className="login__box">
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
        </div>
    )
}