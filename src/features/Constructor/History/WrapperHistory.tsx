import { FC, useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { routes } from '@/constants/routes'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useGetAllHistory } from '@/services/API/history/hook'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './WrapperHistory.module.scss'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import ListAddedHistory from './ListAddedHistory/ListAddedHistory'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'
const INIT_PAGIN = {
	totalPages: 0,
	size: 25,
	page: 1,
}
const WrapperHistory: FC = () => {
	const { getLocalization } = useLanguage()
	const settings = useSettingStore()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()

	const {
		data: historyData,
		isLoading,
		refetch,
	} = useGetAllHistory({
		lang: settings.getCurrentLang('history'),
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
	}, [settings.getCurrentLang('history')])

	useEffect(() => {
		if (historyData?.pages) {
			setPagin((prev) => ({
				...prev,
				total: historyData.pages,
			}))
		}
	}, [historyData?.pages])

	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Истории')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить историю')}
					link={routes.ADD_HISTORY}
				/>
			</div>
			<PanelLightSetting
				linkAdd={routes.ADD_HISTORY}
				labelAdd={'Добавить Историю'}
				bindLang={{
					lang: settings.getCurrentLang('history'),
					callbackLang: (lang) =>
						settings.updateSetting({
							_key: 'currentLang',
							resource: 'history',
							value: lang,
						}),
				}}
			/>

			{isLoading && <Loader params={{ visible: isLoading }} />}
			{historyData?.items && (
				<>
					<ListAddedHistory
						variantContent="history"
						data={historyData?.items}
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

export default WrapperHistory
