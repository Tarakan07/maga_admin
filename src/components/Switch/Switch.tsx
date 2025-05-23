import { FC } from 'react'
import cn from 'classnames'
import s from './Switch.module.scss'
type TProps = { isActive: boolean; toggle: () => void }
const Switch: FC<TProps> = ({ isActive, toggle }) => {
	return (
		<div
			className={cn(s.switchContainer, { [s.on]: isActive })}
			onClick={toggle}
		>
			<div className={s.switchBall} />
		</div>
	)
}
export default Switch
