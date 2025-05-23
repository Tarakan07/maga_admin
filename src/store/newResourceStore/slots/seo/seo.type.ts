import { TSlotBody } from '@/services/API/slots/slots.type'

type TParamsSetData = {
	field: keyof TSeoData
	value: string
}

//
type TSeoData = Pick<
	TSlotBody,
	'meta_title' | 'meta_description' | 'link' | 'name' | 'logo' | 'bind_id' | 'demo_link'
>

type TSeoState = {
	seoData: TSeoData
	setSeoData: (params: TParamsSetData) => void
}

export type { TSeoData, TSeoState }
