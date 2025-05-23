import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TLangKey } from '@/libs/context/LanguageProvider'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { TParamsManipulationData, TReturnData } from './type'

export const useManipulationData = <T, To_Ser, From_Ser>(
	params: TParamsManipulationData<T, To_Ser, From_Ser>
): TReturnData<To_Ser> => {
	const {
		bindActionData,
		copyArray,
		bindTransformData,
		editFor,
		editingData,
		variantResource,
	} = params
	const settings = useSettingStore()
	const navigate = useNavigate()
	const handleCopyStore = async () => {
		if (!!JSON.stringify({ ...copyArray }).length)
			await navigator.clipboard.writeText(JSON.stringify({ ...copyArray }))
	}

	const handleLocalLoadData = () => {
		return bindActionData?.loadLocalData({ isDelete: false })
	}
	const handleLocalRemove = () => {
		bindActionData?.removeLocalData()
		bindActionData?.loadLocalData({
			isDelete: true,
		})
		bindActionData.updateLocalData()
		// navigate(-1)
		// if (editFor === 'DELETE') navigate(-1)
		if (editFor === 'UPDATE') navigate(-1)
	}
	//

	const handleSentData = (lang: TLangKey) => {
		const sent = bindTransformData.getDataForRequest({
			lang,
			variantRequest: editFor,
		})

		return {
			sentData: sent,
			clear: handleLocalRemove,
		}
	}

	////
	useEffect(() => {
		if (editingData?.data) {
			bindTransformData.setDataFromRequest({
				dataRes: editingData.data,
			})
		}
	}, [editingData, settings.getCurrentLang(variantResource)])

	useEffect(() => {
		if (editFor === 'ADD') {
			// handleLocalRemove()
			bindActionData?.loadLocalData({ isDelete: false })
		}
	}, [])

	return {
		handleCopyStore,
		handleLocalRemove,
		handleSentData,
		handleLocalLoadData,
	}
}
