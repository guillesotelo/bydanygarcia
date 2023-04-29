import React from 'react'

type Props = {
    label?: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
    svg?: string
    style?: { [key: string | number]: any }
}

export default function Button({ label, handleClick, className, bgColor, textColor, disabled, svg, style }: Props) {
    return svg ?
        <div
            className="button__default"
            onClick={handleClick}
            style={{
                ...style,
                backgroundColor: bgColor || '#D3AFAF',
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                padding: '.2vw',
                cursor: disabled ? 'not-allowed' : ''
            }}
        >
            <img src={svg} alt="Button" className='button__svg' />
        </div>
        :
        <button
            className={className || 'button__default'}
            onClick={handleClick}
            style={{
                ...style,
                backgroundColor: bgColor || '#D3AFAF',
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                cursor: disabled ? 'not-allowed' : ''
            }}
            disabled={disabled}
        >
            {label || ''}
        </button>

}