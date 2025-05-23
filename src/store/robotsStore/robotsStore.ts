import { create } from 'zustand'
import { TRobotsUpdateReq } from '@/services/API/robots/robots.type'
import { TRobotsStore, TStateRobotsWithId } from './robotsStore.type'
export const INIT_ROBOTS: TStateRobotsWithId = {
	id: 0,
	user_agent: '',
	content: {
		Disallow: [],
		Allow: [],
		'Clean-param': '',
		Sitemap: '',
	},
}
export const useRobotsStore = create<TRobotsStore>((set, get) => ({
	robots: [INIT_ROBOTS],
	setStore: (params) =>
		set((state) => {
			if (!!!params.length) {
				return {
					...state,
				}
			}

			const forStore: TStateRobotsWithId[] = params.map((item, index) => {
				return {
					id: index + 1,
					content: item.content,
					user_agent: item.user_agent,
				}
			})
			return {
				robots: forStore,
			}
		}),
	getForReq: () => {
		const robots = get().robots
		const newArray = robots.map((item) => {
			const newItem: TRobotsUpdateReq = {
				content: item.content,
				user_agent: item.user_agent,
			}
			return newItem
		})
		return newArray
	},
	bindActions: {
		addSection: () =>
			set((state) => {
				return {
					robots: [...state.robots, { ...INIT_ROBOTS, id: Number(new Date()) }],
				}
			}),
		removeSection: ({ id }) =>
			set((state) => {
				const findIndex = state.robots.findIndex((e) => e.id === id)
				return {
					robots: [
						...state.robots.slice(0, findIndex),
						...state.robots.slice(findIndex + 1),
					],
				}
			}),

		updateField: ({ id, field, user_agent = false, value }) =>
			set((state) => {
				const robots = state.robots
				const findIndex = robots.findIndex((e) => e.id === id)
				if (user_agent) {
					return {
						robots: [
							...robots.slice(0, findIndex),
							{
								...robots[findIndex],
								user_agent: value,
							},
							...robots.slice(findIndex + 1),
						],
					}
				}
				if (field) {
					const findEl = robots[findIndex].content[field]
					if (Array.isArray(findEl)) {
						const newArray = [...findEl, value]
						return {
							robots: [
								...robots.slice(0, findIndex),
								{
									...robots[findIndex],
									content: {
										...robots[findIndex].content,
										[field]: newArray,
									},
								},
								...robots.slice(findIndex + 1),
							],
						}
					}
					if (typeof findEl === 'string') {
						return {
							robots: [
								...robots.slice(0, findIndex),
								{
									...robots[findIndex],
									content: {
										...robots[findIndex].content,
										[field]: value,
									},
								},
								...robots.slice(findIndex + 1),
							],
						}
					}
				}
				return state
			}),
		removeItemContentRobots: ({ id, field, value }) =>
			set((state) => {
				const findIndex = state.robots.findIndex((e) => e.id === id)
				const itemReplace = state.robots[findIndex].content[field]
				const findIndexItem = itemReplace.findIndex((e) => e === value)
				return {
					robots: [
						...state.robots.slice(0, findIndex),
						{
							...state.robots[findIndex],
							content: {
								...state.robots[findIndex].content,
								[field]: [
									...itemReplace.slice(0, findIndexItem),
									...itemReplace.slice(findIndexItem + 1),
								],
							},
						},
						...state.robots.slice(findIndex + 1),
					],
				}
			}),
	},
}))
