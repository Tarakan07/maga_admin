import {
	TAscDescKey,
	TPublicatedSelectorKey,
	TStatusSelectorKey,
} from '@/features/Constructor/_common/PanelLightSetting/type'

type TFilterContextProps = {
	filters: TFilterState
	isThrow: boolean
	reset: () => void
	onChangeFilter: (params: TFilterProps) => void
	filterSelectors: (params: TFilterSelectorProps) => void
}

type TFilterState = {
	order_side: TAscDescKey
	show?: 'ALL' | 'HIDDEN' | 'NOT_HIDDEN'
	search?: string
	publication_status?: 'ALL' | 'PUBLISHED' | 'DRAFT'
	from_date?: string | null
	to_date?: string | null
}

type TFilterKey = keyof TFilterState

type TFilterProps = {
	value: TFilterState[TFilterKey]
	key: TFilterKey
}

type TFilterSelectorProps = {
	keyValue: TStatusSelectorKey | TPublicatedSelectorKey | Date[]
	keyType: TFilterSelectorKey
}

type TFilterSelectorKey = 'status' | 'publicated' | 'calendar'

export type {
	TFilterContextProps,
	TFilterState,
	TFilterKey,
	TFilterProps,
	TFilterSelectorKey,
}
