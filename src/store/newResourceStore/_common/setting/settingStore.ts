import { create } from 'zustand'
import { TSettingStore, TSettingObject } from './type'

export const INIT_SETTING_DATA: TSettingObject = {
	isHidden: true,
	isCanSent: false,
	currentLang: 'ru',
	publish_at: String(new Date().toISOString()),
}

export const useSettingStore = create<TSettingStore>((set, get) => ({
	settingObj: {
		articles: INIT_SETTING_DATA,
		casino: INIT_SETTING_DATA,
		slots: INIT_SETTING_DATA,
		history: INIT_SETTING_DATA,
		news: INIT_SETTING_DATA,
		category: INIT_SETTING_DATA,
		providers: INIT_SETTING_DATA,
	},
	getCurrentLang: (_key) => {
		return get().settingObj[_key].currentLang
	},
	updateSetting: ({ _key, resource, value }) => {
		return set((state) => ({
			...state,
			settingObj: {
				...state.settingObj,
				[resource]: {
					...state.settingObj[resource],
					[_key]: value,
				},
			},
		}))
	},
}))
