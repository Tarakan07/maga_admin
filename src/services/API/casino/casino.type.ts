import { TLangKey } from '@/libs/context/LanguageProvider'
import { TFilterState } from '@/libs/context/FilterContext/type'
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import {
	TTypeTagCasinoCommon,
	TTypeTagCasinoCommonWallets,
} from '@/store/newResourceStore/casino/common/common.type'

type TBonus = {
	promo_code: {
		code: string
		btn_title: string
	}
	referral: {
		url: string
		btn_title: string
	}
}

type TGrade = {
	label: string
	count: number
}

type TRating = {
	survey: TSurvey
	// bonus: any;
	// banned_countries: string[];
	// news: any;
}

type TSurvey = {
	title: string
	description: string
	content: IConstructorContentSectionWithId[]
}

///////
export type TCasinoBody = {
	bind_id?: string | null
	link: string
	logo: string
	name: string
	bonuses: TBonus
	languages: TTypeTagCasinoCommon[]
	payments: TTypeTagCasinoCommonWallets[]
	meta_title: string
	meta_description: string
	grades: TGrade[]
	banned_countries: TTypeTagCasinoCommon[]
	content: TRating
	language: TLangKey
	id: number
	hidden: boolean
}

export type TCasinoItemRes = TCasinoBody
/////
export type TParamsCasinoListReq = {
	lang: TLangKey
	size: number
	page: number
	filters: TFilterState
	all?: boolean
}

export type TCasinoListRes = {
	items: TCasinoItemRes[]
	total: number
	page: number
	size: number
	pages: number
}
/////
export type TParamsSingleCasinoAllLangReq = {
	id: number
}
export type TParamsSingleCasinoReq = {
	lang: TLangKey
	id: number
} & Pick<TCasinoBody, 'bind_id'>

export type TSingleCasinoRes = TCasinoItemRes
/////
export type TCreateCasino = Omit<TCasinoBody, 'id' | 'hidden'>

export type TCasinoCreateReq = {
	casino: TCreateCasino
}
/////
export type TUpdateCasino = TCasinoBody

export type TCasinoUpdateReq = {
	casino: TUpdateCasino
}
export type TParamsCasinoUpdateReq = {
	id: number

	body: TCasinoUpdateReq
}

/////
export type TCasinoDeleteRes = {
	id: number
	lang: TLangKey
}

///
export type TParamsCasinoPaymentsListReq = {
	lang: TLangKey
	size: number
	page: number
}

export type TCasinoPaymentsListRes = {
	items: TTypeTagCasinoCommonWallets[]
	total: number
	page: number
	size: number
	pages: number
}

export type TParamsAddPaymentsToCasinoReq = {
	casino_id: number
	ids: number[]
}
export type TParamsAddCasinoToPaymentsRes = TTypeTagCasinoCommonWallets[]

///
export type TParamsAddProvidersToCasinoReq = {
	casino_id: number
	ids: number[]
}

///
export type TParamsAddSlotsToCasinoReq = {
	casino_id: number
	ids: number[]
}
