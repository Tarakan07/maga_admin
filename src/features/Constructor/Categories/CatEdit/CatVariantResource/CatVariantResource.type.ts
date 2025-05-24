import { TCategoriesBodyEdit } from '@/services/API/categories/categories.type'
type TVariantCatEdit = 'create' | 'update' | 'remove'

type THandleEditParams = {
	data: TCategoriesBodyEdit
	variantEdit: TVariantCatEdit
}

export type { THandleEditParams, TVariantCatEdit }
