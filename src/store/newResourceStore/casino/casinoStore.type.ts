import {
	TCasinoCreateReq,
	TCasinoUpdateReq,
	TSingleCasinoRes,
} from '@/services/API/casino/casino.type'
import { TSeoData } from './seo/seo.type'
import { TBindTransformData } from '../type'
import { TCommonData } from './common/common.type'
import { TSettingObject } from '../_common/setting/type'
import { TCategoriesData } from '../_common/categories/type'
import { IConstructorContentSectionWithId } from '../_common/constructor/types/IConstructorContent'

type TCasinoKeysTabs = 'seo' | 'common' | 'review' | 'bonus' | 'category'
//
type TCasinoDataStore = {
	id?: number
	commonStore: TCommonData
	bonusStore: any
	reviewStore: IConstructorContentSectionWithId[]
	seoStore: TSeoData
	categories: TCategoriesData['bindingCategories']
}
//

//
type TCasinoStorePersist = {
	casinoObj: TCasinoDataStore
	setting: TSettingObject
}
type TCasinoStore = {
	casinoObj: TCasinoDataStore
	setting: TSettingObject

	bindActionData: {
		updateCasinoData: () => void
		loadCasinoData: (data?: Partial<TCasinoDataStore>) => void
		removeCasinoData: () => void
	}

	bindTransformData: TBindTransformData<
		TCasinoDataStore,
		TCasinoCreateReq | TCasinoUpdateReq,
		TSingleCasinoRes
	>
}
export type {
	TCasinoDataStore,
	TCasinoKeysTabs,
	TCasinoStore,
	TCasinoStorePersist,
}
