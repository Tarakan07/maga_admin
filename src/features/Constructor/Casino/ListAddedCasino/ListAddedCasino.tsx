import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { TLocationState } from '@/screens/update/type'
import { TVariantResource } from '@/store/newResourceStore/type'
import {
	TCasinoItemRes,
	TUpdateCasino,
} from '@/services/API/casino/casino.type'
import {
	useDeleteCasinoById,
	useUpdateCasinoById,
} from '@/services/API/casino/hook'
import s from './ListAddedCasino.module.scss'
import { ItemAddedContent } from '../../_common/_comp'
type TProps = {
	variantContent: TVariantResource
	data: TCasinoItemRes[]
}
const ListAddedCasino: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem } = useUpdateCasinoById()
	const { mutateAsync: deleteItem } = useDeleteCasinoById()
	const fetchUpdate = async (params: TUpdateCasino) => {
		await updateItem({
			id: params.id,

			body: {
				casino: { ...params, hidden: !params.hidden },
			},
		})
	}
	return (
		<div className={s.list}>
			{data.map((casino) => {
				return (
					<ItemAddedContent
						key={casino.id}
						id={casino.id}
						isHidden={casino.hidden}
						title={casino.name}
						variantContent={variantContent}
						callbackDelete={() => {
							deleteItem({
								id: casino.id,
								lang: casino.language,
							})
						}}
						callbackVisible={() => {
							fetchUpdate(casino)
						}}
						callbackEdit={() => {
							navigate(
								`${routes.UPDATE_CASINO}/${casino.id}/${casino.language}`,
								{
									state: {
										itemId: casino.id,
										bind_id: casino.bind_id,
									},
								} as TLocationState
							)
						}}
					/>
				)
			})}
		</div>
	)
}
export default ListAddedCasino
