import { FC, useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { routes } from '@/constants/routes'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useGetAllArticles } from '@/services/API/articles/hook'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './WrapperArticle.module.scss'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import ListAddedArticles from './ListAddedArticles/ListAddedArticles'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'
const INIT_PAGIN = {
	totalPages: 0,
	size: 15,
	page: 1,
}
const WrapperArticle: FC = () => {
	const { getLocalization } = useLanguage()

	const settings = useSettingStore()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()

	const {
		data: articlesData,
		isLoading,
		refetch,
	} = useGetAllArticles({
		lang: settings.getCurrentLang('articles'),
		size: pagin.size,
		page: pagin.page,
		filters,
	})
	///

	const step = (step: number) => {
		setPagin((prev) => ({
			...prev,
			page: step,
		}))
	}

	////
	useEffect(() => {
		refetch()
	}, [pagin.page, filters])

	useEffect(() => {
		setPagin(INIT_PAGIN)
	}, [settings.getCurrentLang('articles')])

	useEffect(() => {
		if (articlesData?.pages) {
			setPagin((prev) => ({
				...prev,
				totalPages: articlesData.pages,
			}))
		}
	}, [articlesData?.pages])
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Cтатьи')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить статью')}
					link={routes.ADD_ARTICLE}
				/>
			</div>
			<PanelLightSetting
				linkAdd={routes.ADD_ARTICLE}
				labelAdd={'Добавить статью'}
				bindLang={{
					lang: settings.getCurrentLang('articles'),
					callbackLang: (lang) => {
						settings.updateSetting({
							_key: 'currentLang',
							resource: 'articles',
							value: lang,
						})
					},
				}}
			/>
			{isLoading && <Loader params={{ visible: isLoading }} />}
			{articlesData?.items && (
				<>
					<ListAddedArticles
						variantContent="articles"
						data={articlesData.items}
					/>
					{pagin.totalPages > 1 && (
						<Pagination
							step={step}
							totalPages={pagin.totalPages}
							currentPage={pagin.page}
						/>
					)}
				</>
			)}
		</div>
	)
}

export default WrapperArticle
