import { SERVICES } from '@/constants/api'
import { API } from '@/services/helpers/conf-axios'
import {
	TArticleCreateReq,
	TArticleDeleteRes,
	TArticlesListRes,
	TArticlesTagsListRes,
	TArticleUpdateReq,
	TParamsAddTagsToArticlesReq,
	TParamsAddTagsToArticlesRes,
	TParamsArticlesListReq,
	TParamsArticlesTagsListReq,
	TParamsArticleUpdateReq,
	TParamsSingleArticleReq,
	TSingleArticleRes,
} from './articles.type'

export const getAllArticles = async ({
	lang,
	page,
	size,
	filters,
}: TParamsArticlesListReq): Promise<TArticlesListRes> => {
	try {
		const response = await API.get<any, { data: TArticlesListRes }>(
			`${SERVICES.articles}`,
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
		throw new Error('fetch articles error')
	}
}
export const getTagsForArticleById = async ({
	lang,
	page,
	size,
}: TParamsArticlesTagsListReq): Promise<TArticlesTagsListRes> => {
	try {
		const response = await API.get<any, { data: TArticlesTagsListRes }>(
			`${SERVICES.articles}/tags`,
			{
				params: {
					page,
					size,
					// ...filters
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
		throw new Error('fetch articles error')
	}
}
export const updateTagsForArticleById = async ({
	article_id,
	ids,
}: TParamsAddTagsToArticlesReq): Promise<TParamsAddTagsToArticlesRes> => {
	try {
		const response = await API.patch<TParamsAddTagsToArticlesRes>(
			`${SERVICES.articles}/${article_id}/tags`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		throw new Error('fetch articles error')
	}
}

export const getArticlesById = async ({
	lang,
	id,
	bind_id,
}: TParamsSingleArticleReq): Promise<TSingleArticleRes> => {
	try {
		let additionParams = bind_id ? `/id/${bind_id}` : `/${id}`
		const response = await API.get<any, { data: TSingleArticleRes }>(
			`${SERVICES.articles}${additionParams}`,
			{
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {} as Promise<TSingleArticleRes>
		// throw new Error('fetch articles by id error')
	}
}

export const createArticleById = async ({
	article,
}: TArticleCreateReq): Promise<TSingleArticleRes> => {
	try {
		const response = await API.post<
			TArticleCreateReq,
			{ data: TSingleArticleRes }
		>(`${SERVICES.articles}`, {
			...article,
		})
		return response.data
	} catch {
		throw new Error('create articles error')
	}
}

export const updateArticleById = async ({
	id,
	body,
}: TParamsArticleUpdateReq): Promise<TSingleArticleRes> => {
	try {
		const response = await API.patch<
			TArticleUpdateReq,
			{ data: TSingleArticleRes }
		>(`${SERVICES.articles}/${id}`, {
			...body.article,
		})
		return response.data
	} catch {
		throw new Error('update articles by id error')
	}
}

export const deleteArticleById = async ({
	lang,
	id,
}: TArticleDeleteRes): Promise<any> => {
	try {
		const response = await API.delete(`${SERVICES.articles}/${id}`)
		return response.data
	} catch {
		throw new Error('delete articles by id error')
	}
}
