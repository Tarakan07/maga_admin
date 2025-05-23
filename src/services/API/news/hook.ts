import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastGetItemLang } from '@/libs/utils/toastGetAllLang'
import {
	createNewsById,
	deleteNewsById,
	getAllNews,
	getNewsById,
	getTagsForNewsById,
	updateNewsById,
	updateTagsForNewsById,
} from './news'
import {
	TNewsCreateReq,
	TNewsDeleteRes,
	TParamsAddTagsToNewsReq,
	TParamsNewsListReq,
	TParamsNewsTagsListReq,
	TParamsNewsUpdateReq,
	TParamsSingleNewsReq,
} from './news.type'

export const useGetAllNews = (params: TParamsNewsListReq) => {
	return useQuery(['news', params.lang], () => getAllNews(params), {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('get all news', error)
		},
	})
}
export const useGetNewsById = () => {
	return useMutation(
		async ({ lang, id, bind_id }: TParamsSingleNewsReq) => {
			const [data] = await Promise.allSettled([
				getNewsById({ lang, id, bind_id }),
			])
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
export const useGetTagsForNewsById = (params: TParamsNewsTagsListReq) => {
	return useQuery(
		['getTagsForNews', params.lang],
		() => getTagsForNewsById(params),
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all news tags', error)
			},
		}
	)
}

export const useUpdateTagsForNewsById = () => {
	return useMutation(
		async (params: TParamsAddTagsToNewsReq) => {
			return await updateTagsForNewsById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления тегов')
				console.log('update tags', error)
			},
		}
	)
}
export const useCreateNews = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ news }: TNewsCreateReq) => {
			return await createNewsById({ news })
		},
		{
			onSuccess: (data) => {
				toast.success('Новость добавлена')
				queryClient.invalidateQueries('news')
			},
			onError: (error) => {
				toast.error('Ошибка добавления')
				console.log('create news', error)
			},
		}
	)
}
export const useUpdateNewsById = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ id, body }: TParamsNewsUpdateReq) => {
			return await updateNewsById({ id, body })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['news'])
				toast.success('Новость обновлена')
			},
			onError: (error) => {
				toast.error('Ошибка обновления')
				console.log('update news', error)
			},
		}
	)
}

export const useDeleteNewsById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ lang, id }: TNewsDeleteRes) => {
			return await deleteNewsById({ lang, id })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['news'])
				toast.success('Новость удалена')
			},
			onError: (error) => {
				toast.error('Ошибка удаления')
				console.log('delete news', error)
			},
		}
	)
}
