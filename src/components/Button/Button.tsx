import React from 'react'

type Props = {
    label?: string
    className?: string
    bgColor?: string
    textColor?: string
    handleClick: () => any
    disabled?: boolean
    svg?: string
    style?: React.CSSProperties
}

export default function Button({ label, handleClick, className, bgColor, textColor, disabled, svg, style }: Props) {
    return svg ?
        <div
            className="button__default"
            onClick={handleClick}
            style={{
                ...style,
                backgroundColor: bgColor || '#ece7e6',
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
                backgroundColor: bgColor || '#ece7e6',
                color: textColor || 'black',
                opacity: disabled ? '.3' : '',
                cursor: disabled ? 'not-allowed' : ''
            }}
            disabled={disabled}
        >
            {label || ''}
        </button>

}