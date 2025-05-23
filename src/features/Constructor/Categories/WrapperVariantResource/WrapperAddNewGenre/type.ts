import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantCatEdit } from '@/features/Constructor/Categories/CatEdit/CatVariantResource/CatVariantResource.type'
import { TGenresBody, TGenresBodyEdit, TGenresJSONData } from '@/services/API/genres/genres.type'

type TStateModalCat = TGenresBodyEdit
type TGenresJsonObj = {
	translations: TGenresJSONData
} & Omit<TGenresBodyEdit, 'translations'>
type TModalCatEditProps = {
	genre?: TGenresBody
	actions?: {
		callbackSuccess: (params: TStateModalCat) => void
		callbackRemove?: (params: TStateModalCat) => void
	}
	variantEdit: TVariantCatEdit
}

type THandleChangeFromParams = {
	key: keyof Omit<TGenresBodyEdit, 'id'> | keyof TGenresJSONData
	value: string
	lang?: TLangKey
}
export type {
	THandleChangeFromParams,
	TModalCatEditProps,
	TStateModalCat,
	TGenresJsonObj,
}
