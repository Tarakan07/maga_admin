import { FC, ReactNode } from 'react'
import s from './WrapperWithBlockPlaceInsert.module.scss'
import BlockPlaceInsert from '../BlockPlaceInsert/BlockPlaceInsert'
type TProps = {
	children: ReactNode
	dragOver: boolean
}
const WrapperWithBlockPlaceInsert: FC<TProps> = ({ children, dragOver }) => {
	return (
		<div className={s.wrap}>
			<>{children}</>
			<div className={s.wrapBlockPlaceInsert}>
				{dragOver && <BlockPlaceInsert />}
			</div>
		</div>
	)
}

export default WrapperWithBlockPlaceInsert
