import { FC, useEffect, useState } from 'react'
import Tabs from '@/components/Tabs/Tabs'
import { Loader } from '@/libs/UI/Jammer'
import useTabs from '@/libs/hooks/use-tabs'
import { routes } from '@/constants/routes'
import useCasinoStore from '@/store/newResourceStore/casino'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TCasinoKeysTabs } from '@/store/newResourceStore/casino/casinoStore.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { useCategoriesStore } from '@/store/newResourceStore/_common/categories/categoriesStore'
import {
	TCasinoCreateReq,
	TCasinoItemRes,
	TCasinoUpdateReq,
	TSingleCasinoRes,
} from '@/services/API/casino/casino.type'
import {
	useCreateCasino,
	useDeleteCasinoById,
	useGetCasinoById,
	useUpdateCasinoById,
} from '@/services/API/casino/hook'
import {
	useCategoriesByResourceId,
	useGetAllCategories,
	useSetCategoriesByResourceId,
} from '@/services/API/categories/hook'
import s from './WrapperAddNewCasino.module.scss'
import SeoResource from './SeoResource/SeoResource'
import { HeaderActions } from '../../_common/_comp'
import { TVariantOpenPage } from '../../Constructor.type'
import { useManipulationData } from '../../_common/_hooks'
import { TTabItem } from '../../../../components/Tabs/type'
import CategorySetting from '../../_common/CategorySetting'
import CommonResource from './CommonResource/CommonResource'
import { useFetchConfigPayments } from '../_hooks/use-payments'
import WrapperAddNewResource from '../../_common/_comp/WrapperAddNewResource'
import { TEditingData } from '../../_common/_hooks/use-manipulation-data/type'
import ReceivingData from '../../_common/AddNewResource/ReceivingData/ReceivingData'
import SettingWidget from '../../_common/AddNewResource/SettingWidget/SettingWidget'
import useLocationLang from '../../_common/_hooks/use-location-lang/use-location-lang'
import EmbeddedContent from '../../_common/AddNewResource/EmbeddedContent/EmbeddedContent'
import { VariantNewResourceContext } from '../../_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'

