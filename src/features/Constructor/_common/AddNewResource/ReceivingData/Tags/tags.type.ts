import { TLangKey } from '@/libs/context/LanguageProvider'

type TTypeTag = {
	language: TLangKey
	id: number
	title: string
}

type TParamsSetTags = {
	field: 'tags'
	tag: TTypeTag
}

export type { TTypeTag, TParamsSetTags }
