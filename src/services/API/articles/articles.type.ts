import { TLangKey } from '@/libs/context/LanguageProvider'
import { TFilterState } from '@/libs/context/FilterContext/type'
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

// type TArticlesDefaultResponse = {
// 	status: string;
// 	message: string;
// 	data: string | null;
// 	lang: TLangKey;
// };
// //

// type TArticlesResponseBody = {
// 	status: string;
// 	message: string;
// };
export type TTypeTagArticle = {
	language: TLangKey
	id: number
	title: string
}

type TArticlesBody = {
	bind_id?: string | null
	publish_at: string
	title: string
	tags: TTypeTagArticle[]
	link: string
	banner: string
	btn_url: string
	meta_title: string
	meta_description: string
	color: string
	description: string
	content: IConstructorContentSectionWithId[]
	language: TLangKey
	id: number
	hidden: boolean
}
export type TArticlesItemRes = TArticlesBody
////
export type TParamsArticlesListReq = {
	lang: TLangKey
	size: number
	page: number
	filters: TFilterState
}
export type TArticlesListRes = {
	items: TArticlesItemRes[]
	total: number
	page: number
	size: number
	pages: number
}
////
export type TParamsSingleArticleAllLangReq = {
	id: number
}
export type TParamsSingleArticleReq = {
	lang: TLangKey
	id: number
} & Pick<TArticlesBody, 'bind_id'>

export type TSingleArticleRes = TArticlesItemRes
////
export type TCreateArticle = Omit<TArticlesBody, 'id' | 'hidden'>

export type TArticleCreateReq = {
	article: TCreateArticle
}
////
export type TUpdateArticle = TArticlesBody

export type TParamsArticleUpdateReq = {
	id: number
	body: TArticleUpdateReq
}

export type TArticleUpdateReq = {
	article: TUpdateArticle
}
////
export type TArticleDeleteRes = {
	id: number
	lang: TLangKey
}

///
export type TParamsArticlesTagsListReq = {
	lang: TLangKey
	size: number
	page: number
}

export type TArticlesTagsListRes = {
	items: TTypeTagArticle[]
	total: number
	page: number
	size: number
	pages: number
}

export type TParamsAddTagsToArticlesReq = {
	article_id: number
	ids: number[]
}
export type TParamsAddTagsToArticlesRes = TTypeTagArticle[]
