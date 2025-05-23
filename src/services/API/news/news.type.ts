import { TLangKey } from '@/libs/context/LanguageProvider'
import { TFilterState } from '@/libs/context/FilterContext/type'
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

export type TTypeTagNews = {
	language: TLangKey
	id: number
	title: string
}

type TNewsBody = {
	bind_id?: string | null
	publish_at: string
	title: string
	link: string
	tags: TTypeTagNews[]
	meta_title: string
	meta_description: string
	banner: string
	btn_url: string
	color: string
	description: string
	content: IConstructorContentSectionWithId[]
	language: TLangKey
	id: number
	hidden: boolean
}

export type TNewsItemRes = TNewsBody
////
export type TParamsHistoryListReq = {
	lang: TLangKey
	size: number
	page: number
	filters: TFilterState
}
export type TParamsNewsListReq = {
	lang: TLangKey
	size: number
	page: number
	filters: TFilterState
}
export type TNewsListRes = {
	items: TNewsItemRes[]
	total: number
	page: number
	size: number
	pages: number
}
////
export type TParamsSingleNewsAllLangReq = {
	id: number
}
export type TParamsSingleNewsReq = {
	lang: TLangKey
	id: number
} & Pick<TNewsBody, 'bind_id'>
export type TSingleNewsRes = TNewsItemRes
////
export type TCreateNews = Omit<TNewsBody, 'id' | 'hidden'>

export type TNewsCreateReq = {
	news: TCreateNews
}
////
export type TUpdateNews = TNewsBody

export type TParamsNewsUpdateReq = {
	id: number
	body: TNewsUpdateReq
}
export type TNewsUpdateReq = {
	news: TUpdateNews
}
////
export type TNewsDeleteRes = {
	id: number
	lang: TLangKey
}
///
export type TParamsNewsTagsListReq = {
	lang: TLangKey
	size: number
	page: number
}

export type TNewsTagsListRes = {
	items: TTypeTagNews[]
	total: number
	page: number
	size: number
	pages: number
}

export type TParamsAddTagsToNewsReq = {
	news_id: number
	ids: number[]
}
export type TParamsAddTagsToNewsRes = TTypeTagNews[]
