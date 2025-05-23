import { FC, ReactNode } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowDropDownSvg } from '@/_assets/svg/arrows'
import s from './WrapperCatItemEdit.module.scss'
import { TCatEditProps } from '../../../WrapperCat.type'
import CatVariantEdit from '../CatVariantEdit/CatVariantEdit'
import { THandleEditParams } from '../../CatVariantResource/CatVariantResource.type'
import { routes } from '@/constants/routes'
type TProps = {
	editActivity: TCatEditProps
	count: number
	handleEdit: (params: THandleEditParams) => void
	children: ReactNode
}
const WrapperCatItemEdit: FC<TProps> = ({
	editActivity,
	children,
	handleEdit,
	count,
}) => {
	const { _key, changeEditCat, isActiveEdit, isCanEdit, label, add_link, update_link } = editActivity
	return (
		<div className={s.container}>
			<div className={cn(s.wrap, { [s.isOpen]: isActiveEdit })}>
				<div
					className={s.left}
					onClick={() => {
						changeEditCat({ isShow: !isActiveEdit, _key })
					}}
				>
					<ArrowDropDownSvg />
					<div className={s.info}>
						<P size="l">{label}</P>
						<P color="grey">{count}</P>
					</div>
				</div>
				<CatVariantEdit 
					{...{ handleEdit, add_link, update_link }} 
				/>
			</div>
			{isActiveEdit && children}
		</div>
	)
}

export default WrapperCatItemEdit
