import {
	TArticleCreateReq,
	TArticleUpdateReq,
	TSingleArticleRes,
} from '@/services/API/articles/articles.type'
import { TSeoData } from './seo/seo.type'
import { TBindTransformData } from '../type'
import { TSettingObject } from '../_common/setting/type'
import { IConstructorContentSectionWithId } from '../_common/constructor/types/IConstructorContent'

type TArticleKeysTabs = 'seo' | 'content' | 'tags'
type TArticleDataStore = {
	id?: number
	contentStore: IConstructorContentSectionWithId[]
	seoStore: TSeoData
}

//

//
type TArticleStorePersist = {
	articleObj: TArticleDataStore
	setting: TSettingObject
}
type TArticleStore = {
	articleObj: TArticleDataStore
	setting: TSettingObject

	bindActionData: {
		updateArticleData: () => void
		loadArticleData: (data?: Partial<TArticleDataStore>) => void
		removeArticleData: () => void
	}
	bindTransformData: TBindTransformData<
		TArticleDataStore,
		TArticleCreateReq | TArticleUpdateReq,
		TSingleArticleRes
	>
}
export type {
	TArticleStorePersist,
	TArticleDataStore,
	TArticleKeysTabs,
	TArticleStore,
}
