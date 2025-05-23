import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { TParamsAddSlotsToCasinoReq } from '@/services/API/casino/casino.type'
import { useGetSlotsForCasinoById, useUpdateSlotsForCasinoById } from '@/services/API/casino/hook'
import { useGetAllSlots } from '@/services/API/slots/hook'
import { TSlotBody } from '@/services/API/slots/slots.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { useCommonStore } from '@/store/newResourceStore/casino'
import { useEffect, useState } from 'react'

export const useFetchConfigSlots = () => {
	const { mutateAsync: updateSlots } = useUpdateSlotsForCasinoById()
	const settings = useSettingStore()

	const [allSlots, setAllSlots] = useState<TSlotBody[]>([])
	const [selectedSlots, setSelectedSlots] = useState<TSlotBody[]>([])
	const { data: allSlotsData } = useGetAllSlots({ 
		filters: INIT_FILTER, 
		lang: settings.getCurrentLang('casino'), 
		page: 1, 
		size: 1,
		all: true
	})
	const { mutateAsync: getSelectedSlots } = useGetSlotsForCasinoById()

	const handleSetSelectedSlots = (value: TSlotBody[]) => {
		setSelectedSlots(value)
	}
	
	const handleChangeSelectedSlots = ({ value }: { value: TSlotBody }) => {
		const findIndex = selectedSlots.findIndex((e) => e.id === value.id);
		if (findIndex > -1) {
			setSelectedSlots((prev) => [
				...prev.slice(0, findIndex),
				...prev.slice(findIndex + 1),
			]);		
		} else {
			setSelectedSlots((prev) => [
				...prev,
				{
					...value
				},
			]);		
		}
	}

	///
	const handleUpdateSlots = async ({
		casino_id,
	}: Pick<TParamsAddSlotsToCasinoReq, 'casino_id'>) => {
		const data = await updateSlots({
			casino_id,
			ids: selectedSlots.map((slot) => slot.id),
		})
		return data
	}
	///

	useEffect(() => {
		if (allSlotsData && allSlotsData?.items?.length > 0) {
			setAllSlots(allSlotsData?.items)
		}
	}, [allSlotsData])

	return { 
		allSlots, 
		selectedSlots,
		bindActionsSlots: {
			handleSetSelectedSlots,
			handleChangeSelectedSlots,
			handleUpdateSlots, 
			getSelectedSlots,
		}
	}
}
