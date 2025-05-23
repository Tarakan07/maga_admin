import { FC } from 'react'
import { IChildren } from '@/types/IChildren'
import { HeaderSetting } from '../../_comp'
import s from './WrapperAddNewResource.module.scss'
import { THeaderSetting } from '../../_comp/HeaderSetting/type'

const WrapperAddNewResource: FC<IChildren & THeaderSetting> = ({
	children,
	...props
}) => {
	return (
		<div className={s.wrapper}>
			<HeaderSetting {...props} />
			{children}
		</div>
	)
}
export default WrapperAddNewResource
