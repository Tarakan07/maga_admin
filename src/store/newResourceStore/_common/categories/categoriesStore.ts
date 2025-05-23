import { create } from 'zustand'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import { TVariantResource } from '../../type'
import { useConstructorStore } from '../constructor/constructorStore'
import {
	TCategoriesData,
	TCategoriesStore,
	TParamsUpdateCategories,
} from './type'

export type TCategoriesKeysTabs = 'seo' | 'review' | 'relations'

export const INIT_CATEGORIES_DATA: TCategoriesData = {
	allCategories: [],
	bindingCategories: [],
}

export const useCategoriesStore = create<TCategoriesStore>((set, get) => ({
	categoriesObj: {
		articles: INIT_CATEGORIES_DATA,
		casino: INIT_CATEGORIES_DATA,
		slots: INIT_CATEGORIES_DATA,
		news: INIT_CATEGORIES_DATA,
		history: INIT_CATEGORIES_DATA,
		category: INIT_CATEGORIES_DATA,
		providers: INIT_CATEGORIES_DATA,
	},
	getCategoryWithClear: ({ resource }: { resource: TVariantResource }) => {
		const state = get()
		set((state) => ({
			...state,
			categoriesObj: {
				...state.categoriesObj,
				[resource]: {
					...state.categoriesObj[resource],
					bindingCategories: INIT_CATEGORIES_DATA.bindingCategories,
				},
			},
		}))
		return state.categoriesObj[resource]
	},
	updateCategories: ({ resource, value }: TParamsUpdateCategories) => {
		return set((state) => {
			return {
				...state,
				categoriesObj: {
					...state.categoriesObj,
					[resource]: {
						...state.categoriesObj[resource],
						allCategories: value,
					},
				},
			}
		})
	},
	getConcatArrayCategories: ({ value }) => {
		const array = value.reduce((items: TCategoriesRes[], el) => {
			const getAllItems = (el: TCategoriesRes) => {
				let array = [el]
				if (el.children && Array.isArray(el.children)) {
					el.children.forEach((child: TCategoriesRes) => {
						array = array.concat(getAllItems(child))
					})
				}
				return array
			}

			return items.concat(getAllItems(el))
		}, [])
		return array
	},
	setCategories: ({ resource, category }) => {
		return set((state) => {
			const bindingCategoriesMap = new Map(
				state.categoriesObj[resource].bindingCategories.map((cat) => [
					cat.id,
					cat,
				])
			)

			if (Array.isArray(category)) {
				const categoryLocalArray = get().getConcatArrayCategories({
					value: category,
				})
				categoryLocalArray.forEach((cat) =>
					bindingCategoriesMap.set(cat.id, cat)
				)
			} else {
				const categoryLocal = category
				bindingCategoriesMap.set(categoryLocal.id, categoryLocal)

				if (categoryLocal.children?.length) {
					get()
						.getConcatArrayCategories({ value: categoryLocal.children })
						.forEach((child) => bindingCategoriesMap.set(child.id, child))
				} else if (categoryLocal.parent_id) {
					const parent = get()
						.getConcatArrayCategories({
							value: get().categoriesObj[resource].allCategories,
						})
						.find((e) => e.id === categoryLocal.parent_id)
					if (parent) {
						bindingCategoriesMap.set(parent.id, parent)
					}
				}
			}

			return {
				...state,
				categoriesObj: {
					...state.categoriesObj,
					[resource]: {
						...state.categoriesObj[resource],
						bindingCategories: Array.from(bindingCategoriesMap.values()),
					},
				},
			}
		})
	},

	deleteCategories: ({ category, resource }) => {
		return set((state) => {
			const bindingCategoriesMap = new Map(
				state.categoriesObj[resource].bindingCategories.map((cat) => [
					cat.id,
					cat,
				])
			)

			if (Array.isArray(category)) {
				const categoryLocalArray = get().getConcatArrayCategories({
					value: category,
				})
				categoryLocalArray.forEach((cat) => bindingCategoriesMap.delete(cat.id))
			} else {
				const categoryLocal = category
				bindingCategoriesMap.delete(categoryLocal.id)

				if (categoryLocal.children?.length) {
					get()
						.getConcatArrayCategories({ value: categoryLocal.children })
						.forEach((child) => bindingCategoriesMap.delete(child.id))
				} else if (categoryLocal.parent_id) {
					const parent = get()
						.getConcatArrayCategories({
							value: get().categoriesObj[resource].allCategories,
						})
						.find((e) => e.id === categoryLocal.parent_id)
					if (parent) {
						const allChildCategoriesOfParent = get().getConcatArrayCategories({
							value: parent.children,
						})
						const hasAddedChild = allChildCategoriesOfParent.some((e) =>
							bindingCategoriesMap.has(e.id)
						)
						if (!hasAddedChild) {
							bindingCategoriesMap.delete(parent.id)
						}
					}
				}
			}

			return {
				...state,
				categoriesObj: {
					...state.categoriesObj,
					[resource]: {
						...state.categoriesObj[resource],
						bindingCategories: Array.from(bindingCategoriesMap.values()),
					},
				},
			}
		})
	},

	loadCategoryData: (data) => {
		useConstructorStore.setState((state) => ({
			...state,
			bindStore: {
				...state.bindStore,
				category: data?.translations?.content || [],
			},
		}))
	},
}))
