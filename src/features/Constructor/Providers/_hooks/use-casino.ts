import { INIT_FILTER } from '@/libs/context/FilterContext/FilterContext'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import { TCasinoBody } from '@/services/API/casino/casino.type'
import { useGetTopCasino } from '@/services/API/casino/hook'
import { useGetCasinosForProviderById, useUpdateCasinosForProviderById } from '@/services/API/providers/hook'
import { TParamsAddCasinosToProviderReq, TProvidersBodyEdit } from '@/services/API/providers/providers.type'
import { useEffect, useState } from 'react'

export const useFetchConfigCasinos = () => {
	const { lang } = useLang()
	const { mutateAsync: updateCasinos } = useUpdateCasinosForProviderById()

	const [allCasinos, setAllCasinos] = useState<TCasinoBody[]>([])
	const [selectedCasinos, setSelectedCasinos] = useState<TCasinoBody[]>([])
	const { data: allCasinosData } = useGetTopCasino({
		size: 1,
		page: 1,
		filters: INIT_FILTER,
		lang,
		all: true
	})
	const { mutateAsync: getSelectedCasinos } = useGetCasinosForProviderById()

	const handleSetSelectedCasinos = (value: TCasinoBody[]) => {
		setSelectedCasinos(value)
	}

	const handleChangeSelectedCasinos = ({ value }: { value: TCasinoBody }) => {
		const findIndex = selectedCasinos.findIndex((e) => e.id === value.id);
		if (findIndex > -1) {
			setSelectedCasinos((prev) => [
				...prev.slice(0, findIndex),
				...prev.slice(findIndex + 1),
			]);		
		} else {
			setSelectedCasinos((prev) => [
				...prev,
				{
					...value
				},
			]);		
		}
	}

	///
	const handleUpdateCasinos = async ({
		provider_id,
	}: Pick<TParamsAddCasinosToProviderReq, 'provider_id'>) => {
		const data = await updateCasinos({
			provider_id,
			ids: selectedCasinos.map((casino) => casino.id),
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
		selectedCasinos, 
		bindActionsCasino: {
			handleSetSelectedCasinos,
			handleChangeSelectedCasinos,
			getSelectedCasinos, 
			handleUpdateCasinos 
		}
	}
}
