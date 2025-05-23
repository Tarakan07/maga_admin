import { TLangKey } from '@/libs/context/LanguageProvider'

// type THistoryDefaultResponse = {
// 	status: string;
// 	message: string;
// 	data: string | null;
// 	lang: TLangKey;
// };

// //
// type THistoryResponseBody = {
// 	status: string;
// 	message: string;
// };

type TBonus = {
	promo_code: {
		code: string
	}
	referral: {
		url: string
	}
}

type THistoryBody = {
	publish_at: string
	name: string
	text: string
	image: string
	color: string
	preview_image: string
	link: string
	language: TLangKey
	bonuses: TBonus
}
export type THistoryItemRes = THistoryBody & {
	id: number
	hidden: boolean
}
////

export type THistoryListRes = {
	items: THistoryItemRes[]
	total: number
	page: number
	size: number
	pages: number
}
////
export type TParamsSingleHistoryAllLangReq = {
	id: number
}
export type TParamsSingleHistoryReq = {
	lang: TLangKey
	id: number
}

export type TSingleHistoryRes = THistoryItemRes
////
export type TCreateHistory = THistoryBody

export type THistoryCreateReq = {
	story: TCreateHistory
}
////
export type TUpdateHistory = THistoryBody & {
	id: number
	hidden: boolean
}

export type TParamsHistoryUpdateReq = {
	id: number
	body: THistoryUpdateReq
}

export type THistoryUpdateReq = {
	story: TUpdateHistory
}
////
export type THistoryDeleteRes = {
	id: number
	lang: TLangKey
}
////
