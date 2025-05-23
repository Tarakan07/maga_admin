import { routes } from '@/constants/routes'
import { useCascade } from '@/libs/hooks/use-cascade'
import { P } from '@/libs/UI/CustomTags'
import { TGenresBody } from '@/services/API/genres/genres.type'
import cn from 'classnames'
import { FC } from 'react'
import { THandleEditParams } from '../../../CatVariantResource/CatVariantResource.type'
import CatVariantEdit from '../../CatVariantEdit'
import s from './ItemEditCat.module.scss'

type TProps = {
	genre: TGenresBody
	isUpLevel?: boolean
	color?: string
	handleEdit: (params: THandleEditParams) => void
}

const ItemEditCat: FC<TProps> = ({
	genre,
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
				{ [s.isOpen]: activeCascade.has(genre.id) }
			)}
		>
			<div className={s.itemMain}>
				<div
					className={s.info}
					onClick={() => toggleActiveCascade(genre.id)}
				>
					{/* <div className={s.arrow}>
						{!!provider.children.length && <ArrowDropDownSvg />}
					</div> */}

					<div className={s.infoTitle}>
						<P className={s.title} customColor={color}>
							{genre.title}
						</P>
						{/* {!!provider.children.length && (
							<P color="grey">{provider.children.length}</P>
						)} */}
					</div>
				</div>
				<div className={s.setting}>
					<CatVariantEdit 
						category={genre} 
						add_link={routes.ADD_GENRE}
						update_link={routes.UPDATE_GENRE} 
						{...{ handleEdit }} 
					/>
				</div>
			</div>
			{/* {activeCascade.has(provider.id) && provider.children.length > 0 && (
				<div className={s.itemsChild}>
					{isUpLevel && (
						<div className={s.line}>
							<FrontLineSvg />
						</div>
					)}
					{provider.children.map((child) => (
						<ItemEditCat
							key={child.id}
							provider={child}
							color={color}
							handleEdit={handleEdit}
						/>
					))}
				</div>
			)} */}
		</div>
	)
}
export default ItemEditCat
