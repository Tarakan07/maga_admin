import React, { ReactNode } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import CheckboxArrowSvg from '@/_assets/svg/CheckboxArrowSvg'
import s from './CustomSelect.module.scss'
type TProps = {
	isActive: boolean
	children?: ReactNode
	label?: string
	onChange: () => void
}
const CustomSelect = ({ isActive, children, label, onChange }: TProps) => {
	return (
		<div className={s.wrap}>
			<div
				className={cn(s.checkBox, { [s.active]: isActive })}
				onClick={onChange}
			>
				{isActive && <CheckboxArrowSvg />}
			</div>
			<div className={s.content} onClick={onChange}>
				{!!children && children}
				{!!label && <P size="s">{label}</P>}
			</div>
		</div>
	)
}

export default CustomSelect
