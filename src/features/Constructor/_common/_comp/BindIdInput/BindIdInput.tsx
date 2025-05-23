import { toast } from 'react-toastify'
import React, { InputHTMLAttributes } from 'react'
import { Input } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import s from './BindIdInput.module.scss'

interface TProps extends InputHTMLAttributes<HTMLInputElement> {
	placeholder_type?: 'is_shown' | 'not_shown'
	onChange: (e: any) => void
}

const BindIdInput = ({ placeholder_type, onChange, ...props }: TProps) => {
	const { value, placeholder } = props
	return (
		<div className={s.bindId}>
			{value && (
				<div
					onClick={() => {
						navigator.clipboard.writeText(String(value))
						toast.success(`Cкопировано!`)
					}}
				>
					<P>КЛИК для копирования</P>
				</div>
			)}

			<Input {...{ value, placeholder, placeholder_type, onChange }} />
		</div>
	)
}

export default BindIdInput
