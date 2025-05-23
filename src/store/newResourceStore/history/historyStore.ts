import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
	THistoryCreateReq,
	THistoryUpdateReq,
} from '@/services/API/history/history.type'
import { INIT_HISTORY_DATA, useSeoStore } from './seo/seo'
import { THistoryStore, THistoryStorePersist } from './history.type'
import {
	INIT_SETTING_DATA,
	useSettingStore,
} from '../_common/setting/settingStore'

export const useHistoryStore = create<
	THistoryStore,
	[['zustand/persist', THistoryStorePersist]]
>(
	persist(
		(set, get) => ({
			id: -1,
			historyData: useSeoStore.getState().seoData,
			setting: useSettingStore.getState().settingObj.history,

			bindActionData: {
				updateHistoryData: () => {
					set((state) => ({
						...state,
						historyData: useSeoStore.getState().seoData,
						setting: useSettingStore.getState().settingObj.history,
					}))
				},
				loadHistoryData: () => {
					const storedData = get()

					if (storedData?.historyData && storedData?.setting) {
						useSeoStore.setState((state) => ({
							...state,
							seoData: {
								...INIT_HISTORY_DATA,
								...storedData?.historyData,
							},
						}))
						useSettingStore.setState((state) => ({
							settingObj: {
								...state.settingObj,
								history: {
									...INIT_SETTING_DATA,
									...storedData.setting,
									currentLang: state.settingObj.history.currentLang,
								},
							},
						}))
						set((state) => ({
							...state,
							historyData: storedData.historyData,
							setting: storedData.setting,
						}))
					}
				},
				removeHistoryData: () => {
					set({
						historyData: INIT_HISTORY_DATA,
						setting: INIT_SETTING_DATA,
					})
					localStorage.removeItem('history-storage')
				},
			},
			bindTransformData: {
				getDataForRequest: ({ lang, variantRequest = 'ADD' }) => {
					const storedData = get().historyData
					let sent_object: THistoryCreateReq
					let update_object: THistoryUpdateReq
					sent_object = {
						story: {
							publish_at: get().setting.publish_at,
							name: storedData.name,
							text: storedData.text,
							image: storedData.image,
							color: storedData.color,
							preview_image: storedData.preview_image,
							bonuses: {
								promo_code: {
									code: storedData.bonuses.promo_code.code,
								},
								referral: {
									url: storedData.bonuses.referral.url,
								},
							},
							link: storedData.link,
							language: lang,
						},
					}

					if (variantRequest === 'UPDATE') {
						update_object = {
							...sent_object,
							story: {
								...sent_object.story,
								id: get().id || -1,
								hidden: get().setting.isHidden,
							},
						}
						return update_object
					}

					return sent_object
				},
				setDataFromRequest: ({ dataRes }) => {
					let storedData = get().historyData
					const current_lang =
						useSettingStore.getState().settingObj.history.currentLang
					storedData = {
						color: dataRes?.color || '',
						link: dataRes?.link || '',
						preview_image: dataRes?.preview_image || '',
						bonuses: {
							promo_code: {
								code: dataRes?.bonuses.promo_code.code || '',
							},
							referral: {
								url: dataRes?.bonuses.referral.url || '',
							},
						},
						name: dataRes?.name || '',
						text: dataRes?.text || '',
						image: dataRes?.image || '',
					}

					set((state) => ({
						...state,
						id: dataRes?.id || -1,
						historyData: {
							...storedData,
						},
						setting: {
							...get().setting,
							currentLang: dataRes?.language || current_lang,
							isHidden: dataRes?.hidden !== undefined ? dataRes.hidden : true,

							publish_at:
								dataRes?.publish_at || String(new Date().toISOString()),
						},
					}))
					get().bindActionData.loadHistoryData()
					return storedData
				},
			},

			///
		}),
		{
			name: 'history-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => {
				return {
					id: state?.id || -1,
					historyData: state.historyData,
					setting: state.setting,
				}
			},
		}
	)
)
