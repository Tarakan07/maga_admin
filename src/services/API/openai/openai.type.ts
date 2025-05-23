type TParamsGetTopicsReq = {
	topic_status: TTopicStatus
	page: number
	size: number
	all: boolean
}

type TTopicsRes = {
	items: TTopicItem[]
	total: number
	page: number
	size: number
	pages: number
}

type TTopicStatus = 'USED' | 'NOT_USED'

type TTopicItem = {
	topic: string
	status: TTopicStatus
}

export type { TParamsGetTopicsReq, TTopicsRes }

///
type TParamsUpdateTopicsReq = {
	topics: TTopicItem[]
}

export type { TParamsUpdateTopicsReq, TTopicItem, TTopicStatus }
