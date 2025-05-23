import { TPublicatedSelector, TStatusSelector } from './type'

export const statusData: TStatusSelector[] = [
	{ key: 'all', label: 'Все', active: false },
	{ key: 'active', label: 'Активый', active: false },
	{ key: 'inactive', label: 'Не активный', active: false },
]

export const publicatedData: TPublicatedSelector[] = [
	{ key: 'all-publicated', label: 'Все', active: false },
	{ key: 'publicated', label: 'Опубликованы', active: false },
	{ key: 'not-publicated', label: 'Не опубликованы', active: false },
]
