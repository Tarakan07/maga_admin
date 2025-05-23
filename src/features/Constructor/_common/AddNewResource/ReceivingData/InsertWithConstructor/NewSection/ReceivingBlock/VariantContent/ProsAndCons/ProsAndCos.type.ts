import {
	TBlockProsAndConsItem,
	TBlockProsAndConsKeys,
	TBlockProsAndConsKeysText,
	TBlockProsAndConsKeysTextValue,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

type TParamsAddNew = {
	_key: TBlockProsAndConsKeys
}
type TParamsRemoveRow = {
	_key: TBlockProsAndConsKeys
	id: number
}
type TParamsChangeText = {
	keyVariantData: TBlockProsAndConsKeys
	keyVariantText: TBlockProsAndConsKeysText
	id: number
	text: TBlockProsAndConsKeysTextValue
}
type TParamsSetContent = {
	_key: TBlockProsAndConsKeys
	array: TBlockProsAndConsItem[]
}
export type {
	TParamsAddNew,
	TParamsChangeText,
	TParamsSetContent,
	TParamsRemoveRow,
}
