import { routes } from '@/constants/routes'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { Loader } from '@/libs/UI/Jammer'
import { useGetAllProviders } from '@/services/API/providers/hook'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { useEffect, useState } from 'react'
import { HeaderSetting, Pagination } from '../_common/_comp'
import PanelLightSetting from '../_common/PanelLightSetting'
import AddNewItem from '../_common/PanelLightSetting/addNewItem/AddNewItem'
import ListAddedProviders from './ListAddedProviders/ListAddedProviders'
import s from './WrapperProviders.module.scss'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'

const INIT_PAGIN = {
	totalPages: 0,
	size: 15,
	page: 1,
}

const WrapperProviders = () => {
  const { getLocalization } = useLanguage()
	const [pagin, setPagin] = useState(INIT_PAGIN)
	const { filters } = useFilter()
	const { lang } = useLang()

  const { data: providersData, isLoading, refetch } = useGetAllProviders({
		filters, 
		page: pagin.page, 
		size: pagin.size,
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
	}, [lang])

	useEffect(() => {
		if (providersData?.pages) {
			setPagin((prev) => ({
				...prev,
				totalPages: providersData.pages,
			}))
		}
	}, [providersData?.pages])
	return (
		<div className={s.wrapper}>
			<div className={s.header}>
				<HeaderSetting title={getLocalization('Провайдеры')} refetch={refetch} />
				<AddNewItem
					labelBtn={getLocalization('Добавить провайдер')}
					link={routes.ADD_PROVIDER}
				/>
			</div>
			<PanelLightSetting
				linkAdd={routes.ADD_PROVIDER}
				labelAdd="Добавить провайдер"
				bindLang={{
					lang,
					callbackLang: () => {}
				}}
				variantContent="providers"
			/>
			{isLoading && <Loader params={{ visible: isLoading }} />}
			{providersData?.items && (
				<>
					<ListAddedProviders variantContent="providers" data={providersData.items} />
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

export default WrapperProviders