import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { useGetAllProviders } from '@/services/API/providers/hook'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { useGetProvidersForSlotById, useUpdateProvidersForSlotById } from '@/services/API/slots/hook'
import { TParamsAddProvidersToSlotReq } from '@/services/API/slots/slots.type'
import { useCommonStore } from '@/store/newResourceStore/slots'
import { useEffect, useState } from 'react'

export const useFetchConfigProviders = () => {
	const { commonData } = useCommonStore()
	
	const [allProviders, setAllProviders] = useState<TProvidersBody[]>([])
	const { data: allProvidersData } = useGetAllProviders({
		filters: INIT_FILTER, 
		page: 1, 
		size: 1,
		all: true
	})
	
	const { mutateAsync: getSelectedProviders } = useGetProvidersForSlotById()
	const { mutateAsync: updateProviders } = useUpdateProvidersForSlotById()

	///
	const handleUpdateProviders = async ({
		slot_id,
	}: Pick<TParamsAddProvidersToSlotReq, 'slot_id'>) => {
		const data = await updateProviders({
			slot_id,
			ids: [...commonData.providers.map((provider) => provider.id)],
		})
		return data
	}
	///

	useEffect(() => {
		if (allProvidersData && allProvidersData?.items?.length > 0) {
			setAllProviders(allProvidersData?.items)
		}
	}, [allProvidersData])

	return { 
		allProviders, 
		bindActionsProviders: {
			handleUpdateProviders,
			getSelectedProviders,
		}
	}
}
