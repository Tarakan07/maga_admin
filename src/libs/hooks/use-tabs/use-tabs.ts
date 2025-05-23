import { useState } from 'react'
import { TParamsChangeTab, TTabItem } from '@/components/Tabs/type'

const useTabs = <T>(data: TTabItem<T>[]) => {
	const [tabs, setTabs] = useState<TTabItem<T>[]>(data)
	const activeTab: TTabItem<T> = tabs.find((e) => e.isActive)!
	const changeTabs = (key: TParamsChangeTab<T>) => {
		setTabs((prev) => {
			const findIndex = prev.findIndex((e) => e.key === key)
			if (prev[findIndex].isActive) return prev
			const clearArray = [...prev].map((e) => ({ ...e, isActive: false }))
			return [
				...clearArray.slice(0, findIndex),
				{ ...clearArray[findIndex], isActive: true },
				...clearArray.slice(findIndex + 1),
			]
		})
	}
	return { tabs, activeTab, changeTabs }
}

export default useTabs
