import { create } from 'zustand'
import { useSettingStore } from '../setting/settingStore'
import { TCreateConstructorStore } from './types/constructorStore.type'
import { IConstructorContentSectionWithId } from './types/IConstructorContent'
export const INIT_CONSTRUCTOR_DATA = {
	casino: [],
	slots: [],
	news: [],
	articles: [],
	history: [],
	category: [],
	providers: [],
}
export const useConstructorStore = create<TCreateConstructorStore>(
	(set, get) => ({
		currentLang: useSettingStore.getState().settingObj,
		getCurrentLang: (key) => {
			const settings = useSettingStore.getState().settingObj[key]
			return settings.currentLang
		},
		emdeddedStore: {
			emdeddedMovingElement: null,
			receivingElement: null,
			setEmdeddedMovingElement: (element) =>
				set((state) => ({
					...state,
					emdeddedStore: {
						...state.emdeddedStore,
						emdeddedMovingElement: element,
					},
				})),
			setReceivingElement: (element) =>
				set((state) => ({
					...state,
					emdeddedStore: {
						...state.emdeddedStore,
						receivingElement: element,
					},
				})),
			emdeddedContent: [
				{ _key: 'defaultText', label: 'Текст' },
				{ _key: 'bigImage', label: 'Картинка' },
				{ _key: 'rowImages', label: '2 картинки' },
				{ _key: 'prosAndCons', label: '“+” и “-”' },
				{ _key: 'list', label: 'Cписок' },
				{ _key: 'quote', label: 'Цитата' },
				{ _key: 'table', label: 'Таблица' },
				{ _key: 'tableMultiple', label: 'Col*Row' },
				{ _key: 'rowImageText', label: 'Текст+Фото' },
				{ _key: 'contentHTML', label: 'Гибкий текст' },
				{ _key: 'faq', label: 'FAQ' },
			],
		},

		bindStore: INIT_CONSTRUCTOR_DATA,
		bindActionSection: {
			setStore: ({ key, content }) =>
				set((state) => {
					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: content,
						},
					}
				}),
			changeTitleSection: ({ key, id, newTitle }) =>
				set((state) => {
					const sectionIndex = state.bindStore[key].findIndex(
						(e) => e.id === id
					)
					if (sectionIndex === -1) return state
					const updatedSections = [
						...state.bindStore[key].slice(0, sectionIndex),
						{
							...state.bindStore[key][sectionIndex],
							title: newTitle,
						},
						...state.bindStore[key].slice(sectionIndex + 1),
					]

					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: updatedSections,
						},
					}
				}),
			addSection: ({ key, defaultContent }) =>
				set((state) => {
					const newSection = {
						id: Number(new Date()),
						title: '',
						content: defaultContent
							? [
									{
										...defaultContent,
										id: Number(new Date()),
										contentType: defaultContent.contentType,
									},
								]
							: [],
					} as IConstructorContentSectionWithId
					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: [...state.bindStore[key], newSection],
						},
					}
				}),
			removeSection: ({ id, key }) =>
				set((state) => {
					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: state.bindStore[key].filter(
								(item: IConstructorContentSectionWithId) => item.id !== id
							),
						},
					}
				}),
		},
		bindActionContent: {
			setContent: ({ key, content, section_id }) =>
				set((state) => {
					const findIndexSection = state.bindStore[key].findIndex(
						(e) => e.id === section_id
					)
					const currentSection = state.bindStore[key][findIndexSection]

					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: [
								...state.bindStore[key].slice(0, findIndexSection),
								{
									...currentSection,
									content,
								},
								...state.bindStore[key].slice(findIndexSection + 1),
							],
						},
					}
				}),
			addContent: ({ key, section_id, content, contentBeforeId = -1 }) =>
				set((state) => {
					const findIndexSection = state.bindStore[key].findIndex(
						(e) => e.id === section_id
					)
					const currentSection = state.bindStore[key][findIndexSection]
					const currentContent = currentSection.content

					const findIndexContentBefore = currentContent.findIndex(
						(e) => e.id === contentBeforeId
					)
					let newContent
					if (findIndexContentBefore > -1) {
						newContent = [
							...currentContent.slice(0, findIndexContentBefore + 1),
							content,
							...currentContent.slice(findIndexContentBefore + 1),
						]
					} else {
						newContent = [...currentContent, content]
					}
					const replaceEmpty = newContent.filter((e) => e.id !== -1)
					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: [
								...state.bindStore[key].slice(0, findIndexSection),
								{
									...currentSection,
									content: replaceEmpty,
								},
								...state.bindStore[key].slice(findIndexSection + 1),
							],
						},
					}
				}),
			removeContent: ({ key, section_id, id }) =>
				set((state) => {
					const findIndexSection = state.bindStore[key].findIndex(
						(e) => e.id === section_id
					)
					const currentSection = state.bindStore[key][findIndexSection]
					const findIndexContent = currentSection.content.findIndex(
						(e) => e.id === id
					)

					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: [
								...state.bindStore[key].slice(0, findIndexSection),
								{
									...currentSection,
									content: [
										...currentSection.content.slice(0, findIndexContent),
										...currentSection.content.slice(findIndexContent + 1),
									],
								},
								...state.bindStore[key].slice(findIndexSection + 1),
							],
						},
					}
				}),
			changeContent: ({ key, section_id, id, content }) =>
				set((state) => {
					const findIndexSection = state.bindStore[key].findIndex(
						(e) => e.id === section_id
					)
					const currentSection = state.bindStore[key][findIndexSection]
					const findIndexContent = currentSection.content.findIndex(
						(e) => e.id === id
					)

					return {
						...state,
						bindStore: {
							...state.bindStore,
							[key]: [
								...state.bindStore[key].slice(0, findIndexSection),
								{
									...currentSection,
									content: [
										...currentSection.content.slice(0, findIndexContent),
										content,
										...currentSection.content.slice(findIndexContent + 1),
									],
								},
								...state.bindStore[key].slice(findIndexSection + 1),
							],
						},
					}
				}),
		},
	})
)
