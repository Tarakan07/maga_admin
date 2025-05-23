import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useUpdateHistoryById } from '@/services/API/history/hook'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import {
	THistoryItemRes,
	TUpdateHistory,
} from '@/services/API/history/history.type'
import s from './ListAddedHistory.module.scss'
import ItemHistory from '../../_common/_comp/ItemHistory/ItemHistory'

type TProps = {
	variantContent: TVariantResource
	data: THistoryItemRes[]
}
const ListAddedHistory: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem, isLoading } = useUpdateHistoryById()
	const settings = useSettingStore()
	const fetchUpdate = async (params: TUpdateHistory) => {
		console.log(params)
		await updateItem({
			id: params.id,
			body: {
				story: { ...params, hidden: !params.hidden },
			},
		})
	}

	return (
		<div className={s.list}>
			{data.map((history) => {
				return (
					<ItemHistory
						key={history.id}
						id={history.id}
						isHidden={history.hidden}
						title={history.name}
						image={history.image}
						variantContent={variantContent}
						callbackVisible={() => {
							fetchUpdate(history)
						}}
						callbackEdit={() => {
							navigate(routes.UPDATE_HISTORY, {
								state: {
									itemId: history.id,
								},
							})
						}}
					/>
				)
			})}
		</div>
	)
}
export default ListAddedHistory
