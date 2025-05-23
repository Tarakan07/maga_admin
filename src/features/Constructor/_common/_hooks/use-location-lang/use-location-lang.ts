import { useEffect } from 'react'
import { TVariantResource } from '@/store/newResourceStore/type'
import { TLangKey, VARIATION_LANG } from '@/libs/context/LanguageProvider'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
type TParams = {
	variantResource: TVariantResource
}
const useLocationLang = ({ variantResource }: TParams) => {
	const { updateSetting } = useSettingStore()
	useEffect(() => {
		const getLang = window.location.pathname
			.split('/')
			.slice(-1)[0]
			.toLowerCase() as TLangKey
		if (VARIATION_LANG.includes(getLang)) {
			updateSetting({
				resource: variantResource,
				_key: 'currentLang',
				value: getLang,
			})
		}
	}, [window.location.pathname, variantResource])
}

export default useLocationLang
