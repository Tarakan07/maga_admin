import { routes } from '@/constants/routes'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { Loader } from '@/libs/UI/Jammer'
import { useGetTopCasino } from '@/services/API/casino/hook'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import React, { useEffect, useState } from 'react'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'
import s from './WrapperSlots.module.scss'
import ListAddedSlot from './ListAddedSlot/ListAddedSlot'
import { useGetAllSlots } from '@/services/API/slots/hook'

const INIT_PAGIN = {
	totalPages: 0,
	size: 15,
	page: 1,
}

const WrapperSlots = () => {
  const { getLocalization } = useLanguage()
	const settings = useSettingStore()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()

	const {
		data: slotsData,
		isLoading,
		refetch,
	} = useGetAllSlots({
		lang: settings.getCurrentLang('slots'),
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
	}, [settings.getCurrentLang('slots')])

	useEffect(() => {
		if (slotsData?.pages) {
			setPagin((prev) => ({
				...prev,
				totalPages: slotsData.pages,
			}))
		}
	}, [slotsData?.pages])
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Слоты')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить слот')}
					link={routes.ADD_SLOTS}
				/>
			</div>
			<PanelLightSetting
				linkAdd={routes.ADD_SLOTS}
				labelAdd="Добавить слот"
				bindLang={{
					lang: settings.getCurrentLang('slots'),
					callbackLang: (lang) =>
						settings.updateSetting({
							_key: 'currentLang',
							resource: 'slots',
							value: lang,
						}),
				}}
				variantContent="slots"
			/>
			{isLoading && <Loader params={{ visible: isLoading }} />}
			{slotsData?.items && (
				<>
					<ListAddedSlot variantContent="slots" data={slotsData.items} />
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

export default WrapperSlots