import { TLangKey } from '@/libs/context/LanguageProvider'
import { TFilterState } from '@/libs/context/FilterContext/type'
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import { TTypeTagSlotsCommon } from '@/store/newResourceStore/slots/common/common.type'
import { TProvidersBody } from '../providers/providers.type'
import { TGenresBody } from '../genres/genres.type'
import { TCasinoBody } from '../casino/casino.type'

export type TVolatility = 'low' | 'medium' | 'high'

///////
export type TSlotBody = {
	bind_id?: string | null
	casinos: TCasinoBody[]
	logo: string
	link: string
	demo_link: string
	name: string
	meta_title: string
	meta_description: string
	content: IConstructorContentSectionWithId[]
	rtp: number
	min_bid: number
	max_bid: number
	max_out: number
	bar_amount: number
	row_amount: number
	line_amount: number
	volatility: TVolatility | null
	year: number
	cost: string
	line_bid: string
	languages: TTypeTagSlotsCommon[]
	platforms: TTypeTagSlotsCommon[]
	extra_functions: TTypeTagSlotsCommon[]
	providers: TProvidersBody[]
	genres: TGenresBody[]
	id: number
	hidden: boolean
	language: TLangKey
}

/////
export type TParamsSlotsListReq = {
	lang: TLangKey
	size: number
	page: number
	filters: TFilterState
	all?: boolean
}

export type TSlotsListRes = {
	items: TSlotBody[]
	total: number
	page: number
	size: number
	pages: number
}
/////
export type TParamsSingleSlotAllLangReq = {
	id: number
}
export type TParamsSingleSlotReq = {
	lang: TLangKey
	id: number
} & Pick<TSlotBody, 'bind_id'>

export type TSingleSlotRes = TSlotBody
/////
export type TCreateSlot = Omit<TSlotBody, 'id' | 'hidden'>

export type TSlotCreateReq = {
	slot: TCreateSlot
}
/////
export type TUpdateSlot = TSlotBody

export type TSlotUpdateReq = {
	slot: TUpdateSlot
}
export type TParamsSlotUpdateReq = {
	id: number

	body: TSlotUpdateReq
}

/////
export type TSlotDeleteRes = {
	id: number
	lang: TLangKey
}

///
export type TParamsAddProvidersToSlotReq = {
	slot_id: number
	ids: number[]
}
export type TParamsAddSlotToProviderRes = TProvidersBody[]

///
export type TParamsAddGenresToSlotReq = {
	slot_id: number
	ids: number[]
}
export type TParamsAddSlotToGenreRes = TGenresBody[]

///
export type TParamsAddCasinosToSlotReq = {
	slot_id: number
	ids: number[]
}
export type TParamsAddSlotToCasinoRes = TCasinoBody[]