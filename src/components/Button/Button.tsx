import React from 'react'

type Props = {
    label: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
}

export default function Button({ label, handleClick, className, bgColor, textColor, disabled }: Props) {
    return (
        <button
            className={className || 'button__default'}
            onClick={handleClick}
            style={{
                backgroundColor: bgColor || '#D3AFAF',
                color: textColor || 'black',
                opacity: disabled ? '.3' : ''
            }}
            disabled={disabled}
        >
            {label}
        </button>
    )
}