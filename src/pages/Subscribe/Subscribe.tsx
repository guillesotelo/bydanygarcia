import React, { useContext, useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { subscribe } from '../../services/user'
import { TEXT } from '../../constants/lang'
import { AppContext } from '../../AppContext'

type Props = {}

export default function Subscribe({ }: Props) {
    const [data, setData] = useState({ email: '', fullname: '' })
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    const updateData = (key: string, e: { [key: string | number]: any }) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const onSubscribe = async () => {
        const loading = toast.loading(TEXT[lang]['subscribing'])
        const logged = await subscribe(data)
        if (logged) {
            toast.success(TEXT[lang]['subscribe_ok'])
            setTimeout(() => history.push('/'), 1500)
        } else toast.error(TEXT[lang]['subscribe_error'])

        return toast.remove(loading)
    }

    return (
        <div className='subscribe__container'>
            <div className="subscribe__row-container">
                <div className="subscribe__info" dangerouslySetInnerHTML={{ __html: TEXT[lang]['subscribe_info'] }} />
            </div>
            <div className="subscribe__box">
                <InputField
                    name='fullname'
                    updateData={updateData}
                    placeholder={TEXT[lang]['full_name']}
                />
                <InputField
                    name='email'
                    updateData={updateData}
                    placeholder={TEXT[lang]['your_email']}
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