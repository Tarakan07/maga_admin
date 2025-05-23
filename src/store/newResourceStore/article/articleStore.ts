import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { createJSONStorage, persist } from 'zustand/middleware'
import {
	TArticleCreateReq,
	TArticleUpdateReq,
} from '@/services/API/articles/articles.type'
import { INIT_SEO_DATA, useSeoStore } from './seo/seo'
import {
	INIT_SETTING_DATA,
	useSettingStore,
} from '../_common/setting/settingStore'
import {
	TArticleDataStore,
	TArticleStore,
	TArticleStorePersist,
} from './articleStore.type'
import {
	INIT_CONSTRUCTOR_DATA,
	useConstructorStore,
} from '../_common/constructor/constructorStore'

export const useArticleStore = create<
	TArticleStore,
	[['zustand/persist', TArticleStorePersist]]
>(
	persist(
		(set, get) => ({
			articleObj: {
				id: -1,
				seoStore: useSeoStore.getState().seoData,
				contentStore: useConstructorStore.getState().bindStore.articles,
			},
			setting: useSettingStore.getState().settingObj.articles,

			bindActionData: {
				updateArticleData: () => {
					set((state) => ({
						...state,
						articleObj: {
							...state.articleObj,
							contentStore: useConstructorStore.getState().bindStore.articles,
							seoStore: useSeoStore.getState().seoData,
						},
						setting: useSettingStore.getState().settingObj.articles,
					}))
				},
				loadArticleData: (data) => {
					const storedData: TArticleStore = {
						...get(),
						articleObj: {
							...get().articleObj,
							...data,
						},
					}

					if (storedData?.articleObj && storedData?.setting) {
						useConstructorStore.setState((state) => ({
							...state,
							bindStore: {
								...INIT_CONSTRUCTOR_DATA,
								articles: storedData.articleObj.contentStore,
							},
						}))
						useSeoStore.setState((state) => ({
							...state,
							seoData: {
								...INIT_SEO_DATA,
								...storedData.articleObj.seoStore,
							},
						}))
						useSettingStore.setState((state) => ({
							settingObj: {
								...state.settingObj,
								articles: {
									...INIT_SETTING_DATA,
									...storedData.setting,
									currentLang: state.settingObj.articles.currentLang,
								},
							},
						}))
						set((state) => ({
							...state,
							setting: storedData.setting,
							articleObj: {
								...state.articleObj,
								id: get().articleObj?.id || -1,
							},
						}))
					}
				},
				removeArticleData: () => {
					set((state) => ({
						articleObj: {
							contentStore: INIT_CONSTRUCTOR_DATA.articles,
							seoStore: INIT_SEO_DATA,
						},
						setting: INIT_SETTING_DATA,
					}))
					localStorage.removeItem('article-storage')
				},
			},
			bindTransformData: {
				getDataForRequest: ({ lang, variantRequest = 'ADD' }) => {
					const storedData = get().articleObj
					let sent_object: TArticleCreateReq
					let update_object: TArticleUpdateReq
					sent_object = {
						article: {
							publish_at: get().setting.publish_at,
							title: storedData.seoStore.title,
							meta_title: storedData.seoStore.meta_title,
							meta_description: storedData.seoStore.meta_description,
							tags: storedData.seoStore.tags,
							banner: storedData.seoStore.banner,
							color: storedData.seoStore.color,
							link: generateLink(storedData.seoStore.link),
							btn_url: storedData.seoStore.btn_url,
							...(storedData.seoStore.bind_id !== null &&
								!!storedData.seoStore.bind_id?.length && {
									bind_id: storedData.seoStore.bind_id,
								}),
							description: storedData.seoStore.description,
							content: storedData.contentStore,
							language: lang,
						},
					}
					if (variantRequest === 'UPDATE') {
						update_object = {
							...sent_object,
							article: {
								...sent_object.article,
								id: get().articleObj.id || -1,
								hidden: get().setting.isHidden,
							},
						}
						return update_object
					}

					return sent_object
				},
				setDataFromRequest: ({ dataRes }) => {
					let storedData = get().articleObj
					const current_lang =
						useSettingStore.getState().settingObj.articles.currentLang

					storedData = {
						seoStore: {
							btn_url: dataRes?.btn_url || '',
							bind_id: !!dataRes?.bind_id?.length ? dataRes?.bind_id : null,
							banner: dataRes?.banner || '',
							color: dataRes?.color || '',
							title: dataRes?.title || '',
							meta_title: dataRes?.meta_title || '',
							meta_description: dataRes?.meta_description || '',
							tags: dataRes?.tags || INIT_SEO_DATA.tags,
							description: dataRes?.description || '',
							link: dataRes?.link || '',
						},
						contentStore: dataRes?.content || INIT_CONSTRUCTOR_DATA.articles,
					} as TArticleDataStore

					set((state) => ({
						...state,
						articleObj: {
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
					get().bindActionData.loadArticleData()
					return storedData
				},
			},
		}),
		{
			name: 'article-storage',
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => {
				return { articleObj: state.articleObj, setting: state.setting }
			},
		}
	)
)
