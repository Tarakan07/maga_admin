import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
	TCasinoCreateReq,
	TCasinoUpdateReq,
} from '@/services/API/casino/casino.type'
import { useBonusStore } from './bonuses/bonuses'
import { INIT_SEO_DATA, useSeoStore } from './seo/seo'
import { INIT_COMMON_DATA, useCommonStore } from './common/common'
import {
	INIT_SETTING_DATA,
	useSettingStore,
} from '../_common/setting/settingStore'
import {
	TCasinoDataStore,
	TCasinoStore,
	TCasinoStorePersist,
} from './casinoStore.type'
import {
	INIT_CATEGORIES_DATA,
	useCategoriesStore,
} from '../_common/categories/categoriesStore'
import {
	INIT_CONSTRUCTOR_DATA,
	useConstructorStore,
} from '../_common/constructor/constructorStore'

const INIT_CASINO_OBJECT = {
	id: -1,
	commonStore: INIT_COMMON_DATA,
	bonusStore: '',
	reviewStore: INIT_CONSTRUCTOR_DATA.casino,
	seoStore: INIT_SEO_DATA,
	categories: INIT_CATEGORIES_DATA.bindingCategories,
}
export const useCasinoStore = create<
	TCasinoStore,
	[['zustand/persist', TCasinoStorePersist]]
