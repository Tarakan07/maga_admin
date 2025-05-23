type TStatusSelectorKey = 'all' | 'active' | 'inactive'
type TStatusSelector = {
	key: TStatusSelectorKey
	label: string
	active: boolean
}

type TPublicatedSelectorKey = 'all-publicated' | 'publicated' | 'not-publicated'
type TPublicatedSelector = {
	key: TPublicatedSelectorKey
	label: string
	active: boolean
}

type TKeySelectorName = 'status' | 'publicated'

type TAscDescKey = 'ASC' | 'DESC'

export type {
	TStatusSelector,
	TStatusSelectorKey,
	TPublicatedSelector,
	TPublicatedSelectorKey,
	TAscDescKey,
	TKeySelectorName,
}
