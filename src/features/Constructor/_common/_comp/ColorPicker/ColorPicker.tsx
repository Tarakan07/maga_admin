import React, { FC, useEffect, useState } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import s from './ColorPicker.module.scss'
type TProps = {
	label: string
	activeColor?: string
	onChange: (params: string) => void
}
const COLORS_DEFAULT = [
	'#FF327C',
	'#14CCFF',
	'#FF3B3B',
	'#9CFF06',
	'#FF8D3B',
	'#0052F2',
	'#FFE03B',
	'#FF9BFE',
	'#7A3BFF',
]
const ColorPicker: FC<TProps> = ({ label, activeColor = '', onChange }) => {
	const [isShow, setShow] = useState(false)
	useEffect(() => {
		if (!!!activeColor.length) onChange('#FF327C')
	}, [activeColor])
	return (
		<div className={s.wrap}>
			<div className={s.header}>
				<P weight={500}>{label}</P>
				<div
					className={s.picker}
					onClick={() => {
						setShow((prev) => !prev)
					}}
				>
					<div
						className={s.color}
						style={{
							background:
								activeColor.length < 1 ? COLORS_DEFAULT[0] : activeColor,
						}}
					/>
					<ArrowSelectorSvg />
				</div>
			</div>
			<div className={cn(s.variantColors, isShow ? s.active : '')}>
				{COLORS_DEFAULT.map((color) => {
					return (
						<div
							key={color}
							style={{ background: color }}
							className={activeColor === color ? s.active : ''}
							onClick={() => {
								onChange(color)
								setShow(false)
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default ColorPicker
