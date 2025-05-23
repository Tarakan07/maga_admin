import { SERVICES } from '@/constants/api'
import { API } from '@/services/helpers/conf-axios'
import {
	TNewsCreateReq,
	TNewsDeleteRes,
	TNewsListRes,
	TNewsTagsListRes,
	TNewsUpdateReq,
	TParamsAddTagsToNewsReq,
	TParamsAddTagsToNewsRes,
	TParamsNewsListReq,
	TParamsNewsTagsListReq,
	TParamsNewsUpdateReq,
	TParamsSingleNewsReq,
	TSingleNewsRes,
} from './news.type'

export const getAllNews = async ({
	lang,
	page,
	size,
	filters,
}: TParamsNewsListReq): Promise<TNewsListRes> => {
	try {
		const response = await API.get<any, { data: TNewsListRes }>(
			`${SERVICES.news}`,
			{
				params: {
					page,
					size,
					...filters,
				},
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('fetch news error')
	}
}

export const getNewsById = async ({
	lang,
	id,
	bind_id,
}: TParamsSingleNewsReq): Promise<TSingleNewsRes> => {
	try {
		let additionParams = bind_id ? `/id/${bind_id}` : `/${id}`
		const response = await API.get<any, { data: TSingleNewsRes }>(
			`${SERVICES.news}${additionParams}`,
			{
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {} as Promise<TSingleNewsRes>
		// throw new Error('fetch news by id error')
	}
}
export const getTagsForNewsById = async ({
	lang,
	page,
	size,
}: TParamsNewsTagsListReq): Promise<TNewsTagsListRes> => {
	try {
		const response = await API.get<any, { data: TNewsTagsListRes }>(
			`${SERVICES.news}/tags`,
			{
				params: {
					page,
					size,
				},
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('fetch news tags error')
	}
}
export const updateTagsForNewsById = async ({
	news_id,
	ids,
}: TParamsAddTagsToNewsReq): Promise<TParamsAddTagsToNewsRes> => {
	try {
		const response = await API.patch<TParamsAddTagsToNewsRes>(
			`${SERVICES.news}/${news_id}/tags`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('update news tags error')
	}
}
export const createNewsById = async ({
	news,
}: TNewsCreateReq): Promise<TSingleNewsRes> => {
	try {
		const response = await API.post<TNewsCreateReq, { data: TSingleNewsRes }>(
			`${SERVICES.news}`,
			{
				...news,
			}
		)
		return response.data
	} catch {
		throw new Error('create news error')
	}
}

export const updateNewsById = async ({
	id,
	body,
}: TParamsNewsUpdateReq): Promise<TSingleNewsRes> => {
	try {
		const response = await API.patch<TNewsUpdateReq, { data: TSingleNewsRes }>(
			`${SERVICES.news}/${id}`,
			{ ...body.news }
		)
		return response.data
	} catch {
		throw new Error('update news by id error')
	}
}

export const deleteNewsById = async ({
	lang,
	id,
}: TNewsDeleteRes): Promise<any> => {
	try {
		const response = await API.delete(`${SERVICES.news}/${id}`)
		return response.data
	} catch {
		throw new Error('delete news by id error')
	}
}
