import { FC } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import FrontLineSvg from '@/_assets/svg/frontLineSvg'
import { useCascade } from '@/libs/hooks/use-cascade'
import { ArrowDropDownSvg } from '@/_assets/svg/arrows'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import s from './ItemEditCat.module.scss'
import CatVariantEdit from '../../CatVariantEdit'
import { THandleEditParams } from '../../../CatVariantResource/CatVariantResource.type'
import { routes } from '@/constants/routes'

type TProps = {
	category: TCategoriesRes
	isUpLevel?: boolean
	color?: string
	handleEdit: (params: THandleEditParams) => void
}

const ItemEditCat: FC<TProps> = ({
	category,
	isUpLevel = false,
	color,
	handleEdit,
}) => {
	const { activeCascade, toggleActiveCascade } = useCascade()
	return (
		<div
			className={cn(
				s.wrapItem,
				{ [s.upLevel]: isUpLevel },
				{ [s.isOpen]: activeCascade.has(category.id) }
			)}
		>
			<div className={s.itemMain}>
				<div
					className={s.info}
					onClick={() => toggleActiveCascade(category.id)}
				>
					<div className={s.arrow}>
						{!!category.children.length && <ArrowDropDownSvg />}
					</div>

					<div className={s.infoTitle}>
						<P className={s.title} customColor={color}>
							{category.title}
						</P>
						{!!category.children.length && (
							<P color="grey">{category.children.length}</P>
						)}
					</div>
				</div>
				<div className={s.setting}>
					<CatVariantEdit 
						{...{ category, handleEdit }} 
						update_link={routes.UPDATE_CATEGORY} 
						add_link={routes.ADD_CATEGORY} 
					/>
				</div>
			</div>
			{activeCascade.has(category.id) && category.children.length > 0 && (
				<div className={s.itemsChild}>
					{isUpLevel && (
						<div className={s.line}>
							<FrontLineSvg />
						</div>
					)}
					{category.children.map((child) => (
						<ItemEditCat
							key={child.id}
							category={child}
							color={color}
							handleEdit={handleEdit}
						/>
					))}
				</div>
			)}
		</div>
	)
}
export default ItemEditCat
