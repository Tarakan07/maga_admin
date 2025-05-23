import {
	THistoryCreateReq,
	THistoryUpdateReq,
	TSingleHistoryRes,
} from '@/services/API/history/history.type'
import { TBindTransformData } from '../type'
import { THistoryData } from './seo/seo.type'
import { TSettingObject } from '../_common/setting/type'

//
type THistoryStorePersist = {
	id?: number
	historyData: THistoryData

	setting: TSettingObject
}
type THistoryStore = {
	id?: number
	historyData: THistoryData

	setting: TSettingObject

	bindActionData: {
		updateHistoryData: () => void
		loadHistoryData: () => void
		removeHistoryData: () => void
	}
	bindTransformData: TBindTransformData<
		THistoryData,
		THistoryCreateReq | THistoryUpdateReq,
		TSingleHistoryRes
	>
}
export type { THistoryData, THistoryStore, THistoryStorePersist }
