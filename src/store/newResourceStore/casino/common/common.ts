import { create } from 'zustand'
import { TCommonState } from './common.type'
export const INIT_COMMON_DATA = {
	ratings: {
		reliability: '2',
		withdrawal: '2',
		speed: '2',
		playerRating: '2',
	},
	selects: {
		blockedCountries: [],
		languageInterfaces: [],
	},
	wallets: [],

	promos: {
		promoTitle: '11',
		promoDescription: '12',
	},
	referral: {
		refUrl: '12',
		refBtnTitle: '123',
	},
}
export const useCommonStore = create<TCommonState>((set) => ({
	commonData: INIT_COMMON_DATA,
	setRatings: ({ field, value }) =>
		set((state) => ({
			commonData: {
				...state.commonData,
				ratings: {
					...state.commonData.ratings,
					[field]: value,
				},
			},
		})),
	setWallets: ({ field, value }) =>
		set((state) => {
			const findIndex = state.commonData.wallets.findIndex(
				(e) => e.id === value.id
			)
			if (findIndex > -1) {
				return {
					commonData: {
						...state.commonData,
						wallets: [
							...state.commonData.wallets.slice(0, findIndex),
							...state.commonData.wallets.slice(findIndex + 1),
						],
					},
				}
			} else {
				return {
					commonData: {
						...state.commonData,
						wallets: [
							...state.commonData.wallets,
							{
								title: value.title,
								icon: value.icon,
								id: value.id,
							},
						],
					},
				}
			}
		}),
	setSelects: (field, value) =>
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
	setPromos: (field, value) =>
		set((state) => ({
			commonData: {
				...state.commonData,
				promos: {
					...state.commonData.promos,
					[field]: value,
				},
			},
		})),
	setReferral: (field, value) =>
		set((state) => ({
			commonData: {
				...state.commonData,
				referral: {
					...state.commonData.referral,
					[field]: value,
				},
			},
		})),
	// //SetProviders, SetSlots, SetWallets в одну функцию
	// setProviders: ({ value }) =>
	// 	set((state) => {
	// 		const findIndex = state.commonData.providers.findIndex(
	// 			(e) => e.id === value.id
	// 		)
	// 		if (findIndex > -1) {
	// 			return {
	// 				commonData: {
	// 					...state.commonData,
	// 					providers: [
	// 						...state.commonData.providers.slice(0, findIndex),
	// 						...state.commonData.providers.slice(findIndex + 1),
	// 					],
	// 				},
	// 			}
	// 		} else {
	// 			return {
	// 				commonData: {
	// 					...state.commonData,
	// 					providers: [
	// 						...state.commonData.providers,
	// 						{
	// 							...value
	// 							// hidden: value.hidden,
	// 							// title: value.title,
	// 							// link: value.link,
	// 							// translations: value.translations,
	// 							// id: value.id,
	// 						},
	// 					],
	// 				},
	// 			}
	// 		}
	// 	}),
	// setSlots: ({ value }) =>
	// 	set((state) => {
	// 		const findIndex = state.commonData.slots.findIndex(
	// 			(e) => e.id === value.id
	// 		)
	// 		if (findIndex > -1) {
	// 			return {
	// 				commonData: {
	// 					...state.commonData,
	// 					slots: [
	// 						...state.commonData.slots.slice(0, findIndex),
	// 						...state.commonData.slots.slice(findIndex + 1),
	// 					],
	// 				},
	// 			}
	// 		} else {
	// 			return {
	// 				commonData: {
	// 					...state.commonData,
	// 					slots: [
	// 						...state.commonData.slots,
	// 						{
	// 							...value
	// 						},
	// 					],
	// 				},
	// 			}
	// 		}
	// 	}),
}))
