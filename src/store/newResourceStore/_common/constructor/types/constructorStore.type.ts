import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { TBindSettingStore } from '../../setting/type'
import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
	TContentTypeKey,
	TContentTypeWithId,
} from './IConstructorContent'

type TBindConstructorStore = {
	[key in TVariantResource]: IConstructorContentSectionWithId[]
}

type TCreateConstructorStore = {
	currentLang: TBindSettingStore
	getCurrentLang: (key: TVariantResource) => TLangKey
	emdeddedStore: {
		emdeddedMovingElement: TEmbeddedContent | null
		receivingElement: IConstructorSectionId | null
		setEmdeddedMovingElement: (params: TEmbeddedContent | null) => void
		setReceivingElement: (params: IConstructorSectionId | null) => void
		emdeddedContent: TEmbeddedContent[]
	}

	bindStore: TBindConstructorStore
	bindActionSection: {
		changeTitleSection: (params: TParamsChangeTitleSection) => void
		addSection: (params: TParamsAddSection) => void
		removeSection: (params: TParamsRemoveSection) => void
		setStore: (params: TParamsSetStore) => void
	}
	bindActionContent: {
		setContent: (params: TParamsSetContent) => void
		addContent: (params: TParamsAddContent) => void
		removeContent: (params: TParamsRemoveContent) => void
		changeContent: (params: TParamsChangeContent) => void
	}
}

//
type TEmbeddedContent = {
	_key: TContentTypeKey
	label: string
}
//
type TParamsAddSection = {
	key: TVariantResource
	defaultContent?: TContentTypeWithId<TContentTypeKey>
}
type TParamsSetStore = {
	key: TVariantResource
	content: IConstructorContentSectionWithId[]
}
type TParamsRemoveSection = {
	key: TVariantResource
	id: IConstructorSectionId
}
type TParamsChangeTitleSection = {
	key: TVariantResource
	id: IConstructorSectionId
	newTitle: string
}
////
type TParamsAddContent = {
	key: TVariantResource
	section_id: IConstructorSectionId
	content: TContentTypeWithId<TContentTypeKey>
	contentBeforeId?: IConstructorSectionId
}
type TParamsRemoveContent = {
	key: TVariantResource
	section_id: IConstructorSectionId
	id: IConstructorSectionId
}

type TParamsSetContent = {
	key: TVariantResource
	section_id: IConstructorSectionId
	content: TContentTypeWithId<TContentTypeKey>[]
}
type TParamsChangeContent = {
	key: TVariantResource
	section_id: IConstructorSectionId
	id: IConstructorSectionId
	content: TContentTypeWithId<TContentTypeKey>
}
export type {
	TBindConstructorStore,
	//
	TCreateConstructorStore,
	//
	TEmbeddedContent,
	//
	TParamsAddContent,
	TParamsAddSection,
	TParamsChangeContent,
	TParamsChangeTitleSection,
	TParamsRemoveContent,
	TParamsRemoveSection,
	TParamsSetContent,
	TParamsSetStore,
}
