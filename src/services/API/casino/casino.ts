import { SERVICES } from '@/constants/api'
import { API } from '@/services/helpers/conf-axios'
import {
	TCasinoCreateReq,
	TCasinoDeleteRes,
	TCasinoListRes,
	TCasinoPaymentsListRes,
	TParamsAddCasinoToPaymentsRes,
	TParamsAddPaymentsToCasinoReq,
	TParamsAddProvidersToCasinoReq,
	TParamsAddSlotsToCasinoReq,
	TParamsCasinoListReq,
	TParamsCasinoPaymentsListReq,
	TParamsCasinoUpdateReq,
	TParamsSingleCasinoReq,
	TSingleCasinoRes,
} from './casino.type'

export const getTopCasino = async ({
	lang,
	size,
	page,
	filters,
	all,
}: TParamsCasinoListReq): Promise<TCasinoListRes> => {
	try {
		const response = await API.get<any, { data: TCasinoListRes }>(
			`${SERVICES.casino}`,
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
		// throw new Error('fetch casino error')
	}
}

export const getCasinoById = async ({
	lang,
	id,
	bind_id,
}: TParamsSingleCasinoReq): Promise<TSingleCasinoRes> => {
	try {
		let additionParams = bind_id ? `/id/${bind_id}` : `/${id}`
		const response = await API.get<any, { data: TSingleCasinoRes }>(
			`${SERVICES.casino}${`/${bind_id}`}`,
			{
				headers: {
					language: lang,
				},
			}
		)
		return response.data
	} catch {
		return {} as Promise<TSingleCasinoRes>
		// throw new Error('fetch casino by id error')
	}
}

export const createCasinoById = async ({
	casino,
}: TCasinoCreateReq): Promise<TSingleCasinoRes> => {
	try {
		const response = await API.post<
			TCasinoCreateReq,
			{ data: TSingleCasinoRes }
		>(`${SERVICES.casino}`, {
			...casino,
		})
		return response.data
	} catch {
		throw new Error('create casino error')
	}
}

export const updateCasinoById = async ({
	id,
	body,
}: TParamsCasinoUpdateReq): Promise<TSingleCasinoRes> => {
	try {
		const response = await API.patch(`${SERVICES.casino}/${id}`, {
			...body.casino,
		})
		return response.data
	} catch {
		throw new Error('update casino by id error')
	}
}

export const deleteCasinoById = async ({
	lang,
	id,
}: TCasinoDeleteRes): Promise<any> => {
	try {
		const response = await API.delete(`${SERVICES.casino}/${id}`)
		return response.data
	} catch {
		throw new Error('delete casino by id error')
	}
}

///

export const getAllPaymentsForCasino = async ({
	lang,
	page,
	size,
}: TParamsCasinoPaymentsListReq): Promise<TCasinoPaymentsListRes> => {
	try {
		const response = await API.get<any, { data: TCasinoPaymentsListRes }>(
			`${SERVICES.casino}/payments`,
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
		// throw new Error('fetch payments error')
	}
}

export const getPaymentsForCasinoById = async ({
	casino_id,
}: Pick<
	TParamsAddPaymentsToCasinoReq,
	'casino_id'
>): Promise<TParamsAddCasinoToPaymentsRes> => {
	try {
		const response = await API.get<TParamsAddCasinoToPaymentsRes>(
			`${SERVICES.casino}/${casino_id}/payments`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('fetch payments for casino by id error')
	}
}

export const updatePaymentsForCasinoById = async ({
	casino_id,
	ids,
}: TParamsAddPaymentsToCasinoReq): Promise<TParamsAddCasinoToPaymentsRes> => {
	try {
		const response = await API.patch<TParamsAddCasinoToPaymentsRes>(
			`${SERVICES.casino}/${casino_id}/payments`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('update payments error')
	}
}

//

export const getProvidersForCasinoById = async ({
	casino_id,
}: Pick<TParamsAddProvidersToCasinoReq, 'casino_id'>): Promise<any> => {
	try {
		const response = await API.get<any>(
			`${SERVICES.casino}/${casino_id}/providers`
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('fetch providers error')
	}
}

export const updateProvidersForCasinoById = async ({
	casino_id,
	ids,
}: TParamsAddProvidersToCasinoReq): Promise<any> => {
	try {
		const response = await API.patch<any>(
			`${SERVICES.casino}/${casino_id}/providers`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('update providers error')
	}
}

//

export const getSlotsForCasinoById = async ({
	casino_id,
}: Pick<TParamsAddSlotsToCasinoReq, 'casino_id'>): Promise<any> => {
	try {
		const response = await API.get<any>(`${SERVICES.casino}/${casino_id}/slots`)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('fetch slots error')
	}
}

export const updateSlotsForCasinoById = async ({
	casino_id,
	ids,
}: TParamsAddSlotsToCasinoReq): Promise<any> => {
	try {
		const response = await API.patch<any>(
			`${SERVICES.casino}/${casino_id}/slots`,
			ids
		)
		return response.data
	} catch {
		return {
			data: [],
		} as any
		// throw new Error('update slots error')
	}
}
