import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantCatEdit } from '@/features/Constructor/Categories/CatEdit/CatVariantResource/CatVariantResource.type'
import { TProvidersBody, TProvidersBodyEdit, TProvidersJSONData } from '@/services/API/providers/providers.type'

type TStateModalCat = TProvidersBodyEdit
type TProvidersJsonObj = {
	translations: TProvidersJSONData
} & Omit<TProvidersBodyEdit, 'translations'>
type TModalCatEditProps = {
	provider?: TProvidersBody
	actions?: {
		callbackSuccess: (params: TStateModalCat) => void
		callbackRemove?: (params: TStateModalCat) => void
	}
	variantEdit: TVariantCatEdit
}

type THandleChangeFromParams = {
	key: keyof Omit<TProvidersBodyEdit, 'id'> | keyof TProvidersJSONData
	value: string
	lang?: TLangKey
}
export type {
	THandleChangeFromParams,
	TModalCatEditProps,
	TStateModalCat,
	TProvidersJsonObj,
}
