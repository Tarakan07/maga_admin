import { FC, useEffect, useState } from 'react'
import Tabs from '@/components/Tabs/Tabs'
import { Loader } from '@/libs/UI/Jammer'
import useTabs from '@/libs/hooks/use-tabs'
import { routes } from '@/constants/routes'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './WrapperAddNewSlot.module.scss'
import SeoResource from './SeoResource/SeoResource'
import { HeaderActions } from '../../_common/_comp'
import { TVariantOpenPage } from '../../Constructor.type'
import useLocationLang from '../../_common/_hooks/use-location-lang/use-location-lang'
import { useManipulationData } from '../../_common/_hooks'
import { TTabItem } from '../../../../components/Tabs/type'
import WrapperAddNewResource from '../../_common/_comp/WrapperAddNewResource'
import { TEditingData } from '../../_common/_hooks/use-manipulation-data/type'
import ReceivingData from '../../_common/AddNewResource/ReceivingData/ReceivingData'
import SettingWidget from '../../_common/AddNewResource/SettingWidget/SettingWidget'
import EmbeddedContent from '../../_common/AddNewResource/EmbeddedContent/EmbeddedContent'
import { VariantNewResourceContext } from '../../_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'
import { TSlotsKeysTabs } from '@/store/newResourceStore/slots/slotsStore.type'
import useSlotsStore, { useCommonStore } from '@/store/newResourceStore/slots'
import { TSingleSlotRes, TSlotBody, TSlotCreateReq, TSlotUpdateReq } from '@/services/API/slots/slots.type'
import { useCreateSlot, useDeleteSlotById, useGetSlotById, useUpdateSlotById } from '@/services/API/slots/hook'
import CommonResource from './CommonResource/CommonResource'
import ProviderResource from './ProviderResource/ProviderResource'
import { useFetchConfigProviders } from '../_hooks/use-providers'
import { useFetchConfigGenres } from '../_hooks/use-genres'
import { useFetchConfigCasinos } from '../_hooks/use-casinos'

