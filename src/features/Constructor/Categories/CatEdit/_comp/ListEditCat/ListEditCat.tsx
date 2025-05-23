import { FC, useRef } from 'react'
import { Link } from 'react-router-dom'
import { P } from '@/libs/UI/CustomTags'
import PlusSvg from '@/_assets/svg/PlusSvg'
import { routes } from '@/constants/routes'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import s from './ListEditCat.module.scss'
import ItemEditCat from './ItemEditCat/ItemEditCat'
import { THandleEditParams } from '../../CatVariantResource/CatVariantResource.type'

type TProps = {
	categories: TCategoriesRes[]
	handleEdit: (params: THandleEditParams) => void
}
const ListEditCat: FC<TProps> = ({ categories, handleEdit }) => {
	const colors = useRef(
		['#2CDD82', '#CC345D', '#00CFF2', '#FFEC38', '#FF9159'].sort(
			() => Math.random() - 0.5
		)
	).current
	return (
		<div className={s.container}>
			{!!!categories.length && (
				<Link to={routes.ADD_CATEGORY} className={s.empty}>
					<PlusSvg />
					<P weight={500} color="green">
						Добавить
					</P>
				</Link>
			)}
			{categories.map((category, index) => (
				<ItemEditCat
					key={category.id}
					category={category}
					isUpLevel={true}
					color={colors[index] ?? colors[0]}
					handleEdit={handleEdit}
				/>
			))}
		</div>
	)
}
export default ListEditCat
