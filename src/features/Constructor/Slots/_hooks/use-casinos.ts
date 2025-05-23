import { useEffect, useState } from 'react'
import { useGetTopCasino } from '@/services/API/casino/hook'
import { TCasinoBody } from '@/services/API/casino/casino.type'
import { useCommonStore } from '@/store/newResourceStore/slots'
import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { TParamsAddCasinosToSlotReq } from '@/services/API/slots/slots.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import {
	useGetCasinosForSlotById,
	useUpdateCasinosForSlotById,
} from '@/services/API/slots/hook'

export const useFetchConfigCasinos = () => {
	const settings = useSettingStore()
	const { commonData } = useCommonStore()

	const [allCasinos, setAllCasinos] = useState<TCasinoBody[]>([])
	const { data: allCasinosData } = useGetTopCasino({
		filters: INIT_FILTER,
		page: 1,
		size: 1,
		all: true,
		lang: settings.getCurrentLang('slots'),
	})
	const { mutateAsync: getSelectedCasinos } = useGetCasinosForSlotById()
	const { mutateAsync: updateCasinos } = useUpdateCasinosForSlotById()

	///
	const handleUpdateCasinos = async ({
		slot_id,
	}: Pick<TParamsAddCasinosToSlotReq, 'slot_id'>) => {
		const data = await updateCasinos({
			slot_id,
			ids: [...commonData.casinos.map((casino) => casino.id)],
		})
		return data
	}
	///

	useEffect(() => {
		if (allCasinosData && allCasinosData?.items?.length > 0) {
			setAllCasinos(allCasinosData?.items)
		}
	}, [allCasinosData])

	return {
		allCasinos,
		bindActionsCasinos: {
			handleUpdateCasinos,
			getSelectedCasinos,
		},
	}
}
