import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { TParamsAddProvidersToCasinoReq } from '@/services/API/casino/casino.type'
import { useGetProvidersForCasinoById, useUpdateProvidersForCasinoById } from '@/services/API/casino/hook'
import { useGetAllProviders } from '@/services/API/providers/hook'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { useEffect, useState } from 'react'

export const useFetchConfigProviders = () => {
	const { mutateAsync: updateProviders } = useUpdateProvidersForCasinoById()

	const [allProviders, setAllProviders] = useState<TProvidersBody[]>([])
	const [selectedProviders, setSelectedProviders] = useState<TProvidersBody[]>([])
	const { data: allProvidersData } = useGetAllProviders({
		filters: INIT_FILTER, 
		page: 1, 
		size: 1,
		all: true
	})
	const { mutateAsync: getSelectedProviders } = useGetProvidersForCasinoById()

	const handleSetSelectedProviders = (value: TProvidersBody[]) => {
		setSelectedProviders(value)
	}
	
	const handleChangeSelectedProviders = ({ value }: { value: TProvidersBody }) => {
		const findIndex = selectedProviders.findIndex((e) => e.id === value.id);
		if (findIndex > -1) {
			setSelectedProviders((prev) => [
				...prev.slice(0, findIndex),
				...prev.slice(findIndex + 1),
			]);		
		} else {
			setSelectedProviders((prev) => [
				...prev,
				{
					...value
				},
			]);		
		}
	}

	///
	const handleUpdateProviders = async ({
		casino_id,
	}: Pick<TParamsAddProvidersToCasinoReq, 'casino_id'>) => {
		const data = await updateProviders({
			casino_id,
			ids: selectedProviders.map((provider) => provider.id),
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
		selectedProviders,
		bindActionsProviders: {
			handleSetSelectedProviders,
			handleChangeSelectedProviders,
			handleUpdateProviders, 
			getSelectedProviders,
		}
	}
}
