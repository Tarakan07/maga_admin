import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastGetItemLang } from '@/libs/utils/toastGetAllLang'
import { TParamsHistoryListReq, TParamsSingleNewsReq } from '../news/news.type'
import {
	THistoryCreateReq,
	THistoryDeleteRes,
	TParamsHistoryUpdateReq,
} from './history.type'
import {
	createHistoryById,
	deleteHistoryById,
	getAllHistory,
	getHistoryById,
	updateHistoryById,
} from './history'

export const useGetAllHistory = (params: TParamsHistoryListReq) => {
	return useQuery(['allHistory', params.lang], () => getAllHistory(params), {
		onSuccess: (data) => {
			console.log('History fetched successfully:', data)
		},
		onError: (error) => {
			console.error('Error fetching history:', error)
		},
	})
}

export const useGetHistoryById = () => {
	return useMutation(
		async ({ lang, id }: TParamsSingleNewsReq) => {
			const [data] = await Promise.allSettled([getHistoryById({ lang, id })])
			toastGetItemLang({
				lang,
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

export const useCreateHistory = () => {
	return useMutation(
		async ({ story }: THistoryCreateReq) => {
			return await createHistoryById({ story })
		},
		{
			onSuccess: (data) => {
				toast.success('История добавлена')
			},
			onError: (error) => {
				toast.error('Ошибка добавления')
				console.log('create history', error)
			},
		}
	)
}

export const useUpdateHistoryById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ id, body }: TParamsHistoryUpdateReq) => {
			return await updateHistoryById({ id, body })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries('allHistory')
				toast.success('История обновлена')
			},
			onError: (error) => {
				toast.error('Ошибка обновления')
				console.log('update history', error)
			},
		}
	)
}

export const useDeleteHistoryById = () => {
	return useMutation(
		async ({ lang, id }: THistoryDeleteRes) => {
			return await deleteHistoryById({ lang, id })
		},
		{
			onSuccess: (data) => {
				toast.success('История удалена')
			},
			onError: (error) => {
				toast.error('Ошибка удаления')
				console.log('delete history', error)
			},
		}
	)
}
