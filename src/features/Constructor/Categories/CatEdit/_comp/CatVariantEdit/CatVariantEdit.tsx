import { FC } from 'react'
import { Link } from 'react-router-dom'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { MoreEditSvg, PlusSvg } from '@/_assets/svg/editTag'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import s from './CatVariantEdit.module.scss'
import { THandleEditParams } from '../../CatVariantResource/CatVariantResource.type'
type TProps = {
	category?: TCategoriesRes | null
	handleEdit: (params: THandleEditParams) => void
	add_link?: string | null
	update_link?: string | null
	child?: boolean
}
const CatVariantEdit: FC<TProps> = ({
	category,
	handleEdit,
	add_link = null,
	update_link = null,
	child = false,
}) => {
	const { openModal } = useModal()
	return (
		<div className={s.container}>
			{!child && add_link && (
				<Link to={add_link}>
					<PlusSvg />
				</Link>
			)}
			{category && update_link && (
				<Link to={`${update_link}/${category.id}`}>
					<MoreEditSvg />
				</Link>
			)}
		</div>
	)
}
export default CatVariantEdit
