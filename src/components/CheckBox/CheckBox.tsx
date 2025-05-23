import React, { FC } from 'react'
import cn from 'classnames'
import CheckboxArrowSvg from '@/_assets/svg/CheckboxArrowSvg'
import s from './CheckBox.module.scss'
type TProps = {
	isActive: boolean
	callback?: () => void
}
const CheckBox: FC<TProps> = ({ isActive, callback }) => {
	return (
		<div
			className={cn(s.container, { [s.isActive]: isActive })}
			onClick={() => {
				callback && callback()
			}}
		>
			<CheckboxArrowSvg />
		</div>
	)
}

export default CheckBox
