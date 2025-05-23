import React, { ReactNode } from 'react'
import cn from 'classnames'
import SelectDelBtnSvg from '@/_assets/svg/SelectDelBtnSvg'
import s from './Tag.module.scss'
type TProps = {
	children: ReactNode
	isRemove?: boolean
	onClick: () => void
}
const Tag = ({ children, onClick, isRemove = true }: TProps) => {
	return (
		<div className={cn(s.card, { [s.remove]: isRemove })} onClick={onClick}>
			{children}
			{isRemove && (
				<div>
					<SelectDelBtnSvg />
				</div>
			)}
		</div>
	)
}

export default Tag