>(
	persist(
		(set, get) => {
			return {
				casinoObj: {
					id: -1,
					commonStore: useCommonStore.getState().commonData,
					bonusStore: '',
					reviewStore: useConstructorStore.getState().bindStore.casino,
					seoStore: useSeoStore.getState().seoData,
					categories:
						useCategoriesStore.getState().categoriesObj.casino
							.bindingCategories,
				},
				setting: useSettingStore.getState().settingObj.casino,

				bindActionData: {
					updateCasinoData: () => {
						set((state) => ({
							...state,
							casinoObj: {
								...state.casinoObj,
								commonStore: useCommonStore.getState().commonData,
								bonusStore: useBonusStore.getState(),
								reviewStore: useConstructorStore.getState().bindStore.casino,
								seoStore: useSeoStore.getState().seoData,
								categories:
									useCategoriesStore.getState().categoriesObj.casino
										.bindingCategories,
							},
							setting: useSettingStore.getState().settingObj.casino,
						}))
					},
					loadCasinoData: (data) => {
						const storedData: TCasinoStore = {
							...get(),
							casinoObj: {
								...get().casinoObj,
								...data,
							},
						}

						if (storedData?.casinoObj && storedData?.setting) {
							useConstructorStore.setState((state) => ({
								...state,
								bindStore: {
									...INIT_CONSTRUCTOR_DATA,
									casino: storedData.casinoObj.reviewStore,
								},
							}))
							useSeoStore.setState((state) => ({
								...state,
								seoData: {
									...INIT_CASINO_OBJECT.seoStore,
									...storedData.casinoObj.seoStore,
								},
							}))
							useCommonStore.setState((state) => ({
								...state,
								commonData: {
									...INIT_CASINO_OBJECT.commonStore,
									...storedData.casinoObj.commonStore,
								},
							}))
							useCommonStore.setState((state) => ({
								...state,
								commonData: {
									...INIT_CASINO_OBJECT.commonStore,
									...storedData.casinoObj.commonStore,
								},
							}))
							useSettingStore.setState((state) => ({
								settingObj: {
									...state.settingObj,
									casino: {
										...INIT_SETTING_DATA,
										...storedData.setting,
										currentLang: state.settingObj.casino.currentLang,
									},
								},
							}))
							useCategoriesStore.getState().setCategories({
								category: storedData.casinoObj.categories || [],
								resource: 'casino',
							})
							set((state) => ({
								...state,
								setting: storedData.setting,
								casinoObj: {
									...state.casinoObj,
									id: get().casinoObj?.id || -1,
								},
							}))
						}
					},
					removeCasinoData: () => {
						set({
							casinoObj: INIT_CASINO_OBJECT,
							setting: INIT_SETTING_DATA,
						})

						localStorage.removeItem('casino-storage')
					},
				},

				///
				bindTransformData: {
					getDataForRequest: ({ lang, variantRequest = 'ADD' }) => {
						const storedData = get().casinoObj
						let sent_object: TCasinoCreateReq
						let update_object: TCasinoUpdateReq
						sent_object = {
							casino: {
								link: generateLink(storedData.seoStore.link),
								logo: storedData.seoStore.logo,
								name: storedData.seoStore.name,
								meta_title: storedData.seoStore.meta_title,
								meta_description: storedData.seoStore.meta_description,
								...(storedData.seoStore.bind_id !== null &&
									!!storedData.seoStore.bind_id?.length && {
										bind_id: storedData.seoStore.bind_id,
									}),
								bonuses: {
									promo_code: {
										code: storedData.commonStore.promos.promoTitle,
										btn_title: storedData.commonStore.promos.promoDescription,
									},
									referral: {
										url: storedData.commonStore.referral.refUrl,
										btn_title: storedData.commonStore.referral.refBtnTitle,
									},
								},
								languages: storedData.commonStore.selects.languageInterfaces,
								payments: storedData.commonStore.wallets,
								grades: [
									{
										label: 'Надежность',
										count: Number(storedData.commonStore.ratings.reliability),
									},
									{
										label: 'Оценка игроков',
										count: Number(storedData.commonStore.ratings.playerRating),
									},
									{
										label: 'Вывод средств',
										count: Number(storedData.commonStore.ratings.withdrawal),
									},
									{
										label: 'Скорость',
										count: Number(storedData.commonStore.ratings.speed),
									},
								],
								banned_countries:
									storedData.commonStore.selects.blockedCountries,
								content: {
									survey: {
										title: storedData.seoStore.title,
										description: storedData.seoStore.description,
										content: storedData.reviewStore,
									},
									// bonus: "",
									// banned_countries: [""],
									// news: "",
								},
								language: lang,
							},
						}
						if (variantRequest === 'UPDATE') {
							update_object = {
								...sent_object,
								casino: {
									...sent_object.casino,
									id: get().casinoObj.id || -1,
									hidden: get().setting.isHidden,
									language: lang,
								},
							}
							return update_object
						}
						return sent_object
					},
					setDataFromRequest: ({ dataRes }) => {
						let storedData = get().casinoObj
						const current_lang =
							useSettingStore.getState().settingObj.casino.currentLang
						if (dataRes?.id) {
							storedData = {
								seoStore: {
									logo: dataRes?.logo || '',
									name: dataRes?.name || '',
									link: dataRes?.link || '',
									meta_title: dataRes?.meta_title || '',
									meta_description: dataRes?.meta_description || '',
									title: dataRes?.content.survey.title || '',
									description: dataRes?.content.survey.description || '',
									bind_id: !!dataRes?.bind_id?.length ? dataRes?.bind_id : null,
								},
								commonStore: {
									promos: {
										promoTitle: dataRes?.bonuses.promo_code.code || '',
										promoDescription:
											dataRes?.bonuses.promo_code.btn_title || '',
									},
									referral: {
										refUrl: dataRes?.bonuses.referral.url || '',
										refBtnTitle: dataRes?.bonuses.referral.btn_title || '',
									},
									selects: {
										languageInterfaces:
											dataRes?.languages ||
											INIT_CASINO_OBJECT.commonStore.selects.languageInterfaces,
										blockedCountries:
											dataRes?.banned_countries ||
											INIT_CASINO_OBJECT.commonStore.selects.blockedCountries,
									},
									wallets:
										dataRes?.payments || INIT_CASINO_OBJECT.commonStore.wallets,
									ratings: {
										reliability:
											String(
												dataRes?.grades.find(
													(grade) => grade.label === 'Надежность'
												)?.count
											) || '2',
										playerRating:
											String(
												dataRes?.grades.find(
													(grade) => grade.label === 'Оценка игроков'
												)?.count
											) || '2',
										withdrawal:
											String(
												dataRes?.grades.find(
													(grade) => grade.label === 'Вывод средств'
												)?.count
											) || '2',
										speed:
											String(
												dataRes?.grades.find(
													(grade) => grade.label === 'Скорость'
												)?.count
											) || '2',
									},
								},
								reviewStore:
									dataRes?.content.survey.content ||
									INIT_CONSTRUCTOR_DATA.casino,

								bonusStore: useBonusStore.getState(),
							} as TCasinoDataStore
						} else {
							storedData = INIT_CASINO_OBJECT
						}

						set((state) => ({
							...state,
							casinoObj: {
								...storedData,

								id: dataRes?.id || -1,
							},
							setting: {
								...get().setting,
								currentLang: dataRes?.language || current_lang,
								isHidden: dataRes?.hidden !== undefined ? dataRes.hidden : true,
							},
						}))
						get().bindActionData.loadCasinoData()
						return storedData
					},
				},
			}
		},
		{
			name: 'casino-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => {
				return { casinoObj: state.casinoObj, setting: state.setting }
			},
		}
	)
)
