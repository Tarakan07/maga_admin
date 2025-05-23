import { FC, useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useHistoryStore from '@/store/newResourceStore/history'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	THistoryCreateReq,
	THistoryUpdateReq,
	TSingleHistoryRes,
} from '@/services/API/history/history.type'
import {
	useCreateHistory,
	useDeleteHistoryById,
	useGetHistoryById,
	useUpdateHistoryById,
} from '@/services/API/history/hook'
import s from './WrapperAddNewHistory.module.scss'
import { HeaderActions } from '../../_common/_comp'
import { TVariantOpenPage } from '../../Constructor.type'
import { useManipulationData } from '../../_common/_hooks'
import HistoryResource from './HistoryResource/HistoryResource'
import useLocationLang from '../../_common/_hooks/use-location-lang/use-location-lang'
import WrapperAddNewResource from '../../_common/_comp/WrapperAddNewResource'
import { TEditingData } from '../../_common/_hooks/use-manipulation-data/type'
import SettingWidget from '../../_common/AddNewResource/SettingWidget/SettingWidget'
import { VariantNewResourceContext } from '../../_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'

const WrapperAddNewNews: FC<TVariantOpenPage> = ({
	editFor,
	labelPage,
	id = -1,
}) => {
	const { getLocalization } = useLanguage()
	const {
		id: historyLocalId,
		bindActionData,
		bindTransformData,
	} = useHistoryStore()
	const { bindStore } = useConstructorStore()
	const settings = useSettingStore()
	useLocationLang({ variantResource: 'history' })

	/////////

	const [editingData, setEditingData] = useState<
		TEditingData<TSingleHistoryRes>
	>({
		data: null,
	})

	const { mutateAsync: createItem } = useCreateHistory()
	const { mutateAsync: deleteItem } = useDeleteHistoryById()
	const { mutateAsync: getItem } = useGetHistoryById()
	const { mutateAsync: updateItem } = useUpdateHistoryById()

	/////////

	const { handleSentData, handleLocalRemove } = useManipulationData({
		bindActionData: {
			loadLocalData: bindActionData.loadHistoryData,
			removeLocalData: bindActionData.removeHistoryData,
			updateLocalData: bindActionData.updateHistoryData,
		},
		copyArray: null,
		editingData,
		variantResource: 'history',
		bindTransformData,
		editFor,
	})

	const fetchSentData = async () => {
		const sentSetting = handleSentData(settings.getCurrentLang('history'))

		if (sentSetting !== null) {
			if (editFor === 'ADD') {
				await createItem(sentSetting.sentData as THistoryCreateReq).then(() => {
					sentSetting.clear()
				})
			}
			if (editFor === 'UPDATE') {
				let update = sentSetting.sentData as THistoryUpdateReq

				await updateItem({
					id,
					body: update,
				}).then(() => {
					sentSetting.clear()
				})
			}
		}
	}

	const fetchDeleteNews = async () => {
		const _id = id || historyLocalId || -1
		await deleteItem({
			lang: settings.getCurrentLang('history'),
			id: _id,
		}).then(() => {
			handleLocalRemove()
		})
	}

	/////////

	useEffect(() => {
		if (id > -1) {
			getItem({ id, lang: settings.getCurrentLang('history') }).then((e) => {
				setEditingData({
					data: e.dataRes,
				})
			})
		}
	}, [id, settings.getCurrentLang('history')])

	if (editFor === 'UPDATE' && !editingData.data)
		return (
			<Loader
				params={{
					visible: !editingData.data,
				}}
			/>
		)
	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'history' }}>
			<WrapperAddNewResource
				title={getLocalization(labelPage)}
				goBack={true}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={bindActionData.updateHistoryData}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<HistoryResource />
					</div>
					<div className={s.widgets_block}>
						<SettingWidget
							handleRemove={fetchDeleteNews}
							handleSent={fetchSentData}
							editFor={editFor}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}
export default WrapperAddNewNews
