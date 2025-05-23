import { TNewsItemRes, TTypeTagNews } from '@/services/API/news/news.type'

//

type TParamsSetData = {
	field: keyof TSeoData
	value: string
}

type TParamsSetNewsTags = {
	field: keyof TSeoData
	tag: TTypeTagNews
}
//
type TSeoData = Pick<
	TNewsItemRes,
	| 'color'
	| 'banner'
	| 'meta_title'
	| 'meta_description'
	| 'bind_id'
	| 'title'
	| 'link'
	| 'description'
	| 'tags'
>

type TSeoState = {
	seoData: TSeoData
	setSeoData: (params: TParamsSetData) => void
	setTags: (params: TParamsSetNewsTags) => void
}

export type { TSeoData, TSeoState, TTypeTagNews, TParamsSetNewsTags }
