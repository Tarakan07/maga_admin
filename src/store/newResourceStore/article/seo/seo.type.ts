import {
	TArticlesItemRes,
	TTypeTagArticle,
} from '@/services/API/articles/articles.type'

//

type TParamsSetData = {
	field: keyof TSeoData
	value: string
}

type TParamsSetArticlesTags = {
	field: keyof TSeoData
	tag: TTypeTagArticle
}
//
type TSeoData = Pick<
	TArticlesItemRes,
	| 'meta_title'
	| 'meta_description'
	| 'title'
	| 'link'
	| 'description'
	| 'tags'
	| 'color'
	| 'btn_url'
	| 'bind_id'
	| 'banner'
>

type TSeoState = {
	seoData: TSeoData
	setSeoData: (params: TParamsSetData) => void
	setTags: (params: TParamsSetArticlesTags) => void
}

export type { TParamsSetArticlesTags, TSeoData, TSeoState, TTypeTagArticle }
