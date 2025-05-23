import { TLangKey } from '@/libs/context/LanguageProvider'

type TVariantResource = 'casino' | 'news' | 'articles' | 'history' | 'category' | 'slots' | 'providers'

type TVariantRequest = 'ADD' | 'UPDATE'

type TTagResource = {
	id: number
	title: string
}
type TParamsGetDataForRequest = {
	lang: TLangKey
	variantRequest?: TVariantRequest
}
type TParamsSetDataFromRequest<DATA> = {
	dataRes: DATA | null
}
type TBindTransformData<Loc, To_Ser, From_Ser> = {
	getDataForRequest: (params: TParamsGetDataForRequest) => To_Ser
	setDataFromRequest: (params: TParamsSetDataFromRequest<From_Ser>) => Loc
}
export type {
	TParamsGetDataForRequest,
	TBindTransformData,
	TVariantResource,
	TVariantRequest,
	TTagResource,
}
