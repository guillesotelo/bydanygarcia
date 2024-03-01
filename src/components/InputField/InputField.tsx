import { onChangeEventType } from '../../types'

type Props = {
    name: string
    updateData: (name: string, e: onChangeEventType) => void
    className?: string
    type?: string
    placeholder?: string
    value?: string | number
    cols?: number
    rows?: number
    disabled?: boolean
}

export default function InputField({ value, name, updateData, className, type, placeholder, cols, rows, disabled }: Props) {
    return type === 'textarea' ?
        <textarea
            className={className || 'textarea__default'}
            placeholder={placeholder || ''}
            onChange={e => updateData(name, e)}
            value={value}
            cols={cols}
            rows={rows}
            disabled={disabled}
        />
        :
        <input
            type={type || 'text'}
            className={className || 'inputfield__default'}
            placeholder={placeholder || ''}
            onChange={e => updateData(name, e)}
            value={value}
            disabled={disabled}
        />
}