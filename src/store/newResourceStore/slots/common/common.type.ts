import { TCasinoBody } from '@/services/API/casino/casino.type'
import { TGenresBody } from '@/services/API/genres/genres.type'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { TVolatility } from '@/services/API/slots/slots.type'

type TTypeTagSlotsCommon = string

type TCommonData = {
	info: {
		rtp: number
		min_bid: number
		max_bid: number
		max_out: number
		bar_amount: number
		row_amount: number
		line_amount: number
		year: number
		cost: string
		line_bid: string
	}
	volatility: TVolatility | null
	selects: {
		languages: TTypeTagSlotsCommon[],
		platforms: TTypeTagSlotsCommon[],
		extra_functions: TTypeTagSlotsCommon[],
	}
	providers: TProvidersBody[],
	genres: TGenresBody[],
	casinos: TCasinoBody[]
}
///
type TSetSelectsParams = {
	field: keyof TCommonData['selects']
	value: TTypeTagSlotsCommon
}
type TSetProvidersParams = {
	value: TProvidersBody
}
type TSetGenresParams = {
	value: TGenresBody
}
type TSetCasinosParams = {
	value: TCasinoBody
}
type TSetInfoParams = {
	field: keyof TCommonData['info']
	value: string
}
type TSetVolatilityParams = {
	value: TVolatility 
}
//

type TCommonState = {
	commonData: TCommonData
	setInfo: (params: TSetInfoParams) => void
	setSelects: (params: TSetSelectsParams) => void
	setProviders: (params: TSetProvidersParams) => void
	setGenres: (params: TSetGenresParams) => void
	setCasinos: (params: TSetCasinosParams) => void
	setVolatility: (params: TSetVolatilityParams) => void
}

export type {
	TCommonData,
	TCommonState,
	TTypeTagSlotsCommon,
	TSetProvidersParams,
	TSetGenresParams,
}
