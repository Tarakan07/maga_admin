import React, {
	InputHTMLAttributes,
	useState,
	forwardRef,
	useEffect,
} from 'react'
import cn from 'classnames'
import ShowPass from '@/_assets/svg/ShowPass' // Adjust the path as necessary
import HidePass from '@/_assets/svg/HidePass' // Adjust the path as necessary
import s from './Input.module.scss' // Adjust the path as necessary

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
	icon?: boolean
	error?: string | null
	label?: string
	placeholder_type?: 'is_shown' | 'not_shown'
	validationType?: 'meta_title' | 'meta_description'
}

const Input = forwardRef<HTMLInputElement, IInput>(
	(
		{
			icon,
			type,
			label,
			error,
			validationType,
			value = '',
			placeholder_type,
			...props
		},
		ref
	) => {
		const [viewPass, setViewPass] = useState(false)
		const [internalError, setInternalError] = useState<string | null>(null)
		const isPassword = type === 'password'

		///

		useEffect(() => {
			if (validationType) {
				let validationError = null
				const length = String(value).length

				if (validationType === 'meta_title' && (length < 35 || length > 65)) {
					validationError = 'Текст должен быть от 35 до 65 символов'
				}

				if (
					validationType === 'meta_description' &&
					(length < 120 || length > 320)
				) {
					validationError = 'Текст должен быть от 120 до 320 символов'
				}

				setInternalError(validationError)
			}
		}, [value, validationType])

		///

		return (
			<div className={s.container}>
				{label && <label>{label}</label>}
				<div
					className={cn(s.inputWrapper, {
						[s.errorBorder]: error,
					})}
				>
					{placeholder_type === 'is_shown' && (
						<div className={cn(s.placeholder, { [s.inactive]: !!value })}>
							{props.placeholder}
						</div>
					)}
					<input
						{...props}
						ref={ref}
						className={s.input}
						placeholder={
							placeholder_type === 'not_shown' || !placeholder_type
								? props.placeholder
								: ''
						}
						value={value || ''}
						type={isPassword && viewPass ? 'text' : type}
					/>
					{icon && isPassword && (
						<div className={s.icon} onClick={() => setViewPass(!viewPass)}>
							{!viewPass ? <ShowPass /> : <HidePass />}
						</div>
					)}
					{(error || internalError) && (
						<p className={s.error}>{error || internalError}</p>
					)}
				</div>
			</div>
		)
	}
)

Input.displayName = 'Input'

export default Input
