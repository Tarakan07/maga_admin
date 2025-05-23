import { TCategoriesRes } from '@/services/API/categories/categories.type'
import { TParamsToggleCategories } from '@/store/newResourceStore/_common/categories/type'

type TGetSizeAddedParams = {
	category: TCategoriesRes | TCategoriesRes[]
}
type TGetSizeAddedAllParams = {
	categories: TCategoriesRes[]
}
type TToggleCategory = {
	type: 'add' | 'delete'
} & Pick<TParamsToggleCategories, 'category'>

export type { TGetSizeAddedAllParams, TGetSizeAddedParams, TToggleCategory }
