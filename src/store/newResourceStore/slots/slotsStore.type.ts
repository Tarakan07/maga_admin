import { TSeoData } from './seo/seo.type'
import { TBindTransformData } from '../type'
import { TCommonData } from './common/common.type'
import { TSettingObject } from '../_common/setting/type'
import { IConstructorContentSectionWithId } from '../_common/constructor/types/IConstructorContent'
import { TSingleSlotRes, TSlotCreateReq, TSlotUpdateReq } from '@/services/API/slots/slots.type'

type TSlotsKeysTabs = 'seo' | 'common' | 'review' | 'provider' 
//
type TSlotsDataStore = {
	id?: number
	commonStore: TCommonData
	bonusStore: any
	reviewStore: IConstructorContentSectionWithId[]
	seoStore: TSeoData
	// categories: TCategoriesData['bindingCategories']
}
//

//
type TSlotsStorePersist = {
	slotsObj: TSlotsDataStore
	setting: TSettingObject
}
type TSlotsStore = {
	slotsObj: TSlotsDataStore
	setting: TSettingObject

	bindActionData: {
		updateSlotData: () => void
		loadSlotData: (data?: Partial<TSlotsDataStore>) => void
		removeSlotData: () => void
	}

	bindTransformData: TBindTransformData<
		TSlotsDataStore,
		TSlotCreateReq | TSlotUpdateReq,
		TSingleSlotRes
	>
}
export type {
	TSlotsDataStore,
	TSlotsKeysTabs,
	TSlotsStore,
	TSlotsStorePersist,
}
