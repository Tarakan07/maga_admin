import { API } from '@/services/helpers'
import {
	TParamsAddCasinosToProviderReq,
	TParamsAddProviderToCasinoRes,
	TParamsAddProviderToSlotRes,
	TParamsAddSlotsToProviderReq,
	TParamsProvidersReq,
	TProvidersBodyEdit,
	TProvidersCreateReq,
	TProvidersCreateRes,
	TProvidersDeleteReq,
	TProvidersGetReq,
	TProvidersPatchReq,
	TProvidersPatchRes,
	TProvidersRes,
} from './providers.type'

const BASE_URL = '/v1/providers'

export const getAllProviders = async ({
	size,
	page,
	filters,
	all,
}: TParamsProvidersReq): Promise<TProvidersRes> => {
	try {
		const response = await API.get<any, { data: TProvidersRes }>(BASE_URL, {
			params: {
				size,
				page,
				all,
				...filters,
			},
		})
		return response.data
	} catch (error) {
		throw new Error('fetch providers error')
	}
}

export const getProvidersById = async ({
	id,
}: TProvidersGetReq): Promise<TProvidersPatchRes> => {
	try {
		const response = await API.get<TProvidersBodyEdit>(`${BASE_URL}/${id}`)
		return response.data
	} catch (error) {
		throw new Error('get category by id error')
	}
}

export const createProvider = async (
	provider: TProvidersCreateReq
): Promise<TProvidersCreateRes> => {
	try {
		const response = await API.post<
			TProvidersCreateReq,
			{ data: TProvidersCreateRes }
		>(BASE_URL, provider)
		return response.data
	} catch (error) {
		throw new Error('create provider error')
	}
}

export const updateProviderById = async ({
	id,
	_body: body,
}: TProvidersPatchReq): Promise<TProvidersPatchRes> => {
	try {
		const response = await API.patch<TProvidersPatchRes>(
			`${BASE_URL}/${id}`,
			body
		)
		return response.data
	} catch (error) {
		throw new Error('update provider by id error')
	}
}

export const deleteProviderById = async ({
	id,
}: TProvidersDeleteReq): Promise<void> => {
	try {
		await API.delete(`${BASE_URL}/${id}`)
	} catch (error) {
		throw new Error('delete provider by id error')
	}
}

///
export const getSlotsForProviderById = async ({
	provider_id,
}: Pick<
	TParamsAddSlotsToProviderReq,
	'provider_id'
>): Promise<TParamsAddProviderToSlotRes> => {
	try {
		const response = await API.get<TParamsAddProviderToSlotRes>(
			`${BASE_URL}/${provider_id}/slots`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
export const updateSlotsForProviderById = async ({
	provider_id,
	ids,
}: TParamsAddSlotsToProviderReq): Promise<TParamsAddProviderToSlotRes> => {
	try {
		const response = await API.patch<TParamsAddProviderToSlotRes>(
			`${BASE_URL}/${provider_id}/slots`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
//
export const getCasinosForProviderById = async ({
	provider_id,
}: Pick<
	TParamsAddCasinosToProviderReq,
	'provider_id'
>): Promise<TParamsAddProviderToCasinoRes> => {
	try {
		const response = await API.get<TParamsAddProviderToCasinoRes>(
			`${BASE_URL}/${provider_id}/casinos`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
export const updateCasinosForProviderById = async ({
	provider_id,
	ids,
}: TParamsAddCasinosToProviderReq): Promise<TParamsAddProviderToCasinoRes> => {
	try {
		const response = await API.patch<TParamsAddProviderToCasinoRes>(
			`${BASE_URL}/${provider_id}/casinos`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
