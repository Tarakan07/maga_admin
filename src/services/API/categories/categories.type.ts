import { TLangKey } from '@/libs/context/LanguageProvider'
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

type TCategoriesJSONData = {
	cat_name: string
	title_h1: string
	meta_title: string
	meta_description: string
	content: IConstructorContentSectionWithId[]
}
type TCategoriesTranslations = Record<TLangKey, TCategoriesJSONData>
type TCategoriesBody = {
	id: number
	title: string
	link: string
	translations: TCategoriesTranslations
	parent_id: number | null
	children: TCategoriesRes[]
}
type TCategoriesBodyEdit = Omit<TCategoriesBody, 'children'>
export type { TCategoriesJSONData, TCategoriesBodyEdit }
//

type TCategoriesRes = TCategoriesBody & { __type?: 'TCategoriesRes' }

//

type TCategoriesCreateReq = Omit<TCategoriesBody, 'children' | 'id'>

type TCategoriesCreateRes = Omit<TCategoriesBody, 'children'>

//

type TCategoriesGetReq = Pick<TCategoriesBody, 'id'>

type TCategoriesPatchReq = {
	_body: Omit<TCategoriesBody, 'children' | 'id'>
} & Pick<TCategoriesBody, 'id'>

type TCategoriesPatchRes = Omit<TCategoriesBody, 'children'>

//

type TCategoriesDeleteReq = Pick<TCategoriesBody, 'id'>
export type {
	TCategoriesRes,
	TCategoriesCreateReq,
	TCategoriesCreateRes,
	TCategoriesPatchReq,
	TCategoriesPatchRes,
	TCategoriesDeleteReq,
}

////
type TCategoriesResourceId = number

type TCategoriesGetResourceReq = {
	id: TCategoriesResourceId
}
//
type TCategoriesBindingResourceReq = {
	_query: TCategoriesGetResourceReq
	_body: TCategoriesResourceId[]
}

export type {
	TCategoriesResourceId,
	TCategoriesGetResourceReq,
	TCategoriesGetReq,
	TCategoriesBindingResourceReq,
	TCategoriesTranslations,
}
