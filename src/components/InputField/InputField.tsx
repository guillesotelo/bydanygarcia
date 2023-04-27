import React, { SyntheticEvent } from 'react'

type Props = {
    name: string
    updateData: (name: string, e: SyntheticEvent) => void
    className?: string
    type?: string
    placeholder?: string
}

export default function InputField({ name, updateData, className, type, placeholder }: Props) {
    return (
        <input
            type={type || 'text'}
            className={className || 'inputfield__default'}
            placeholder={placeholder || ''}
            onChange={e => updateData(name, e)}
        />
    )
}