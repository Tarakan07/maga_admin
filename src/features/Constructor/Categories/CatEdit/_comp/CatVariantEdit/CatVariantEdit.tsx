import { MoreEditSvg, PlusSvg } from '@/_assets/svg/editTag'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { THandleEditParams } from '../../CatVariantResource/CatVariantResource.type'
import s from './CatVariantEdit.module.scss'
import { TGenresBody } from '@/services/API/genres/genres.type'
type TProps = {
	category?: TCategoriesRes | TProvidersBody | TGenresBody | null
	handleEdit: (params: THandleEditParams) => void
	add_link?: string | null
	update_link?: string | null
}
const CatVariantEdit: FC<TProps> = ({ category, handleEdit, add_link = null, update_link = null }) => {
	const { openModal } = useModal()
	return (
		<div className={s.container}>
			{add_link && 
				<Link to={add_link}>
					<PlusSvg />
				</Link>
			}
			{category && update_link && (
				<Link to={`${update_link}/${category.id}`}>
					<MoreEditSvg />
				</Link>
			)}
		</div>
	)
}
export default CatVariantEdit
