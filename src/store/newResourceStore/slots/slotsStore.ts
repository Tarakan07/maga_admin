import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useBonusStore } from './bonuses/bonuses'
import { INIT_SEO_DATA, useSeoStore } from './seo/seo'
import { INIT_COMMON_DATA, useCommonStore } from './common/common'
import {
	INIT_SETTING_DATA,
	useSettingStore,
} from '../_common/setting/settingStore'
import {
	TSlotsDataStore,
	TSlotsStore,
	TSlotsStorePersist,
} from './slotsStore.type'
import {
	INIT_CATEGORIES_DATA,
} from '../_common/categories/categoriesStore'
import {
	INIT_CONSTRUCTOR_DATA,
	useConstructorStore,
} from '../_common/constructor/constructorStore'
import { TSlotCreateReq, TSlotUpdateReq } from '@/services/API/slots/slots.type'

const INIT_SLOTS_OBJECT = {
	id: -1,
	commonStore: INIT_COMMON_DATA,
	bonusStore: '',
	reviewStore: INIT_CONSTRUCTOR_DATA.slots,
	seoStore: INIT_SEO_DATA,
	categories: INIT_CATEGORIES_DATA.bindingCategories,
}
export const useSlotsStore = create<
	TSlotsStore,
	[['zustand/persist', TSlotsStorePersist]]
