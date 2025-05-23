import { SERVICES } from '@/constants/api'
import { API } from '@/services/helpers/conf-axios'
import { TParamsAddCasinosToSlotReq, TParamsAddGenresToSlotReq, TParamsAddProvidersToSlotReq, TParamsAddSlotToCasinoRes, TParamsAddSlotToGenreRes, TParamsAddSlotToProviderRes, TParamsSingleSlotReq, TParamsSlotsListReq, TParamsSlotUpdateReq, TSingleSlotRes, TSlotCreateReq, TSlotDeleteRes, TSlotsListRes } from './slots.type'

export const getAllSlots = async ({
	lang,
	size,
	page,
	filters,
	all,
}: TParamsSlotsListReq): Promise<TSlotsListRes> => {
	try {
		const response = await API.get<any, { data: TSlotsListRes }>(
			`${SERVICES.slots}`,
			{
				params: {
					size,
					page,
					all,
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
	}
}

export const getSlotById = async ({
	lang,
	id,
	bind_id,
}: TParamsSingleSlotReq): Promise<TSingleSlotRes> => {
	try {
		let additionParams = bind_id ? `/id/${bind_id}` : `/${id}`
		const response = await API.get<any, { data: TSingleSlotRes }>(
			`${SERVICES.slots}${additionParams}`,
			{
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {} as Promise<TSingleSlotRes>
	}
}

export const getProvidersForSlotById = async ({
	slot_id,
}: Pick<
	TParamsAddProvidersToSlotReq,
	'slot_id'
>): Promise<TParamsAddSlotToProviderRes> => {
	try {
		const response = await API.get<TParamsAddSlotToProviderRes>(
			`${SERVICES.slots}/${slot_id}/providers`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
export const updateProvidersForSlotById = async ({
	slot_id,
	ids,
}: TParamsAddProvidersToSlotReq): Promise<TParamsAddSlotToProviderRes> => {
	try {
		const response = await API.patch<TParamsAddSlotToProviderRes>(
			`${SERVICES.slots}/${slot_id}/providers`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}

export const getGenresForSlotById = async ({
	slot_id,
}: Pick<
	TParamsAddGenresToSlotReq,
	'slot_id'
>): Promise<TParamsAddSlotToGenreRes> => {
	try {
		const response = await API.get<TParamsAddSlotToGenreRes>(
			`${SERVICES.slots}/${slot_id}/genres`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
export const updateGenresForSlotById = async ({
	slot_id,
	ids,
}: TParamsAddGenresToSlotReq): Promise<TParamsAddSlotToGenreRes> => {
	try {
		const response = await API.patch<TParamsAddSlotToGenreRes>(
			`${SERVICES.slots}/${slot_id}/genres`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}

export const getCasinosForSlotById = async ({
	slot_id,
}: Pick<
	TParamsAddCasinosToSlotReq,
	'slot_id'
>): Promise<TParamsAddSlotToCasinoRes> => {
	try {
		const response = await API.get<TParamsAddSlotToCasinoRes>(
			`${SERVICES.slots}/${slot_id}/casinos`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}
export const updatCasinosForSlotById = async ({
	slot_id,
	ids,
}: TParamsAddCasinosToSlotReq): Promise<TParamsAddSlotToCasinoRes> => {
	try {
		const response = await API.patch<TParamsAddSlotToCasinoRes>(
			`${SERVICES.slots}/${slot_id}/casinos`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
	}
}

///

export const createSlotById = async ({
	slot,
}: TSlotCreateReq): Promise<TSingleSlotRes> => {
	try {
		const response = await API.post<
			TSlotCreateReq,
			{ data: TSingleSlotRes }
		>(`${SERVICES.slots}`, {
			...slot,
		})
		return response.data
	} catch {
		throw new Error('create slot error')
	}
}

export const updateSlotById = async ({
	id,
	body,
}: TParamsSlotUpdateReq): Promise<TSingleSlotRes> => {
	try {
		const response = await API.patch(`${SERVICES.slots}/${id}`, {
			...body.slot,
		})
		return response.data
	} catch {
		throw new Error('update slot by id error')
	}
}

export const deleteSlotById = async ({
	lang,
	id,
}: TSlotDeleteRes): Promise<any> => {
	try {
		const response = await API.delete(`${SERVICES.slots}/${id}`)
		return response.data
	} catch {
		throw new Error('delete slot by id error')
	}
}

