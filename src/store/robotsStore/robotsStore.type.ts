import {
	TContentRobots,
	TContentRobotsPrimitive,
	TRobots,
	TRobotsUpdateReq,
} from '@/services/API/robots/robots.type'

type TParamsRemoveSection = {
	id: number
}

type TParamsUpdateRobots = {
	id: number
	field?: keyof TContentRobots | null
	value: string
	user_agent?: boolean
}
type TParamsRemoveItemContent = {
	id: number
	field: keyof TContentRobotsPrimitive
	value: string
}

///
type TStateRobotsWithId = TRobots & { id: number }

type TRobotsStore = {
	robots: TStateRobotsWithId[]
	setStore: (params: TRobots[]) => void
	getForReq: () => TRobotsUpdateReq[]
	bindActions: {
		addSection: () => void
		removeSection: (params: TParamsRemoveSection) => void
		updateField: (params: TParamsUpdateRobots) => void
		removeItemContentRobots: (params: TParamsRemoveItemContent) => void
	}
}

export type {
	TParamsRemoveItemContent,
	TParamsRemoveSection,
	TParamsUpdateRobots,
	TRobotsStore,
	TStateRobotsWithId,
}
