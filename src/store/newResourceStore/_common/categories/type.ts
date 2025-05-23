import { TCategoriesRes } from '@/services/API/categories/categories.type'
import { TVariantResource } from '../../type'
import { TCategoryJsonObj } from '@/features/Constructor/Categories/WrapperVariantResource/WrapperAddNewCategory/type'

type TCategoriesData = {
	allCategories: TCategoriesRes[]
	bindingCategories: TCategoriesRes[]
}
type TBindCategoriesStore = {
	[key in TVariantResource]: TCategoriesData
}
type TParamsUpdateCategories = {
	resource: TVariantResource
	value: TCategoriesData['allCategories']
}
type TParamsToggleCategories = {
	resource: TVariantResource
	category: TCategoriesRes | TCategoriesRes[]
}
type TParamsResource = {
	resource: TVariantResource
}
type TParamsConcatArray = {
	value: TCategoriesRes[]
}
type TCategoriesStore = {
	categoriesObj: TBindCategoriesStore
	updateCategories: (params: TParamsUpdateCategories) => void
	setCategories: (params: TParamsToggleCategories) => void
	deleteCategories: (params: TParamsToggleCategories) => void
	getCategoryWithClear: (params: TParamsResource) => TCategoriesData
	getConcatArrayCategories: (params: TParamsConcatArray) => TCategoriesRes[]
	loadCategoryData: (data?: Partial<TCategoryJsonObj>) => void
}

export type {
	TBindCategoriesStore,
	TCategoriesData,
	TCategoriesStore,
	TParamsUpdateCategories,
	//
	TParamsToggleCategories,
}
