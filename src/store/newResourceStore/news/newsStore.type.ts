import {
	TNewsCreateReq,
	TNewsUpdateReq,
	TSingleNewsRes,
} from '@/services/API/news/news.type'
import { TSeoData } from './seo/seo.type'
import { TBindTransformData } from '../type'
import { TSettingObject } from '../_common/setting/type'
import { IConstructorContentSectionWithId } from '../_common/constructor/types/IConstructorContent'

type TNewsKeysTabs = 'seo' | 'content' | 'tags'
type TNewsDataStore = {
	id?: number
	contentStore: IConstructorContentSectionWithId[]
	seoStore: TSeoData
}

//
type TNewsStorePersist = {
	newsObj: TNewsDataStore
	setting: TSettingObject
}
type TNewsStore = {
	newsObj: TNewsDataStore
	setting: TSettingObject

	bindActionData: {
		updateNewsData: () => void
		loadNewsData: (data?: Partial<TNewsDataStore>) => void
		removeNewsData: () => void
	}

	bindTransformData: TBindTransformData<
		TNewsDataStore,
		TNewsCreateReq | TNewsUpdateReq,
		TSingleNewsRes
	>
}
export type { TNewsDataStore, TNewsKeysTabs, TNewsStore, TNewsStorePersist }
