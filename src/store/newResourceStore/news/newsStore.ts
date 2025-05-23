import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { createJSONStorage, persist } from 'zustand/middleware'
import { TNewsCreateReq, TNewsUpdateReq } from '@/services/API/news/news.type'
import { INIT_SEO_DATA, useSeoStore } from './seo/seo'
import { TNewsDataStore, TNewsStore, TNewsStorePersist } from './newsStore.type'
import {
	INIT_SETTING_DATA,
	useSettingStore,
} from '../_common/setting/settingStore'
import {
	INIT_CONSTRUCTOR_DATA,
	useConstructorStore,
} from '../_common/constructor/constructorStore'

const INIT_NEWS_OBJECT = {
	id: -1,
	seoStore: INIT_SEO_DATA,
	contentStore: INIT_CONSTRUCTOR_DATA.news,
}
export const useNewsStore = create<
	TNewsStore,
	[['zustand/persist', TNewsStorePersist]]
>(
	persist(
		(set, get) => {
			return {
				newsObj: {
					id: -1,
					seoStore: useSeoStore.getState().seoData,
					contentStore: useConstructorStore.getState().bindStore.news,
				},
				setting: useSettingStore.getState().settingObj.news,

				bindActionData: {
					updateNewsData: () => {
						set((state) => ({
							...state,
							newsObj: {
								...state.newsObj,
								contentStore: useConstructorStore.getState().bindStore.news,
								seoStore: useSeoStore.getState().seoData,
							},
							setting: useSettingStore.getState().settingObj.news,
						}))
					},
					loadNewsData: (data) => {
						const storedData: TNewsStore = {
							...get(),
							newsObj: {
								...get().newsObj,
								...data,
							},
						}

						if (storedData?.newsObj && storedData?.setting) {
							useConstructorStore.setState((state) => ({
								...state,
								bindStore: {
									...INIT_CONSTRUCTOR_DATA,
									news: storedData.newsObj.contentStore,
								},
							}))
							useSeoStore.setState((state) => ({
								...state,
								seoData: {
									...INIT_NEWS_OBJECT.seoStore,
									...storedData.newsObj.seoStore,
								},
							}))

							useSettingStore.setState((state) => ({
								settingObj: {
									...state.settingObj,
									news: {
										...INIT_SETTING_DATA,
										...storedData.setting,
										currentLang: state.settingObj.news.currentLang,
									},
								},
							}))
							set((state) => ({
								...state,
								setting: storedData.setting,
								newsObj: {
									...state.newsObj,
									id: get().newsObj?.id || -1,
								},
							}))
						}
					},
					removeNewsData: () => {
						set({
							newsObj: INIT_NEWS_OBJECT,
							setting: INIT_SETTING_DATA,
						})
						localStorage.removeItem('news-storage')
					},
				},
				bindTransformData: {
					getDataForRequest: ({ lang, variantRequest = 'ADD' }) => {
						const storedData = get().newsObj
						let sent_object: TNewsCreateReq
						let update_object: TNewsUpdateReq
						sent_object = {
							news: {
								publish_at: get().setting.publish_at,
								link: generateLink(storedData.seoStore.link),
								title: storedData.seoStore.title,
								meta_title: storedData.seoStore.meta_title,
								meta_description: storedData.seoStore.meta_description,
								...(storedData.seoStore.bind_id !== null &&
									!!storedData.seoStore.bind_id?.length && {
										bind_id: storedData.seoStore.bind_id,
									}),
								tags: storedData.seoStore.tags,
								banner: storedData.seoStore.banner,
								btn_url: '',
								color: storedData.seoStore.color,
								description: storedData.seoStore.description,
								content: storedData.contentStore,
								language: lang,
							},
						}
						if (variantRequest === 'UPDATE') {
							update_object = {
								...sent_object,
								news: {
									...sent_object.news,
									id: get().newsObj.id || -1,
									hidden: get().setting.isHidden,
								},
							}

							return update_object
						}
						return sent_object
					},
					setDataFromRequest: ({ dataRes }) => {
						let storedData = get().newsObj
						const current_lang =
							useSettingStore.getState().settingObj.news.currentLang

						storedData = {
							seoStore: {
								color: dataRes?.color || '',
								banner: dataRes?.banner || '',
								description: dataRes?.description || '',
								tags: dataRes?.tags || INIT_SEO_DATA.tags,
								title: dataRes?.title || '',
								meta_title: dataRes?.meta_title || '',
								meta_description: dataRes?.meta_description || '',
								bind_id: !!dataRes?.bind_id?.length ? dataRes?.bind_id : null,
								link: dataRes?.link || '',
							},
							contentStore: dataRes?.content || INIT_CONSTRUCTOR_DATA.news,
						} as TNewsDataStore

						set((state) => ({
							...state,
							newsObj: {
								...storedData,
								id: dataRes?.id || -1,
							},
							setting: {
								...get().setting,
								currentLang: dataRes?.language || current_lang,
								isHidden: dataRes?.hidden !== undefined ? dataRes.hidden : true,

								publish_at:
									dataRes?.publish_at || String(new Date().toISOString()),
							},
						}))
						get().bindActionData.loadNewsData()
						return storedData
					},
				},
			}
		},
		{
			name: 'news-storage',

			storage: createJSONStorage(() => localStorage),

			partialize: (state) => {
				return { newsObj: state.newsObj, setting: state.setting }
			},
		}
	)
)
