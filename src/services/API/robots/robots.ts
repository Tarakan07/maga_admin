import { API } from '@/services/helpers'
import { SERVICES } from '@/constants/api'
import { TRobotsUpdateReq, TRobotsGetRes } from './robots.type'

export const getRobots = async (): Promise<TRobotsGetRes> => {
	try {
		const response = await API.get<TRobotsGetRes>(`${SERVICES.robots}`)
		return response.data
	} catch {
		return {
			items: [],
		} as TRobotsGetRes
	}
}

export const createRobots = async (
	params: TRobotsUpdateReq[]
): Promise<TRobotsGetRes> => {
	try {
		const res = await API.post<TRobotsGetRes>(`${SERVICES.robots}/batch`, [
			...params,
		])
		return res.data
	} catch (error) {
		return {
			items: [],
		} as TRobotsGetRes
	}
}
