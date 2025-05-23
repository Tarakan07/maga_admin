import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { P } from '@/libs/UI/CustomTags'
import PlusBtnSvg from '@/_assets/svg/PlusBtnSvg'
import s from './AddNewItem.module.scss'
type TProps = {
	labelBtn: string
	link: string
}
const AddNewItem: FC<TProps> = ({ labelBtn, link }) => {
	return (
		<Link to={link} className={s.wrap}>
			<P size="m" weight={600}>
				{labelBtn}
			</P>
			<div>
				<PlusBtnSvg />
			</div>
		</Link>
	)
}
export default AddNewItem
