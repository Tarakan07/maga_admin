import { TProvidersBodyEdit } from '@/services/API/providers/providers.type'
import { TCategoriesBodyEdit } from '@/services/API/categories/categories.type'
type TVariantCatEdit = 'create' | 'update' | 'remove'

type THandleEditParams = {
	data: TCategoriesBodyEdit | TProvidersBodyEdit
	variantEdit: TVariantCatEdit
}

export type { THandleEditParams, TVariantCatEdit }
