import React, { useContext, useState } from 'react'
import InputField from '../../components/InputField/InputField'
import Button from '../../components/Button/Button'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { subscribe } from '../../services/app'
import { TEXT } from '../../constants/lang'
import { AppContext } from '../../AppContext'
import { onChangeEventType } from '../../types'
import { goToMainDomain } from '../../helpers'

type Props = {}

export default function Subscribe({ }: Props) {
    const [data, setData] = useState({ email: '', fullname: '' })
    const history = useHistory()
    const { lang, isMobile } = useContext(AppContext)

    const updateData = (key: string, e: onChangeEventType) => {
        const value = e.target.value
        setData({ ...data, [key]: value })
    }

    const onSubscribe = async () => {
        const loading = toast.loading(TEXT[lang]['subscribing'])
        if (!data.fullname.includes(' ') || !data.email.includes('@') || !data.email.includes('.')) {
            toast.error(lang === 'es' ? 'Checkea los campos' : 'Check the fields')
            return toast.remove(loading)
        }
        const logged = await subscribe(data)
        if (logged) {
            toast.success(TEXT[lang]['subscribe_ok'])
            setTimeout(() => goToMainDomain('/'), 1500)
        } else toast.error(TEXT[lang]['subscribe_error'])

        return toast.remove(loading)
    }

    return (
        <div className='subscribe__container'>
            <div className="subscribe-col">
                <h2>{lang === 'es' ? 'Únete a mi Comunidad' : 'Join my Mail Community'}</h2>
                <h3>{lang === 'es' ? 'Únete y recibe cartas mensuales 🖤' : 'Sign up for monthly letters 🖤'}</h3>
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
                    label={lang === 'es' ? 'Únete' : 'Join'}
                    handleClick={onSubscribe}
                    disabled={!data.email || !data.fullname}
                    style={{ width: '100%' }}
                />
            </div>
        </div >
    )
}