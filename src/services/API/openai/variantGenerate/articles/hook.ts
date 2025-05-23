import { toast } from 'react-toastify'
import { useMutation, useQuery } from 'react-query'
import { TParamsGetTopicsReq, TParamsUpdateTopicsReq } from '../../openai.type'
import {
	generateArticleWithOpenai,
	getTopicsForArticle,
	updateTopicsForArticle,
} from './articles'

export const useGetTopicsForArticle = (params: TParamsGetTopicsReq) => {
	return useQuery(['articles/topics'], () => getTopicsForArticle(params), {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('get all articles topics', error)
		},
	})
}

export const useUpdateTopicsForArticle = () => {
	return useMutation(
		async (params: TParamsUpdateTopicsReq) => {
			return await updateTopicsForArticle(params)
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				toast.error('Ошибка добавления топиков')
				console.log('update topics', error)
			},
		}
	)
}

export const useGenerateArticleWithOpenai = () => {
	return useMutation(
		async () => {
			return await generateArticleWithOpenai()
		},
		{
			onSuccess: (data) => {
				toast.success('Статья сгенерирована')
			},
			onError: (error) => {
				toast.error('Ошибка генерации статьи')
				console.log('generate articles', error)
			},
		}
	)
}
