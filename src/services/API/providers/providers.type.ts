import { TFilterState } from "@/libs/context/FilterContext/type";
import { TLangKey } from "@/libs/context/LanguageProvider"
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent';
import { TSlotBody } from "../slots/slots.type";
import { TCasinoBody } from "../casino/casino.type";

type TProvidersRes = {
    items: TProvidersBody[]
    total: number
    page: number
    size: number
    pages: number
}

type TParamsProvidersReq = {
	size: number
	page: number
	filters: TFilterState
	all?: boolean
}

type TProvidersBody = {
    id: number
    title: string
    link: string
    hidden: boolean
    translations: TProvidersTranslations
}
type TProvidersTranslations = Record<TLangKey, TProvidersJSONData>

type TProvidersJSONData = {
	cat_name: string
	title_h1: string
	meta_title: string
	meta_description: string
    content: IConstructorContentSectionWithId[]
}
type TProvidersBodyEdit = TProvidersBody
type TProvidersGetReq = Pick<TProvidersBody, 'id'>
//

type TProvidersCreateReq = Omit<TProvidersBody, 'id'>

type TProvidersCreateRes = TProvidersBody

//

type TProvidersPatchReq = {
    _body: Omit<TProvidersBody, 'id'>
} & Pick<TProvidersBody, 'id'>

type TProvidersPatchRes = TProvidersBody

//

type TProvidersDeleteReq = Pick<TProvidersBody, 'id'>


export type { 
    TProvidersRes, 
    TParamsProvidersReq,
    TProvidersCreateReq, 
    TProvidersCreateRes, 
    TProvidersGetReq, 
    TProvidersPatchReq, 
    TProvidersPatchRes, 
    TProvidersDeleteReq, 
    TProvidersBody, 
    TProvidersBodyEdit,
    TProvidersJSONData
}

///
export type TParamsAddSlotsToProviderReq = {
	provider_id: number
	ids: number[]
}
export type TParamsAddProviderToSlotRes = TSlotBody[]

//
export type TParamsAddCasinosToProviderReq = {
	provider_id: number
	ids: number[]
}
export type TParamsAddProviderToCasinoRes = TCasinoBody[]