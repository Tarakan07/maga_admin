import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import { useGetSlotsForProviderById, useUpdateSlotsForProviderById } from '@/services/API/providers/hook'
import { TParamsAddSlotsToProviderReq } from '@/services/API/providers/providers.type'
import { useGetAllSlots } from '@/services/API/slots/hook'
import { TSlotBody } from '@/services/API/slots/slots.type'
import { useEffect, useState } from 'react'

export const useFetchConfigSlots = () => {
	const { lang } = useLang()
	const { mutateAsync: updateSlots } = useUpdateSlotsForProviderById()

	const [allSlots, setAllSlots] = useState<TSlotBody[]>([])
	const [selectedSlots, setSelectedSlots] = useState<TSlotBody[]>([])
	const { data: allSlotsData } = useGetAllSlots({ 
		filters: INIT_FILTER, 
		lang, 
		page: 1, 
		size: 1,
		all: true
	})
	const { mutateAsync: getSelectedSlots } = useGetSlotsForProviderById()

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
		provider_id,
	}: Pick<TParamsAddSlotsToProviderReq, 'provider_id'>) => {
		const data = await updateSlots({
			provider_id,
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
			handleUpdateSlots, 
			getSelectedSlots,
			handleSetSelectedSlots,
			handleChangeSelectedSlots,
		} 
	}
}
