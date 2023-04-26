import React, { useState } from 'react'
import { loginUser } from '../../services'
import { toast } from 'react-hot-toast';

type Props = {}

export default function Login({ }: Props) {
    const [data, setData] = useState({})

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const onLogin = async () => {
        await toast.promise(
            loginUser(data),
            {
                loading: 'Logging in...',
                success: <b>Logged successfully</b>,
                error: <b>Error logging in</b>,
            })
    }

    return (
        <div className="login__container">
            <div className="login__box">
                <input type="text" className="contact__input" placeholder='Username' onChange={e => updateData('username', e)} />
                <input type="password" className="contact__input" placeholder='Password' onChange={e => updateData('password', e)} />
                <h4 className="contact__btn" onClick={onLogin}>Login</h4>
            </div>
        </div>
    )
}