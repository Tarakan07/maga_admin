import {
	TBlockFaqItem,
	TBlockFaqKeys,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

type TParamsRemoveRow = {
	id: number
}
type TParamsChangeText = {
	keyVariantData: TBlockFaqKeys
	id: number
	text: string
}
type TParamsSetContent = {
	array: TBlockFaqItem[]
}
export type { TParamsChangeText, TParamsSetContent, TParamsRemoveRow }
