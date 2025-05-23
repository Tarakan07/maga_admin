import { FC, useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { routes } from '@/constants/routes'
import { useGetAllNews } from '@/services/API/news/hook'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './WrapperNews.module.scss'
import ListAddedNews from './ListAddedNews/ListAddedNews'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'

const INIT_PAGIN = {
	totalPages: 0,
	size: 15,
	page: 1,
}
const WrapperNews: FC = () => {
	const { getLocalization } = useLanguage()
	const {
		settingObj: {
			news: { currentLang },
		},
		updateSetting,
	} = useSettingStore()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()

	const {
		data: newsData,
		isLoading,
		refetch,
	} = useGetAllNews({
		lang: currentLang,
		size: pagin.size,
		page: pagin.page,
		filters,
	})

	////
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
	}, [currentLang])

	useEffect(() => {
		if (newsData?.pages) {
			setPagin((prev) => ({
				...prev,
				totalPages: newsData.pages,
			}))
		} else {
			setPagin((prev) => ({
				...prev,
				totalPages: 0,
			}))
		}
	}, [newsData?.pages])
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Новости')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить новость')}
					link={routes.ADD_NEWS}
				/>
			</div>
			<PanelLightSetting
				bindLang={{
					lang: currentLang,
					callbackLang: (lang) =>
						updateSetting({
							_key: 'currentLang',
							resource: 'news',
							value: lang,
						}),
				}}
			/>
			{isLoading && <Loader params={{ visible: isLoading }} />}
			{newsData?.items && (
				<>
					<ListAddedNews variantContent="news" data={newsData.items} />
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

export default WrapperNews
