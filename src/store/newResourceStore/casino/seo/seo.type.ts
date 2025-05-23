import { TCasinoItemRes } from '@/services/API/casino/casino.type'

type TParamsSetData = {
	field: keyof TSeoData
	value: string
}

//
type TSeoData = Pick<
	TCasinoItemRes,
	'meta_title' | 'meta_description' | 'link' | 'name' | 'logo' | 'bind_id'
> &
	Pick<TCasinoItemRes['content']['survey'], 'title' | 'description'>

type TSeoState = {
	seoData: TSeoData
	setSeoData: (params: TParamsSetData) => void
}

export type { TSeoData, TSeoState }
