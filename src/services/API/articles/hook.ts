import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastGetItemLang } from '@/libs/utils/toastGetAllLang'
import {
	createArticleById,
	deleteArticleById,
	getAllArticles,
	getArticlesById,
	getTagsForArticleById,
	updateArticleById,
	updateTagsForArticleById,
} from './articles'
import {
	TArticleCreateReq,
	TArticleDeleteRes,
	TParamsAddTagsToArticlesReq,
	TParamsArticlesListReq,
	TParamsArticlesTagsListReq,
	TParamsArticleUpdateReq,
	TParamsSingleArticleAllLangReq,
	TParamsSingleArticleReq,
} from './articles.type'

export const useGetAllArticles = (params: TParamsArticlesListReq) => {
	return useQuery(['articles', params.lang], () => getAllArticles(params), {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('get all articles', error)
		},
	})
}

export const useGetTagsForArticleById = (
	params: TParamsArticlesTagsListReq
) => {
	return useQuery(
		['getTagsForArticle', params.lang],
		() => getTagsForArticleById(params),
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all articles tags', error)
			},
		}
	)
}

export const useUpdateTagsForArticleById = () => {
	return useMutation(
		async (params: TParamsAddTagsToArticlesReq) => {
			return await updateTagsForArticleById(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления тегов')
				console.log('add tags', error)
			},
		}
	)
}

export const useGetArticleById = () => {
	return useMutation(
		async ({ lang, id, bind_id }: TParamsSingleArticleReq) => {
			const [data] = await Promise.allSettled([
				getArticlesById({ lang, id, bind_id }),
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

export const useGetArticleAllLangById = () => {
	return useMutation(
		async ({ id }: TParamsSingleArticleAllLangReq) => {
			const [dataRu, dataEn] = await Promise.allSettled([
				getArticlesById({ lang: 'ru', id }),
				getArticlesById({ lang: 'en', id }),
			])

			return {
				dataRu: dataRu.status === 'fulfilled' ? dataRu.value : null,
				dataEn: dataEn.status === 'fulfilled' ? dataEn.value : null,
				errors: {
					ru: dataRu.status === 'rejected' ? dataRu.reason : null,
					en: dataEn.status === 'rejected' ? dataEn.reason : null,
				},
			}
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get all langs articles', error)
			},
		}
	)
}

export const useCreateArticle = () => {
	return useMutation(
		async ({ article }: TArticleCreateReq) => {
			return await createArticleById({ article })
		},
		{
			onSuccess: (data) => {
				toast.success('Статья добавлена')
			},
			onError: (error) => {
				toast.error('Ошибка добавления')
				console.log('create article', error)
			},
		}
	)
}

export const useUpdateArticleById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async ({ id, body }: TParamsArticleUpdateReq) => {
			return await updateArticleById({ id, body })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['articles'])
				toast.success('Статья обновлена')
			},
			onError: (error) => {
				toast.error('Ошибка обновления')
				console.log('update article', error)
			},
		}
	)
}

export const useDeleteArticleById = () => {
	const queryClient = useQueryClient()

	return useMutation(
		async ({ lang, id }: TArticleDeleteRes) => {
			return await deleteArticleById({ lang, id })
		},
		{
			onSuccess: (data) => {
				queryClient.invalidateQueries(['articles'])

				toast.success('Статья удалена')
			},
			onError: (error) => {
				toast.error('Ошибка удаления')
				console.log('delete article', error)
			},
		}
	)
}
