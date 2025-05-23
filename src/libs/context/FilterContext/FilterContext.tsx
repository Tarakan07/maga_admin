import React, {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from 'react'
import {
	TPublicatedSelectorKey,
	TStatusSelectorKey,
} from '@/features/Constructor/_common/PanelLightSetting/type'
import {
	TFilterContextProps,
	TFilterProps,
	TFilterSelectorKey,
	TFilterState,
} from './type'

export const INIT_FILTER: TFilterState = {
	order_side: 'DESC',
	show: 'ALL',
}
export type TFilterContext = TFilterContextProps
export const FilterContext = createContext<TFilterContext>({} as TFilterContext)
export const useFilter = () => {
	const context = useContext<TFilterContext>(FilterContext)
	return context
}

export const FilterProvider: FC<PropsWithChildren> = ({ children }) => {
	const [filters, setFilters] = useState<TFilterState>(INIT_FILTER)
	const [isThrow, setIsThrow] = useState<boolean>(false)
	const [isShowSelected, setIsShowSelected] = useState<boolean>(false)

	const onChangeFilter = React.useCallback(({ value, key }: TFilterProps) => {
		setFilters((prevFilters) => {
			if (value === null || value === '') {
				const updatedFilters = Object.fromEntries(
					Object.entries(prevFilters).filter(([k]) => k !== key)
				) as TFilterState

				return updatedFilters
			}
			return { ...prevFilters, [key]: value }
		})
	}, [])

	const reset = React.useCallback(() => {
		filters.search
			? setFilters({ ...INIT_FILTER, search: filters.search })
			: setFilters({ ...INIT_FILTER })
		setIsShowSelected(false)
	}, [filters.search])

	useEffect(() => {
		;(Object.keys(filters).length > 2 &&
			!Object.keys(filters).includes('search')) ||
		Object.keys(filters).length > 3 ||
		isShowSelected
			? setIsThrow(true)
			: setIsThrow(false)
	}, [filters])

	const filterSelectors = ({
		keyValue,
		keyType,
	}: {
		keyValue: TStatusSelectorKey | TPublicatedSelectorKey | Date[] | string
		keyType: TFilterSelectorKey
	}) => {
		switch (keyType) {
			case 'status':
				switch (keyValue) {
					case 'active':
						onChangeFilter({ key: 'show', value: 'NOT_HIDDEN' })
						break
					case 'inactive':
						onChangeFilter({ key: 'show', value: 'HIDDEN' })
						break
					case 'all':
						onChangeFilter({ key: 'show', value: 'ALL' })
						break
				}
				setIsShowSelected(true)
				break
			case 'publicated':
				switch (keyValue) {
					case 'publicated':
						onChangeFilter({ key: 'publication_status', value: 'PUBLISHED' })
						break
					case 'not-publicated':
						onChangeFilter({ key: 'publication_status', value: 'DRAFT' })
						break
					case 'all-publicated':
						onChangeFilter({ key: 'publication_status', value: 'ALL' })
						break
				}
				break
			case 'calendar':
				if (keyValue.length > 1) {
					const selected = keyValue as Date[]
					onChangeFilter({
						key: 'from_date',
						value: selected[0].toISOString().split('T')[0],
					})
					onChangeFilter({
						key: 'to_date',
						value: selected[1].toISOString().split('T')[0],
					})
				} else {
					onChangeFilter({ key: 'from_date', value: null })
					onChangeFilter({ key: 'to_date', value: null })
				}
				break
		}
	}

	const values = {
		filters,
		isThrow,
		reset,
		onChangeFilter,
		filterSelectors,
	}

	return (
		<FilterContext.Provider value={values}>{children}</FilterContext.Provider>
	)
}
