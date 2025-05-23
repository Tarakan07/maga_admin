import React, { forwardRef } from 'react'
import cn from 'classnames'
import s from './TextArea.module.scss'
type TProps = {
	value: string
	placeholder: string
	onChange: (params: string) => void
	style?: React.CSSProperties
	type?: 'default' | 'table' | 'input' | 'insert'
	id?: any
	_props?: React.DetailedHTMLProps<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		HTMLTextAreaElement
	>
}

const TextArea = forwardRef<HTMLTextAreaElement, TProps>(
	(
		{
			value,
			onChange,
			placeholder,
			style = {} as React.HTMLAttributes<HTMLTextAreaElement>,
			id,
			type = 'default',
			_props,
		},
		ref
	) => {
		return (
			<textarea
				{..._props}
				id={id}
				ref={ref}
				onChange={(e) => {
					onChange(e.target.value)
				}}
				value={value}
				style={style}
				className={cn(s.textarea, s[type])}
				placeholder={placeholder}
			/>
		)
	}
)

export default TextArea
