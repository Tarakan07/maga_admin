import { create } from 'zustand'
import { TCommonData, TCommonState } from './common.type'
export const INIT_COMMON_DATA: TCommonData = {
	info: {
		rtp: 0,
		bar_amount: 0,
		max_bid: 0,
		min_bid: 0,
		max_out: 0,
		row_amount: 0,
		line_amount: 0,
		year: 0,
		cost: '',
		line_bid: '',
	},
	volatility: null,
	selects: {
		languages: [],
		platforms: [],
		extra_functions: [],
	},
	genres: [],
	providers: [],
	casinos: []
}
export const useCommonStore = create<TCommonState>((set) => ({
	commonData: INIT_COMMON_DATA,
	setInfo: ({ field, value }) =>
		set((state) => ({
			commonData: {
				...state.commonData,
				info: {
					...state.commonData.info,
					[field]: value,
				},
			},
		})),
	setGenres: ({ value }) =>
		set((state) => {
	 		const findIndex = state.commonData.genres.findIndex((e) => e.id === value.id);
			 if (findIndex > -1) {
				return {
					commonData: {
						...state.commonData,
						genres: [
							...state.commonData.genres.slice(0, findIndex),
							...state.commonData.genres.slice(findIndex + 1),
						],
					},
				}
			} else {
				return {
					commonData: {
						...state.commonData,
						genres: [
							...state.commonData.genres,
							{
								...value,
							},
						],
					},
				}
			}
    }),
	setProviders: ({ value }) =>
		set((state) => {
	 		const findIndex = state.commonData.providers.findIndex((e) => e.id === value.id);
			 if (findIndex > -1) {
				return {
					commonData: {
						...state.commonData,
						providers: [
							...state.commonData.providers.slice(0, findIndex),
							...state.commonData.providers.slice(findIndex + 1),
						],
					},
				}
			} else {
				return {
					commonData: {
						...state.commonData,
						providers: [
							...state.commonData.providers,
							{
								hidden: value.hidden,
								title: value.title,
								link: value.link,
								translations: value.translations,
								id: value.id,
							},
						],
					},
				}
			}
    }),
	setCasinos: ({ value }) =>
		set((state) => {
	 		const findIndex = state.commonData.casinos.findIndex((e) => e.id === value.id);
			 if (findIndex > -1) {
				return {
					commonData: {
						...state.commonData,
						casinos: [
							...state.commonData.casinos.slice(0, findIndex),
							...state.commonData.casinos.slice(findIndex + 1),
						],
					},
				}
			} else {
				return {
					commonData: {
						...state.commonData,
						casinos: [
							...state.commonData.casinos,
							{
								...value,
							},
						],
					},
				}
			}
    }),
	setSelects: ({field, value}) =>
		set((state) => {
			const newSelect = state.commonData.selects[field].includes(value)
				? [...state.commonData.selects[field].filter((item) => item !== value)]
				: [...state.commonData.selects[field], value]

			return {
				commonData: {
					...state.commonData,
					selects: {
						...state.commonData.selects,
						[field]: newSelect,
					},
				},
			}
		}),
	setVolatility: ({value}) =>
		set((state) => ({
			commonData: {
				...state.commonData,
				volatility: value
			},
		})),
}))
