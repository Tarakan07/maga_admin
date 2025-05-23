import React, { FC } from 'react'
import cn from 'classnames'
import { IButton } from './type'
import s from './Button.module.scss'

const Button: FC<IButton> = ({
	icon = null,
	children,
	type,
	disabled = false,
	size = 'm',
	onClick,
	...props
}) => {
	return (
		<button
			disabled={disabled}
			className={cn(s.button, s[type], s[size], disabled && s.disabled)}
			onClick={onClick}
			{...props}
		>
			{children}
			{icon && icon}
		</button>
	)
}

export default Button
