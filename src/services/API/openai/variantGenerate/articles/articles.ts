import { API } from '@/services/helpers'
import { SERVICES } from '@/constants/api'
import {
	TParamsGetTopicsReq,
	TParamsUpdateTopicsReq,
	TTopicItem,
	TTopicsRes,
} from '../../openai.type'

export const generateArticleWithOpenai = async (): Promise<string> => {
	try {
		const response = await API.post<any, { data: string }>(
			`${SERVICES.openai}/generate/articles`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('generate article error')
	}
}

export const getTopicsForArticle = async ({
	topic_status,
	page,
	size,
	all,
}: TParamsGetTopicsReq): Promise<TTopicsRes> => {
	try {
		const response = await API.get<any, { data: TTopicsRes }>(
			`${SERVICES.openai}/articles/topics`,
			{
				params: {
					page,
					size,
					topic_status,
					all,
				},
			}
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('fetch articles topics error')
	}
}

export const updateTopicsForArticle = async ({
	topics,
}: TParamsUpdateTopicsReq): Promise<TTopicItem[]> => {
	try {
		const response = await API.patch<any, { data: TTopicItem[] }>(
			`${SERVICES.openai}/articles/topics`,
			{
				topics,
			}
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('update articles topics error')
	}
}
