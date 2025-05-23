import { FC, ReactNode } from 'react'
import CrossRemoveSvg from '@/_assets/svg/CrossRemoveSvg'
import s from './WrapperWithRemoveRow.module.scss'
type TProps = {
	children: ReactNode
	callback: () => void
	isShowCross?: boolean
}
const WrapperWithRemoveRow: FC<TProps> = ({
	children,
	callback,
	isShowCross = true,
}) => {
	return (
		<div className={s.wrap}>
			{children}

			<button
				onClick={() => {
					return isShowCross ? callback() : null
				}}
			>
				{isShowCross && <CrossRemoveSvg />}
			</button>
		</div>
	)
}

export default WrapperWithRemoveRow
