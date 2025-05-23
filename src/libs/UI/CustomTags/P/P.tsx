import { FC } from 'react'
import cn from 'classnames'
import { IChildren } from '@/types/IChildren'
import { IP } from './type'
import s from './P.module.scss'
const P: FC<IChildren & IP> = ({
	children,
	size = 's',
	color = 'default',
	customColor = '',
	weight,
	className,
}) => {
	return (
		<p
			className={cn(s.p, s[size], s[color], className)}
			style={{ fontWeight: weight, color: customColor }}
		>
			{children}
		</p>
	)
}
export default P
