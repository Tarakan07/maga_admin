type TTabItem<T> = { key: T; label: string; isActive: boolean }
type TParamsChangeTab<T> = T
type TTabsProps<T> = {
	data: TTabItem<T>[]
	callback: (params: TParamsChangeTab<T>) => void
	saveData: () => void
}
export type { TTabsProps, TTabItem, TParamsChangeTab }
