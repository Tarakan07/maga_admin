import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '../../type'

type TSettingObject = {
	isHidden: boolean
	isCanSent: boolean
	currentLang: TLangKey
	publish_at: string
}
type TBindSettingStore = {
	[key in TVariantResource]: TSettingObject
}

type TParamsUpdateSetting<K extends keyof TSettingObject> = {
	_key: K
	resource: TVariantResource
	value: TSettingObject[K]
}

type TSettingStore = {
	settingObj: TBindSettingStore
	getCurrentLang: (params: TVariantResource) => TLangKey
	updateSetting: <T extends keyof TSettingObject>(
		params: TParamsUpdateSetting<T>
	) => void
}

export type {
	TSettingStore,
	TSettingObject,
	TParamsUpdateSetting,
	TBindSettingStore,
}
