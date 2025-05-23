import { useEffect, useState } from 'react'
import { useCommonStore } from '@/store/newResourceStore/casino'
import { TParamsAddPaymentsToCasinoReq } from '@/services/API/casino/casino.type'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import { TTypeTagCasinoCommonWallets } from '@/store/newResourceStore/casino/common/common.type'
import {
	useGetAllPaymentsForCasino,
	useUpdatePaymentsForCasinoById,
} from '@/services/API/casino/hook'

export const useFetchConfigPayments = () => {
	const { commonData } = useCommonStore()
	const { mutateAsync: updatePayments } = useUpdatePaymentsForCasinoById()
	const settings = useSettingStore()

	const [allPayments, setAllPayments] = useState<TTypeTagCasinoCommonWallets[]>(
		[]
	)
	const { data: allPaymentsData } = useGetAllPaymentsForCasino({
		lang: settings.getCurrentLang('casino'),
		size: 50,
		page: 1,
	})

	///
	const handleUpdatePayments = async ({
		casino_id,
	}: Pick<TParamsAddPaymentsToCasinoReq, 'casino_id'>) => {
		const data = await updatePayments({
			casino_id,
			ids: [...commonData.wallets.map((payment) => payment.id)],
		})
		return data
	}
	///

	useEffect(() => {
		if (allPaymentsData && allPaymentsData?.items?.length > 0) {
			setAllPayments(allPaymentsData?.items)
		}
	}, [allPaymentsData])

	return { allPayments, handleUpdatePayments }
}
