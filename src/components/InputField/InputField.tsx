import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../AppContext'
import { dataObj, onChangeEventType } from '../../types'
import toast from 'react-hot-toast'
import imageCompression from 'browser-image-compression';

type Props = {
    name: string
    updateData?: (name: string, e: onChangeEventType) => void
    className?: string
    type?: string
    label?: string
    placeholder?: string
    value?: string | number | null
    cols?: number
    rows?: number
    style?: React.CSSProperties
    disabled?: boolean
    onSubmit?: () => void
    image?: string
    setImage?: (value: string) => void
}

export default function InputField(props: Props) {
    const { darkMode } = useContext(AppContext)
    let isEnterKeyListenerAdded = false

    const {
        value,
        name,
        label,
        updateData,
        className,
        type,
        placeholder,
        cols,
        rows,
        style,
        disabled,
        onSubmit,
        image,
        setImage,
    } = props

    useEffect(() => {
        if (onSubmit) {
            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === 'Enter') onSubmit()
            }
            if (!isEnterKeyListenerAdded) {
                document.addEventListener('keydown', handleKeyDown)
                isEnterKeyListenerAdded = true
            }
            return () => {
                document.removeEventListener('keydown', handleKeyDown)
                isEnterKeyListenerAdded = false
            }
        }
    }, [onSubmit])

    const convertToBase64 = (file: any) => {
        try {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader()
                fileReader.readAsDataURL(file)
                fileReader.onload = () => {
                    resolve(fileReader.result)
                }
                fileReader.onerror = (error) => {
                    reject(error)
                }
            })
        } catch (err) {
            console.error(err)
            toast.error('Error loading file. Please try again')
        }
    }

    const uploadFile = async (e: any) => {
        try {
            const file = e.target.files[0]
            if (file) {
                if (type === 'file') {
                    const compressOptions = {
                        maxSizeMB: 0.3,
                        maxWidthOrHeight: 1000,
                        useWebWorker: true
                    }

                    const compressedFile = await imageCompression(file, compressOptions)
                    const base64 = await convertToBase64(compressedFile)
                    if (setImage) setImage(String(base64))
                }
            }
        } catch (err) {
            console.error(err)
        }
    }


    return type === 'textarea' ?
        <div className='inputfield__container' style={style}>
            {label ? <h2 className={`inputfield__label${darkMode ? '--dark' : ''}`}>{label}</h2> : ''}
            <textarea
                className={className || `textarea__default${darkMode ? '--dark' : ''}`}
                placeholder={placeholder || ''}
                onChange={e => updateData ? updateData(name, e) : null}
                value={value || undefined}
                cols={cols}
                rows={rows}
                disabled={disabled}
            />
        </div>
        :
        <div className='inputfield__container' style={style}>
            {label ? <h2 className={`inputfield__label${darkMode ? '--dark' : ''}`}>{label}</h2> : ''}
            <input
                type={type || 'text'}
                className={className || `inputfield__default${darkMode ? '--dark' : ''}`}
                placeholder={placeholder || ''}
                accept={type === 'file' ? '.png, .jpg, .jpeg, .webp' : ''}
                onChange={e => updateData ? type === 'file' ? uploadFile(e) : updateData(name, e) : null}
                value={value || undefined}
                disabled={disabled}
            />
        </div>
}