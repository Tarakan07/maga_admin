import ProviderBSvg from '@/_assets/svg/commonData/ProviderBSvg'
import ProviderHeartSvg from '@/_assets/svg/commonData/ProviderHeartSvg'
import { TVolatility } from '@/services/API/slots/slots.type'
import { TCommonData } from '@/store/newResourceStore/slots/common/common.type'

export const data = {
	languageInterfacesData: ['RUS', 'ENG', 'UZB'],
	providersData: [
		{
			id: 1,
			icon: ProviderHeartSvg,
			title: 'firstProvider',
		},
		{
			id: 2,
			icon: ProviderBSvg,
			title: 'secondProvider',
		},
	],
	availablePlatforms: ['PC', 'Смартфоны'],
	additionalFunc: ['Фриспины', 'Символ Wild', 'Символ Scatter', 'Джекпот', 'Бонус-игра', 'Сложенные символы', 'Риск-игра', 'Повторные вращения'],
}

export const volatilityData: TVolatilityKey[] = [
	{ key: 'high', label: 'Высокий', active: false },
	{ key: 'medium', label: 'Средний', active: false },
	{ key: 'low', label: 'Низкий', active: false },
]

export type TVolatilityKey = {
	key: TVolatility
	label: string
	active: boolean
}

type infoFields = {
	placeholder: string
	type: 'number' | 'text'
}

export const infoProps: Record<keyof TCommonData['info'], infoFields> = {
	rtp: {
		placeholder: 'RTP (%)',
		type: 'number',
	},
	cost: {
		placeholder: 'Стоимость монет',
		type: 'text',
	},
	line_bid: {
		placeholder: 'Линейная ставка в монетах',
		type: 'text',
	},
	min_bid: {
		placeholder: 'Минимальная ставка (число)',
		type: 'number',
	},
	max_bid: {
		placeholder: 'Максимальная ставка (число)',
		type: 'number',
	},
	bar_amount: {
		placeholder: 'Кол-во барабанов (число)',
		type: 'number',
	},
	row_amount: {
		placeholder: 'Кол-во рядов (число)',
		type: 'number',
	},
	line_amount: {
		placeholder: 'Кол-во линий (число)',
		type: 'number',
	},
	max_out: {
		placeholder: 'Максимальная выплата (число)',
		type: 'number',
	},
	year: {
		placeholder: 'Дата выхода (число)',
		type: 'number',
	}

}
