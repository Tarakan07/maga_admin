import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { TLocationState } from '@/screens/update/type'
import { TVariantResource } from '@/store/newResourceStore/type'
import s from './ListAddedSlot.module.scss'
import { ItemAddedContent } from '../../_common/_comp'
import { TSlotBody, TUpdateSlot } from '@/services/API/slots/slots.type'
import { useDeleteSlotById, useUpdateSlotById } from '@/services/API/slots/hook'
type TProps = {
	variantContent: TVariantResource
	data: TSlotBody[]
}
const ListAddedSlot: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem } = useUpdateSlotById()
	const { mutateAsync: deleteItem } = useDeleteSlotById()
	const fetchUpdate = async (params: TUpdateSlot) => {
		await updateItem({
			id: params.id,

			body: {
				slot: { ...params, hidden: !params.hidden },
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
								`${routes.UPDATE_SLOTS}/${casino.bind_id}/${casino.language}`,
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
export default ListAddedSlot
