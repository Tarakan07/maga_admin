import { useMutation, useQuery, useQueryClient } from "react-query"
import { createProvider, deleteProviderById, getAllProviders, getCasinosForProviderById, getProvidersById, getSlotsForProviderById, updateCasinosForProviderById, updateProviderById, updateSlotsForProviderById } from "./providers"
import { toast } from "react-toastify"
import { TParamsAddCasinosToProviderReq, TParamsAddSlotsToProviderReq, TParamsProvidersReq, TProvidersCreateReq, TProvidersDeleteReq, TProvidersGetReq, TProvidersPatchReq } from "./providers.type"

export const useGetAllProviders = (params: TParamsProvidersReq) => {
    return useQuery('allProviders', () => getAllProviders(params), {
        onSuccess: (data) => {
		},
        onError: (error) => {
            console.log('fetch providers error', error)
        },
    })
}

export const useCreateProvider = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (provider: TProvidersCreateReq) => {
			return await createProvider(provider)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allProviders')
				toast.success('Провайдер добавлен')
			},
			onError: (error) => {
				toast.error('Ошибка добавления провайдера')
				console.log('create providers error', error)
			},
		}
	)
}

export const useUpdateProviderById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TProvidersPatchReq) => {
			return await updateProviderById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allProviders')
				toast.success('Провайдер обновлен')
			},
			onError: (error) => {
				toast.error('Ошибка обновления провайдера')
				console.log('update providers error', error)
			},
		}
	)
}

export const useGetProviderById = () => {
	return useMutation(
		async (params: TProvidersGetReq) => {
			const data = await getProvidersById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get category by id error', error)
			},
		}
	)
}

export const useDeleteProviderById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TProvidersDeleteReq) => {
			return await deleteProviderById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allProviders')
				toast.success('Провайдер удален')
			},
			onError: (error) => {
				toast.error('Ошибка удаления провайдера')
				console.log('delete providers error', error)
			},
		}
	)
}

///
export const useGetSlotsForProviderById = () => {
	return useMutation(
		async (params: Pick<TParamsAddSlotsToProviderReq, 'provider_id'>) => {
			const data = await getSlotsForProviderById(params)
			return data
		},
		{
			onSuccess: (data) => {
			},
			onError: (error) => {
				console.log('get slots for provider error:', error)
			},
		}
	)
}

export const useUpdateSlotsForProviderById = () => {
	return useMutation(
		async (params: TParamsAddSlotsToProviderReq) => {
			return await updateSlotsForProviderById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления слотов')
				console.log('add slots', error)
			},
		}
	)
}

//
export const useGetCasinosForProviderById = () => {
	return useMutation(
		async (params: Pick<TParamsAddCasinosToProviderReq, 'provider_id'>) => {
			const data = await getCasinosForProviderById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get casino for provider error:', error)
			},
		}
	)
}

export const useUpdateCasinosForProviderById = () => {
	return useMutation(
		async (params: TParamsAddCasinosToProviderReq) => {
			return await updateCasinosForProviderById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления казино')
				console.log('add casino', error)
			},
		}
	)
}