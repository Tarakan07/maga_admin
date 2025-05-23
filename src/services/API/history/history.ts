import { SERVICES } from '@/constants/api'
import { API } from '@/services/helpers/conf-axios'
import { TParamsHistoryListReq, TParamsSingleNewsReq } from '../news/news.type'
import {
	THistoryCreateReq,
	THistoryDeleteRes,
	THistoryListRes,
	TParamsHistoryUpdateReq,
	TSingleHistoryRes,
} from './history.type'

export const getAllHistory = async ({
	lang,
	size,
	page,
	filters,
}: TParamsHistoryListReq): Promise<THistoryListRes> => {
	try {
		const response = await API.get<any, { data: THistoryListRes }>(
			`${SERVICES.history}?geo=RU`,
			{
				params: {
					size,
					page,
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
		throw new Error('fetch history error')
	}
}

export const getHistoryById = async ({
	lang,
	id,
}: TParamsSingleNewsReq): Promise<TSingleHistoryRes> => {
	try {
		const response = await API.get<any, { data: TSingleHistoryRes }>(
			`${SERVICES.history}/${id}`,
			{
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		throw new Error('fetch history by id error')
	}
}

export const createHistoryById = async ({
	story,
}: THistoryCreateReq): Promise<TSingleHistoryRes> => {
	try {
		const response = await API.post<
			THistoryCreateReq,
			{ data: TSingleHistoryRes }
		>(`${SERVICES.history}`, {
			...story,
		})
		return response.data
	} catch {
		throw new Error('create history error')
	}
}

export const updateHistoryById = async ({
	id,
	body,
}: TParamsHistoryUpdateReq): Promise<{ data: TSingleHistoryRes }> => {
	try {
		const response = await API.patch(`${SERVICES.history}/${id}`, {
			...body.story,
		})
		return response.data
	} catch {
		throw new Error('update history by id error')
	}
}

export const deleteHistoryById = async ({
	lang,
	id,
}: THistoryDeleteRes): Promise<any> => {
	try {
		const response = await API.delete(`${SERVICES.history}/${id}`)
		return response.data
	} catch {
		throw new Error('delete history by id error')
	}
}
