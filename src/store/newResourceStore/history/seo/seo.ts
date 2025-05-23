import { create } from 'zustand'
import { THistoryData, TSeoState } from './seo.type'
export const INIT_HISTORY_DATA = {
	bonuses: {
		promo_code: {
			code: '',
		},
		referral: {
			url: '',
		},
	},
	link: '',
	color: '',
	preview_image: '',
	image: '',
	name: '',
	text: '',
} as THistoryData

export const useSeoStore = create<TSeoState>((set) => ({
	seoData: INIT_HISTORY_DATA,
	setSeoData: ({ field, value }) =>
		set((state) => {
			return {
				seoData: {
					...state.seoData,
					[field]: value,
				},
			}
		}),
	setSeoBonuses: ({ field, value }) =>
		set((state) => {
			return {
				seoData: {
					...state.seoData,
					bonuses: {
						...state.seoData.bonuses,
						[field]: {
							...state.seoData.bonuses[field],
							...value,
						},
					},
				},
			}
		}),
}))