>(
	persist(
		(set, get) => {
			return {
				slotsObj: {
					id: -1,
					commonStore: useCommonStore.getState().commonData,
					bonusStore: '',
					reviewStore: useConstructorStore.getState().bindStore.slots,
					seoStore: useSeoStore.getState().seoData,
					// categories:
					// 	useCategoriesStore.getState().categoriesObj.casino
					// 		.bindingCategories,
				},
				setting: useSettingStore.getState().settingObj.slots,

				bindActionData: {
					updateSlotData: () => {
						set((state) => ({
							...state,
							slotsObj: {
								...state.slotsObj,
								commonStore: useCommonStore.getState().commonData,
								bonusStore: useBonusStore.getState(),
								reviewStore: useConstructorStore.getState().bindStore.slots,
								seoStore: useSeoStore.getState().seoData,
								// categories:
								// 	useCategoriesStore.getState().categoriesObj.casino
								// 		.bindingCategories,
							},
							setting: useSettingStore.getState().settingObj.slots,
						}))
					},
					loadSlotData: (data) => {
						const storedData: TSlotsStore = {
							...get(),
							slotsObj: {
								...get().slotsObj,
								...data,
							},
						}

						if (storedData?.slotsObj && storedData?.setting) {
							useConstructorStore.setState((state) => ({
								...state,
								bindStore: {
									...INIT_CONSTRUCTOR_DATA,
									slots: storedData.slotsObj.reviewStore,
								},
							}))
							useSeoStore.setState((state) => ({
								...state,
								seoData: {
									...INIT_SLOTS_OBJECT.seoStore,
									...storedData.slotsObj.seoStore,
								},
							}))
							useCommonStore.setState((state) => ({
								...state,
								commonData: {
									...INIT_SLOTS_OBJECT.commonStore,
									...storedData.slotsObj.commonStore,
								},
							}))
							useSettingStore.setState((state) => ({
								settingObj: {
									...state.settingObj,
									slots: {
										...INIT_SETTING_DATA,
										...storedData.setting,
										currentLang: state.settingObj.slots.currentLang,
									},
								},
							}))
							// useCategoriesStore.getState().setCategories({
							// 	category: storedData.slotsObj.categories || [],
							// 	resource: 'casino',
							// })
							set((state) => ({
								...state,
								setting: storedData.setting,
								slotsObj: {
									...state.slotsObj,
									id: get().slotsObj?.id || -1,
								},
							}))
						}
					},
					removeSlotData: () => {
						set({
							slotsObj: INIT_SLOTS_OBJECT,
							setting: INIT_SETTING_DATA,
						})

						localStorage.removeItem('slots-storage')
					},
				},

				///
				bindTransformData: {
					getDataForRequest: ({ lang, variantRequest = 'ADD' }) => {
						const storedData = get().slotsObj
						let sent_object: TSlotCreateReq
						let update_object: TSlotUpdateReq
						sent_object = {
							slot: {
								link: generateLink(storedData.seoStore.link),
								demo_link: storedData.seoStore.demo_link,
								logo: storedData.seoStore.logo,
								name: storedData.seoStore.name,
								meta_title: storedData.seoStore.meta_title,
								meta_description: storedData.seoStore.meta_description,
								...(storedData.seoStore.bind_id !== null &&
									!!storedData.seoStore.bind_id?.length && {
										bind_id: storedData.seoStore.bind_id,
									}),
								extra_functions: storedData.commonStore.selects.extra_functions,
								languages: storedData.commonStore.selects.languages,
								platforms: storedData.commonStore.selects.platforms,
								rtp: storedData.commonStore.info.bar_amount,
								bar_amount: storedData.commonStore.info.bar_amount,
								line_amount: storedData.commonStore.info.line_amount,
								line_bid: storedData.commonStore.info.line_bid,
								min_bid: storedData.commonStore.info.min_bid,
								max_bid: storedData.commonStore.info.max_bid,
								max_out: storedData.commonStore.info.max_out,
								row_amount: storedData.commonStore.info.row_amount,
								cost: storedData.commonStore.info.cost,
								year: storedData.commonStore.info.year,
								volatility: storedData.commonStore.volatility,
								genres: storedData.commonStore.genres,
								providers: storedData.commonStore.providers,
								casinos: storedData.commonStore.casinos,
								content: storedData.reviewStore,
								language: lang,
							},
						}
						if (variantRequest === 'UPDATE') {
							update_object = {
								...sent_object,
								slot: {
									...sent_object.slot,
									id: get().slotsObj.id || -1,
									hidden: get().setting.isHidden,
									language: lang,
								},
							}
							return update_object
						}
						return sent_object
					},
					setDataFromRequest: ({ dataRes }) => {
						let storedData = get().slotsObj
						const current_lang =
							useSettingStore.getState().settingObj.slots.currentLang
						if (dataRes?.id) {
							storedData = {
								seoStore: {
									logo: dataRes?.logo || '',
									name: dataRes?.name || '',
									link: dataRes?.link || '',
									meta_title: dataRes?.meta_title || '',
									meta_description: dataRes?.meta_description || '',
									title: dataRes?.name || '',
									bind_id: !!dataRes?.bind_id?.length ? dataRes?.bind_id : null,
									demo_link: dataRes?.demo_link || '',
								},
								commonStore: {
									selects: {
										extra_functions:
											dataRes?.extra_functions ||
											INIT_SLOTS_OBJECT.commonStore.selects.extra_functions,
										languages:
											dataRes?.languages ||
											INIT_SLOTS_OBJECT.commonStore.selects.languages,
										platforms: 
											dataRes?.platforms ||
											INIT_SLOTS_OBJECT.commonStore.selects.platforms,
									},
									providers: 
										dataRes?.providers ||  INIT_SLOTS_OBJECT.commonStore.providers,
									genres: 
										dataRes?.genres || INIT_SLOTS_OBJECT.commonStore.genres,
									casinos:
										dataRes?.casinos || INIT_SLOTS_OBJECT.commonStore.casinos,
									info: {
										bar_amount: 
											dataRes?.bar_amount || INIT_SLOTS_OBJECT.commonStore.info.bar_amount,
										cost: 
											dataRes?.cost || INIT_SLOTS_OBJECT.commonStore.info.cost,
										line_amount: 
											dataRes?.line_amount || INIT_SLOTS_OBJECT.commonStore.info.line_amount,
										line_bid: 
											dataRes?.line_bid || INIT_SLOTS_OBJECT.commonStore.info.line_bid,
										max_bid: 
											dataRes?.max_bid || INIT_SLOTS_OBJECT.commonStore.info.max_bid,
										max_out: 
											dataRes?.max_out || INIT_SLOTS_OBJECT.commonStore.info.max_out,
										min_bid: 
											dataRes?.min_bid || INIT_SLOTS_OBJECT.commonStore.info.min_bid,
										row_amount: 
											dataRes?.row_amount || INIT_SLOTS_OBJECT.commonStore.info.row_amount,
										rtp: 
											dataRes?.rtp || INIT_SLOTS_OBJECT.commonStore.info.rtp,
											year: 
											dataRes?.year || INIT_SLOTS_OBJECT.commonStore.info.year,
										},
										volatility: 
											dataRes?.volatility || INIT_SLOTS_OBJECT.commonStore.volatility,
								},
								reviewStore:
									dataRes?.content ||
									INIT_CONSTRUCTOR_DATA.slots,

								bonusStore: useBonusStore.getState(),
							} as TSlotsDataStore
						} else {
							storedData = INIT_SLOTS_OBJECT
						}

						set((state) => ({
							...state,
							slotsObj: {
								...storedData,

								id: dataRes?.id || -1,
							},
							setting: {
								...get().setting,
								currentLang: dataRes?.language || current_lang,
								isHidden: dataRes?.hidden !== undefined ? dataRes.hidden : true,
							},
						}))
						get().bindActionData.loadSlotData()
						return storedData
					},
				},
			}
		},
		{
			name: 'slots-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => {
				return { slotsObj: state.slotsObj, setting: state.setting }
			},
		}
	)
)
