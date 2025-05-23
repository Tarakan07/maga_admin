import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastGetItemLang } from '@/libs/utils/toastGetAllLang'
import {
	TCasinoCreateReq,
	TCasinoDeleteRes,
	TParamsAddPaymentsToCasinoReq,
	TParamsAddProvidersToCasinoReq,
	TParamsAddSlotsToCasinoReq,
	TParamsCasinoListReq,
	TParamsCasinoPaymentsListReq,
	TParamsCasinoUpdateReq,
	TParamsSingleCasinoReq,
} from './casino.type'
import {
	createCasinoById,
	deleteCasinoById,
	getAllPaymentsForCasino,
	getCasinoById,
	getPaymentsForCasinoById,
	getProvidersForCasinoById,
	getSlotsForCasinoById,
	getTopCasino,
	updateCasinoById,
	updatePaymentsForCasinoById,
	updateProvidersForCasinoById,
	updateSlotsForCasinoById,
} from './casino'

export const useGetTopCasino = (params: TParamsCasinoListReq) => {
	return useQuery(['topCasino', params.lang], () => getTopCasino(params), {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('get all casino', error)
		},
	})
}

export const useGetCasinoById = () => {
	return useMutation(
		async (params: TParamsSingleCasinoReq) => {
			const [data] = await Promise.allSettled([getCasinoById(params)])
			toastGetItemLang({
				lang: params.lang,
				status: data.status,
			})

			return {
				dataRes: data.status === 'fulfilled' ? data.value : null,
				error: data.status === 'rejected' ? data.reason : null,
			}
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all langs news', error)
			},
		}
	)
}

export const useCreateCasino = () => {
	return useMutation(
		async ({ casino }: TCasinoCreateReq) => {
			return await createCasinoById({ casino })
		},
		{
			onSuccess: (data) => {
				toast.success('Казино добавлено')
			},
			onError: (error) => {
				toast.error('Ошибка добавления')
				console.log('create casino', error)
			},
		}
	)
}

export const useUpdateCasinoById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TParamsCasinoUpdateReq) => {
			return await updateCasinoById(params)
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['topCasino'])
				toast.success('Казино обновлено')
			},
			onError: (error) => {
				toast.error('Ошибка обновления')
				console.log('update casino', error)
			},
		}
	)
}

export const useDeleteCasinoById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ lang, id }: TCasinoDeleteRes) => {
			return await deleteCasinoById({ lang, id })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['topCasino'])
				toast.success('Казино удалено')
			},
			onError: (error) => {
				toast.error('Ошибка удаления')
				console.log('delete casino', error)
			},
		}
	)
}

///

export const useGetAllPaymentsForCasino = (
	params: TParamsCasinoPaymentsListReq
) => {
	return useQuery(
		['getAllPaymentsForCasino', params.lang],
		() => getAllPaymentsForCasino(params),
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all casino payments', error)
			},
			refetchOnWindowFocus: false,
		}
	)
}

export const useGetPaymentsForCasinoById = () => {
	return useMutation(
		async (params: Pick<TParamsAddPaymentsToCasinoReq, 'casino_id'>) => {
			const data = await getPaymentsForCasinoById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all langs news', error)
			},
		}
	)
}

export const useUpdatePaymentsForCasinoById = () => {
	return useMutation(
		async (params: TParamsAddPaymentsToCasinoReq) => {
			return await updatePaymentsForCasinoById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления платежей')
				console.log('add payments', error)
			},
		}
	)
}

//
export const useGetProvidersForCasinoById = () => {
	return useMutation(
		async (params: Pick<TParamsAddProvidersToCasinoReq, 'casino_id'>) => {
			const data = await getProvidersForCasinoById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get providers for casino by id err', error)
			},
		}
	)
}

export const useUpdateProvidersForCasinoById = () => {
	return useMutation(
		async (params: TParamsAddProvidersToCasinoReq) => {
			return await updateProvidersForCasinoById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления провайдеров')
				console.log('add providers', error)
			},
		}
	)
}

//
export const useGetSlotsForCasinoById = () => {
	return useMutation(
		async (params: Pick<TParamsAddSlotsToCasinoReq, 'casino_id'>) => {
			const data = await getSlotsForCasinoById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get slots for casino by id err', error)
			},
		}
	)
}

export const useUpdateSlotsForCasinoById = () => {
	return useMutation(
		async (params: TParamsAddSlotsToCasinoReq) => {
			return await updateSlotsForCasinoById(params)
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
