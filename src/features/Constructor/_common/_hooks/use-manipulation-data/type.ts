import { TLangKey } from '@/libs/context/LanguageProvider'
import {
	TBindTransformData,
	TVariantResource,
	TVariantRequest,
} from '@/store/newResourceStore/type'

type TEditingData<From_Ser> = {
	data: From_Ser | null
}
type TParamsManipulationData<T, To_Ser, From_Ser> = {
	editingData?: TEditingData<From_Ser>
	copyArray: T | null
	editFor: TVariantRequest
	variantResource: TVariantResource
	bindTransformData: TBindTransformData<T, To_Ser, From_Ser>
	bindActionData: {
		updateLocalData: () => void
		loadLocalData: (params: { isDelete?: boolean }) => void
		removeLocalData: () => void
	}
}

type TReturnAfterSentData<To_Ser> = {
	sentData: To_Ser
	clear: () => void
}

type TReturnDataLocal = {}
type TReturnData<To_Ser> = {
	handleCopyStore: () => void
	handleLocalRemove: () => void
	handleLocalLoadData: () => void
	handleSentData: (lang: TLangKey) => TReturnAfterSentData<To_Ser> | null
}

export type {
	TEditingData,
	TParamsManipulationData,
	TReturnAfterSentData,
	TReturnData,
}