const INIT_TABS: TTabItem<TSlotsKeysTabs>[] = [
	{
		key: 'seo',
		label: 'SEO',
		isActive: true,
	},
	{
		key: 'common',
		label: 'Общее',
		isActive: false,
	},
	{
		key: 'review',
		label: 'Обзор',
		isActive: false,
	},
	{
		key: 'provider',
		label: 'Связи',
		isActive: false,
	},
]
const WrapperAddNewSlot: FC<TVariantOpenPage> = ({
	editFor,
	labelPage,
	id = -1,
	bind_id = null,
}) => {
	const [interceptionProps, setInterceptionProps] = useState<
		Required<Pick<TVariantOpenPage, 'bind_id' | 'editFor' | 'id'>>
	>({
		editFor,
		id: id || -1,
		bind_id,
	})

	const { getLocalization } = useLanguage()
	const { activeTab, changeTabs, tabs } = useTabs<TSlotsKeysTabs>(INIT_TABS)

	const { slotsObj, bindTransformData, bindActionData } = useSlotsStore()
	const settings = useSettingStore()
	useLocationLang({ variantResource: 'slots' })

	const [editingData, setEditingData] = useState<
		TEditingData<TSingleSlotRes>
	>({
		data: null,
	})

	const { mutateAsync: createItem } = useCreateSlot()
	const { mutateAsync: deleteItem } = useDeleteSlotById()
	const { mutateAsync: getItem } = useGetSlotById()
	const { mutateAsync: updateItem } = useUpdateSlotById()

	///
	const { bindActionsProviders } = useFetchConfigProviders()
	const { bindActionsGenres } = useFetchConfigGenres()
	const { bindActionsCasinos } = useFetchConfigCasinos()

	/////////
	const {
		handleSentData,
		handleCopyStore,
		handleLocalRemove,
		handleLocalLoadData,
	} = useManipulationData({
		bindActionData: {
			loadLocalData: ({ isDelete }) => {
				const data = !isDelete
					? {
							...slotsObj,
							id: Number(new Date()),
							seoStore: {
								...slotsObj.seoStore,
								link: '',
								bind_id: '',
							},
						}
					: {}
				return bindActionData.loadSlotData(data)
			},
			removeLocalData: bindActionData.removeSlotData,
			updateLocalData: bindActionData.updateSlotData,
		},
		editingData,
		variantResource: 'slots',
		copyArray: {
			...slotsObj,
			id: Number(new Date()),
			seoStore: {
				...slotsObj.seoStore,
				link: '',
				bind_id: '',
			},
		},
		bindTransformData,
		editFor: interceptionProps.editFor,
	})

	const fetchChain = async (item: TSlotBody) => {
		setInterceptionProps((prev) => {
			return {
				...prev,
				id: !item?.id ? -1 : item?.id,
				bind_id: item.bind_id || null,
				editFor: 'UPDATE',
			}
		})
		return Promise.all([
			bindActionsProviders.handleUpdateProviders({ slot_id: item.id }),
			bindActionsGenres.handleUpdateGenres({ slot_id: item.id }),
			bindActionsCasinos.handleUpdateCasinos({ slot_id: item.id })
		]).then(([eProviders, eGenres, eCasinos]) => {
			setEditingData({
				data: {
					...item,
					providers: eProviders,
					genres: eGenres,
					casinos: eCasinos,
				},
			})
		})
	}

	const fetchSentData = async () => {
		const sentSetting = handleSentData(settings.getCurrentLang('slots'))
		if (sentSetting !== null) {
			if (interceptionProps.editFor === 'ADD') {
				await createItem(sentSetting.sentData as TSlotCreateReq).then((e) => {
					fetchChain(e)
				})
			}
			if (interceptionProps.editFor === 'UPDATE') {
				await updateItem({
					id: interceptionProps.id,
					body: sentSetting.sentData as TSlotUpdateReq,
				}).then((e) => fetchChain(e))
			}
		}
	}

	const fetchDeleteData = async () => {
		const _id = id || slotsObj?.id || -1
		await deleteItem({
			lang: settings.getCurrentLang('slots'),
			id: _id,
		}).then(() => {
			console.log('success remove slots')
			handleLocalRemove()
		})
	}

	/////////

	useEffect(() => {
		if (interceptionProps.id > -1 || interceptionProps.bind_id) {
			getItem({
				id: -1,
				lang: settings.getCurrentLang('slots'),
				bind_id: interceptionProps.bind_id,
			}).then(async (e) => {
				setInterceptionProps((prev) => {
					return {
						...prev,
						id: !e.dataRes?.id ? -1 : e.dataRes?.id,
						editFor: !e.dataRes?.id ? 'ADD' : 'UPDATE',
					}
				})

				setEditingData({
					data: e.dataRes,
				})

				return Promise.all([
					bindActionsProviders.getSelectedProviders({ slot_id: interceptionProps.id }),
					bindActionsGenres.getSelectedGenres({ slot_id: interceptionProps.id }),
					bindActionsCasinos.getSelectedCasinos({ slot_id: interceptionProps.id })
				]).then(([eProviders, eGenres, eCasinos]) => ({ e, eProviders, eGenres, eCasinos }));
			})
			.then(({ e, eProviders, eGenres, eCasinos }) => {
				if(e.dataRes){
					setEditingData({
						data: {
							...e.dataRes,
							providers: eProviders,
							genres: eGenres,
							casinos: eCasinos,
						}
					})
				}
			})
		}
	}, [interceptionProps.bind_id, settings.getCurrentLang('slots')])


	if (editFor === 'UPDATE' && !editingData.data)
		return (
			<Loader
				params={{
					visible: !editingData.data,
				}}
			/>
		)

	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'slots' }}>
			<WrapperAddNewResource
				title={getLocalization(labelPage)}
				goBack={true}
				pathBack={`/${routes.ADMIN_PAGE}/${routes.SLOTS}/`}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={bindActionData.updateSlotData}
						handleCopyStore={handleCopyStore}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<Tabs
							data={tabs}
							callback={changeTabs}
							saveData={bindActionData.updateSlotData}
						/>
						{activeTab.key === 'seo' && <SeoResource />}
						{activeTab.key === 'common' && <CommonResource />}
						{activeTab.key === 'review' && <ReceivingData />}
						{activeTab.key === 'provider' && 
							<ProviderResource />
						}
					</div>
					<div className={s.widgets_block}>
						{activeTab.key === 'review' && <EmbeddedContent />}
						<SettingWidget
							handleRemove={fetchDeleteData}
							handleSent={fetchSentData}
							handleLocalLoadData={handleLocalLoadData}
							editFor={interceptionProps.editFor}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}
export default WrapperAddNewSlot
