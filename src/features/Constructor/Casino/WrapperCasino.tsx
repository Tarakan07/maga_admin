import { useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { routes } from '@/constants/routes'
import { useGetTopCasino } from '@/services/API/casino/hook'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './WrapperCasino.module.scss'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import ListAddedCasino from './ListAddedCasino/ListAddedCasino'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'

const INIT_PAGIN = {
	totalPages: 0,
	size: 15,
	page: 1,
}
const WrapperCasino = () => {
	const { getLocalization } = useLanguage()
	const settings = useSettingStore()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()

	const {
		data: casinoData,
		isLoading,
		refetch,
	} = useGetTopCasino({
		lang: settings.getCurrentLang('casino'),
		size: pagin.size,
		page: pagin.page,
		filters,
	})

	//
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
	}, [settings.getCurrentLang('casino')])

	useEffect(() => {
		if (casinoData?.pages) {
			setPagin((prev) => ({
				...prev,
				totalPages: casinoData.pages,
			}))
		}
	}, [casinoData?.pages])
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Казино')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить казино')}
					link={routes.ADD_CASINO}
				/>
			</div>
			<PanelLightSetting
				linkAdd={routes.ADD_CASINO}
				labelAdd="Добавить казино"
				bindLang={{
					lang: settings.getCurrentLang('casino'),
					callbackLang: (lang) =>
						settings.updateSetting({
							_key: 'currentLang',
							resource: 'casino',
							value: lang,
						}),
				}}
				variantContent="casino"
			/>
			{isLoading && <Loader params={{ visible: isLoading }} />}
			{casinoData?.items && (
				<>
					<ListAddedCasino variantContent="casino" data={casinoData.items} />
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
export default WrapperCasino
