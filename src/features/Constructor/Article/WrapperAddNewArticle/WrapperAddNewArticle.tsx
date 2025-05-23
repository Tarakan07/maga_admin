import { FC, useEffect, useState } from 'react'
import Tabs from '@/components/Tabs/Tabs'
import { Loader } from '@/libs/UI/Jammer'
import useTabs from '@/libs/hooks/use-tabs'
import { routes } from '@/constants/routes'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useArticleStore, { useSeoStore } from '@/store/newResourceStore/article'
import { TTypeTagArticle } from '@/store/newResourceStore/article/seo/seo.type'
import { TArticleKeysTabs } from '@/store/newResourceStore/article/articleStore.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	TArticleCreateReq,
	TArticleUpdateReq,
	TSingleArticleRes,
} from '@/services/API/articles/articles.type'
import {
	useCreateArticle,
	useDeleteArticleById,
	useGetArticleById,
	useGetTagsForArticleById,
	useUpdateArticleById,
	useUpdateTagsForArticleById,
} from '@/services/API/articles/hook'
import s from './WrapperAddNewArticle.module.scss'
import { HeaderActions } from '../../_common/_comp'
import SeoResource from './SeoResource/SeoResource'
import { TVariantOpenPage } from '../../Constructor.type'
import { useManipulationData } from '../../_common/_hooks'
import { TTabItem } from '../../../../components/Tabs/type'
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
] as TTabItem<TArticleKeysTabs>[]
const WrapperAddNewArticle: FC<TVariantOpenPage> = ({
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
	const { activeTab, changeTabs, tabs } = useTabs<TArticleKeysTabs>(INIT_TABS)
	const { articleObj, bindTransformData, bindActionData } = useArticleStore()
	const { bindStore } = useConstructorStore()
	const settings = useSettingStore()
	useLocationLang({ variantResource: 'articles' })

	/////////

	const [editingData, setEditingData] = useState<
		TEditingData<TSingleArticleRes>
	>({
		data: null,
	})

	const { mutateAsync: createItem } = useCreateArticle()
	const { mutateAsync: deleteItem } = useDeleteArticleById()
	const { mutateAsync: getItem } = useGetArticleById()
	const { mutateAsync: updateItem } = useUpdateArticleById()
	const { mutateAsync: updateTags } = useUpdateTagsForArticleById()

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
							...articleObj,
							id: Number(new Date()),
							seoStore: {
								...articleObj.seoStore,
								link: '',
							},
						}
					: {}
				return bindActionData.loadArticleData(data)
			},
			removeLocalData: bindActionData.removeArticleData,
			updateLocalData: bindActionData.updateArticleData,
		},
		editingData,
		variantResource: 'articles',
		copyArray: {
			...articleObj,
			id: Number(new Date()),
			seoStore: {
				...articleObj.seoStore,
				link: '',
			},
		},
		bindTransformData,
		editFor: interceptionProps.editFor,
	})

	//////

	const fetchSentData = async () => {
		const sentSetting = handleSentData(settings.getCurrentLang('articles'))

		if (sentSetting !== null) {
			if (interceptionProps.editFor === 'ADD') {
				await createItem(sentSetting.sentData as TArticleCreateReq)
					.then((e) => {
						sentSetting.clear()
						return e
					})
					.then((e) => {
						updateTags({
							article_id: e.id,
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
					body: sentSetting.sentData as TArticleUpdateReq,
				})
					.then((e) => {
						sentSetting.clear()
						return e
					})
					.then((e) => {
						updateTags({
							article_id: id,
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

	const fetchDeleteArticles = async () => {
		const _id = id || articleObj?.id || -1
		await deleteItem({
			lang: settings.getCurrentLang('articles'),
			id: _id,
		}).then(() => {
			console.log('success remove article')
			handleLocalRemove()
		})
	}

	/////////

	useEffect(() => {
		if (interceptionProps.id > -1 || interceptionProps.bind_id) {
			getItem({
				id: -1,
				lang: settings.getCurrentLang('articles'),
				bind_id: interceptionProps.bind_id,
			}).then((e) => {
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
	}, [interceptionProps.bind_id, settings.getCurrentLang('articles')])

	///
	const [allTags, setAllTags] = useState<TTypeTagArticle[]>([])
	const { data: tagsData } = useGetTagsForArticleById({
		lang: settings.getCurrentLang('articles'),
		size: 50,
		page: 1,
	})
	const { seoData, setTags } = useSeoStore()
	useEffect(() => {
		if (tagsData && tagsData?.items.length > 0) {
			setAllTags(tagsData?.items)
		}
	}, [tagsData])

	///

	if (editFor === 'UPDATE' && !editingData.data)
		return (
			<Loader
				params={{
					visible: !editingData.data,
				}}
			/>
		)
	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'articles' }}>
			<WrapperAddNewResource
				title={getLocalization(labelPage)}
				goBack={true}
				pathBack={`/${routes.ADMIN_PAGE}/${routes.ARTICLE}/`}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={bindActionData.updateArticleData}
						handleCopyStore={handleCopyStore}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<Tabs
							data={tabs}
							callback={changeTabs}
							saveData={bindActionData.updateArticleData}
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
							handleRemove={fetchDeleteArticles}
							handleSent={fetchSentData}
							handleLocalLoadData={handleLocalLoadData}
							editFor={interceptionProps.editFor}
							linkResource={`/${settings.getCurrentLang('articles')}/casino-articles/${articleObj.seoStore.link}`}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}
export default WrapperAddNewArticle
