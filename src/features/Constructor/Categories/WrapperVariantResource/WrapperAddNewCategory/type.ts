import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantCatEdit } from '@/features/Constructor/Categories/CatEdit/CatVariantResource/CatVariantResource.type'
import {
	TCategoriesBodyEdit,
	TCategoriesJSONData,
	TCategoriesRes,
} from '@/services/API/categories/categories.type'

type TStateModalCat = TCategoriesBodyEdit
type TCategoryJsonObj = {
	translations: TCategoriesJSONData
} & Omit<TCategoriesBodyEdit, 'translations'>
type TModalCatEditProps = {
	category?: TCategoriesRes
	actions?: {
		callbackSuccess: (params: TStateModalCat) => void
		callbackRemove?: (params: TStateModalCat) => void
	}
	variantEdit: TVariantCatEdit
} & Partial<Pick<TCategoriesBodyEdit, 'parent_id'>>

type THandleChangeFromParams = {
	key: keyof Omit<TCategoriesBodyEdit, 'id'> | keyof TCategoriesJSONData
	value: string
	lang?: TLangKey
}
export type {
	THandleChangeFromParams,
	TModalCatEditProps,
	TStateModalCat,
	TCategoryJsonObj,
}
