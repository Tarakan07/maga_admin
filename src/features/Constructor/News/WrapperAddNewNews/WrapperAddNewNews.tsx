import { FC, useEffect, useState } from 'react'
import Tabs from '@/components/Tabs/Tabs'
import { Loader } from '@/libs/UI/Jammer'
import useTabs from '@/libs/hooks/use-tabs'
import { routes } from '@/constants/routes'
import { TTabItem } from '@/components/Tabs/type'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useNewsStore, { useSeoStore } from '@/store/newResourceStore/news'
import { TTypeTagNews } from '@/store/newResourceStore/news/seo/seo.type'
import { TNewsKeysTabs } from '@/store/newResourceStore/news/newsStore.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import {
	TNewsCreateReq,
	TNewsUpdateReq,
	TSingleNewsRes,
} from '@/services/API/news/news.type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	useCreateNews,
	useDeleteNewsById,
	useGetNewsById,
	useGetTagsForNewsById,
	useUpdateNewsById,
	useUpdateTagsForNewsById,
} from '@/services/API/news/hook'
import s from './WrapperAddNewNews.module.scss'
import { HeaderActions } from '../../_common/_comp'
import SeoResource from './SeoResource/SeoResource'
import { TVariantOpenPage } from '../../Constructor.type'
import { useManipulationData } from '../../_common/_hooks'
import Tags from '../../_common/AddNewResource/ReceivingData/Tags/Tags'
import WrapperAddNewResource from '../../_common/_comp/WrapperAddNewResource'
import { TEditingData } from '../../_common/_hooks/use-manipulation-data/type'
import ReceivingData from '../../_common/AddNewResource/ReceivingData/ReceivingData'
import SettingWidget from '../../_common/AddNewResource/SettingWidget/SettingWidget'
import useLocationLang from '../../_common/_hooks/use-location-lang/use-location-lang'
import EmbeddedContent from '../../_common/AddNewResource/EmbeddedContent/EmbeddedContent'
import { VariantNewResourceContext } from '../../_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'

const INIT_TABS = [
	{
		key: 'seo',
		label: 'SEO',
		isActive: true,
	},
	{
		key: 'content',
		label: 'Контент',
		isActive: false,
	},
	{
		key: 'tags',
		label: 'Теги',
		isActive: false,
	},
] as TTabItem<TNewsKeysTabs>[]
const WrapperAddNewNews: FC<TVariantOpenPage> = ({
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
	const { activeTab, changeTabs, tabs } = useTabs<TNewsKeysTabs>(INIT_TABS)
	const { newsObj, bindActionData, bindTransformData } = useNewsStore()
	const { bindStore } = useConstructorStore()
	const settings = useSettingStore()
	useLocationLang({ variantResource: 'news' })

	/////////

	const [editingData, setEditingData] = useState<TEditingData<TSingleNewsRes>>({
		data: null,
	})

	const { mutateAsync: createItem } = useCreateNews()
	const { mutateAsync: deleteItem } = useDeleteNewsById()
	const { mutateAsync: getItem } = useGetNewsById()
	const { mutateAsync: updateItem } = useUpdateNewsById()
	const { mutateAsync: updateTags } = useUpdateTagsForNewsById()

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
							...newsObj,
							id: Number(new Date()),
							seoStore: {
								...newsObj.seoStore,
								link: '',
							},
						}
					: {}
				return bindActionData.loadNewsData(data)
			},
			removeLocalData: bindActionData.removeNewsData,
			updateLocalData: bindActionData.updateNewsData,
		},
		editingData,
		variantResource: 'news',
		copyArray: {
			...newsObj,
			id: Number(new Date()),
			seoStore: {
				...newsObj.seoStore,
				link: '',
			},
		},
		bindTransformData,
		editFor: interceptionProps.editFor,
	})

	const fetchSentData = async () => {
		const sentSetting = handleSentData(settings.getCurrentLang('news'))

		if (sentSetting !== null) {
			if (interceptionProps.editFor === 'ADD') {
				await createItem(sentSetting.sentData as TNewsCreateReq)
					.then((e) => {
						sentSetting.clear()
						return e
					})
					.then((e) => {
						updateTags({
							news_id: e.id,
							ids: [...seoData.tags.map((tag) => tag.id)],
						})
						setInterceptionProps((prev) => {
							return {
								...prev,
								id: !e?.id ? -1 : e?.id,
								bind_id: e.bind_id || null,
								editFor: 'UPDATE',
							}
						})
					})
			}
			if (interceptionProps.editFor === 'UPDATE') {
				await updateItem({
					id: interceptionProps.id,
					body: sentSetting.sentData as TNewsUpdateReq,
				})
					.then((e) => {
						sentSetting.clear()
						return e
					})
					.then((e) => {
						updateTags({
							news_id: e.id,
							ids: [...seoData.tags.map((tag) => tag.id)],
						})
						setInterceptionProps((prev) => {
							return {
								...prev,
								id: !e?.id ? -1 : e?.id,
								bind_id: e.bind_id || null,
								editFor: 'UPDATE',
							}
						})
					})
			}
		}
	}

	const fetchDeleteNews = async () => {
		if (editFor === 'UPDATE') {
			const _id = id || newsObj?.id || -1
			await deleteItem({
				lang: settings.getCurrentLang('news'),
				id: _id,
			}).then(() => {
				handleLocalRemove()
			})
		} else if (editFor === 'ADD') {
			handleLocalRemove()
		}
	}

	/////////

	useEffect(() => {
		if (interceptionProps.id > -1 || interceptionProps.bind_id) {
			getItem({
				id: -1,
				lang: settings.getCurrentLang('news'),
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
			})
		}
	}, [interceptionProps.bind_id, settings.getCurrentLang('news')])

	///
	const [allTags, setAllTags] = useState<TTypeTagNews[]>([])
	const { data: tagsData } = useGetTagsForNewsById({
		lang: settings.getCurrentLang('news'),
		size: 50,
		page: 1,
	})
	const { seoData, setTags } = useSeoStore()
	useEffect(() => {
		if (tagsData && tagsData?.items?.length > 0) {
			setAllTags(tagsData?.items)
		}
	}, [tagsData])

	if (editFor === 'UPDATE' && !editingData.data)
		return (
			<Loader
				params={{
					visible: !editingData.data,
				}}
			/>
		)

	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'news' }}>
			<WrapperAddNewResource
				title={getLocalization(labelPage)}
				goBack={true}
				pathBack={`/${routes.ADMIN_PAGE}/${routes.NEWS}/`}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={bindActionData.updateNewsData}
						handleCopyStore={handleCopyStore}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<Tabs
							data={tabs}
							callback={changeTabs}
							saveData={bindActionData.updateNewsData}
						/>
						{activeTab.key === 'seo' && <SeoResource />}
						{activeTab.key === 'content' && <ReceivingData />}
						{activeTab.key === 'tags' && (
							<Tags
								dataTags={seoData.tags}
								changeStoreData={setTags}
								{...{ allTags }}
							/>
						)}
					</div>
					<div className={s.widgets_block}>
						{activeTab.key === 'content' && <EmbeddedContent />}
						<SettingWidget
							handleRemove={fetchDeleteNews}
							handleSent={fetchSentData}
							handleLocalLoadData={handleLocalLoadData}
							editFor={interceptionProps.editFor}
							linkResource={`/${settings.getCurrentLang('news')}/casino-news/${newsObj.seoStore.link}`}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}
export default WrapperAddNewNews
