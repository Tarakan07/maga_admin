import { TCategoriesBodyEdit, TCategoriesTranslations } from '@/services/API/categories/categories.type'
import { TProvidersBodyEdit } from '@/services/API/providers/providers.type'
type TVariantCatEdit = 'create' | 'update' | 'remove'

type THandleEditParams = {
	data: TCategoriesBodyEdit | TProvidersBodyEdit
	variantEdit: TVariantCatEdit
}


export type { THandleEditParams, TVariantCatEdit }