const INIT_TABS: TTabItem<TCasinoKeysTabs>[] = [
	{
		key: 'seo',
		label: 'SEO',
		isActive: true,
	},
	// {
	// 	key: 'common',
	// 	label: 'Общее',
	// 	isActive: false,
	// },
	{
		key: 'review',
		label: 'Обзор',
		isActive: false,
	},
	{
		key: 'category',
		label: 'Категории',
		isActive: false,
	},
	// {
	// 	key: 'bonus',
	// 	label: 'Бонусы',
	// 	isActive: false,
	// },
]
const WrapperAddNewCasino: FC<TVariantOpenPage> = ({
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
	const { activeTab, changeTabs, tabs } = useTabs<TCasinoKeysTabs>(INIT_TABS)
	const { casinoObj, bindTransformData, bindActionData } = useCasinoStore()
	const settings = useSettingStore()
	useLocationLang({ variantResource: 'casino' })

	const {
		categoriesObj,
		updateCategories,
		setCategories,
		getCategoryWithClear,
	} = useCategoriesStore()

	/////////

	const [editingData, setEditingData] = useState<
		TEditingData<TSingleCasinoRes>
	>({
		data: null,
	})

	const { mutateAsync: createItem, data } = useCreateCasino()
	const { mutateAsync: deleteItem } = useDeleteCasinoById()
	const { mutateAsync: getItem } = useGetCasinoById()
	const { mutateAsync: updateItem } = useUpdateCasinoById()
	const { data: categories } = useGetAllCategories()
	// const { data: addedCategories } = useCategoriesByResourceId()
	const { mutateAsync: getCategories } = useCategoriesByResourceId()
	const { mutateAsync: setCategoriesByResourceId } =
		useSetCategoriesByResourceId()

	const { allPayments, handleUpdatePayments } = useFetchConfigPayments()

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
							...casinoObj,
							id: Number(new Date()),
							seoStore: {
								...casinoObj.seoStore,
								link: '',
							},
						}
					: {}
				return bindActionData.loadCasinoData(data)
			},
			removeLocalData: bindActionData.removeCasinoData,
			updateLocalData: bindActionData.updateCasinoData,
		},
		editingData,
		variantResource: 'casino',
		copyArray: {
			...casinoObj,
			id: Number(new Date()),
			seoStore: {
				...casinoObj.seoStore,
				link: '',
			},
		},
		bindTransformData,
		editFor: interceptionProps.editFor,
	})

	const fetchChain = async (item: TCasinoItemRes) => {
		await setCategoriesByResourceId({
			_query: {
				id: item.id,
			},
			_body: getCategoryWithClear({
				resource: 'casino',
			}).bindingCategories.map((e) => e.id),
		})
		await getCategories({
			id: item.id,
		}).then((e) => {
			setCategories({
				resource: 'casino',
				category: e,
			})
		})
		setInterceptionProps((prev) => {
			return {
				...prev,
				id: !item?.id ? -1 : item?.id,
				bind_id: item.bind_id || null,
				editFor: 'UPDATE',
			}
		})
		await handleUpdatePayments({
			casino_id: item.id,
		}).then((e) => {
			setEditingData({
				data: {
					...item,
					payments: e,
				},
			})
		})
	}

	const fetchSentData = async () => {
		const sentSetting = handleSentData(settings.getCurrentLang('casino'))
		if (sentSetting !== null) {
			if (interceptionProps.editFor === 'ADD') {
				await createItem(sentSetting.sentData as TCasinoCreateReq).then((e) => {
					fetchChain(e)
				})
			}
			if (interceptionProps.editFor === 'UPDATE') {
				await updateItem({
					id: interceptionProps.id,
					body: sentSetting.sentData as TCasinoUpdateReq,
				}).then((e) => fetchChain(e))
			}
		}
	}

	const fetchDeleteData = async () => {
		const _id = id || casinoObj?.id || -1
		await deleteItem({
			lang: settings.getCurrentLang('casino'),
			id: _id,
		}).then(() => {
			console.log('success remove news')
			handleLocalRemove()
		})
	}

	/////////

	useEffect(() => {
		if (interceptionProps.id > -1 || interceptionProps.bind_id) {
			getItem({
				id: -1,
				lang: settings.getCurrentLang('casino'),
				bind_id: interceptionProps.bind_id,
			}).then(async (e) => {
				setInterceptionProps((prev) => {
					return {
						...prev,
						id: !e.dataRes?.id ? -1 : e.dataRes?.id,
						editFor: !e.dataRes?.id ? 'ADD' : 'UPDATE',
					}
				})
				if (e.dataRes?.id) {
					getCategoryWithClear({
						resource: 'casino',
					})

					await getCategories({
						id: e.dataRes.id,
					}).then((e) => {
						setCategories({
							resource: 'casino',
							category: e,
						})
					})
				}

				setEditingData({
					data: e.dataRes,
				})
			})
		}
	}, [interceptionProps.bind_id, settings.getCurrentLang('casino')])

	useEffect(() => {
		if (categories) {
			updateCategories({
				resource: 'casino',
				value: categories,
			})
		}
	}, [categories])

	if (editFor === 'UPDATE' && !editingData.data)
		return (
			<Loader
				params={{
					visible: !editingData.data,
				}}
			/>
		)

	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'casino' }}>
			<WrapperAddNewResource
				title={getLocalization(labelPage)}
				goBack={true}
				pathBack={`/${routes.ADMIN_PAGE}/${routes.CASINO}/`}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={bindActionData.updateCasinoData}
						handleCopyStore={handleCopyStore}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<Tabs
							data={tabs}
							callback={changeTabs}
							saveData={bindActionData.updateCasinoData}
						/>
						{activeTab.key === 'seo' && <SeoResource />}
						{activeTab.key === 'common' && (
							<CommonResource {...{ allPayments }} />
						)}
						{activeTab.key === 'review' && <ReceivingData />}
						{activeTab.key === 'category' && (
							<CategorySetting
								{...{ selectedSlots: null, selectedProviders: null }}
								handleChangeProviders={() => {}}
								handleChangeSlots={() => {}}
							/>
						)}
						{activeTab.key === 'bonus' && <div>{activeTab.key}</div>}
					</div>
					<div className={s.widgets_block}>
						{activeTab.key === 'review' && <EmbeddedContent />}
						<SettingWidget
							handleRemove={fetchDeleteData}
							handleSent={fetchSentData}
							handleLocalLoadData={handleLocalLoadData}
							editFor={interceptionProps.editFor}
							linkResource={`/${settings.getCurrentLang('casino')}/online-casino/${casinoObj.seoStore.link}`}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}
export default WrapperAddNewCasino
