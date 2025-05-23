import { SERVICES } from '@/constants/api'
import { TSignInRequest } from './auth.type'
import { API } from '../../helpers/conf-axios'

export const loginRequest = async (data: TSignInRequest) => {
	try {
		const response = await API.post(`${SERVICES.auth}/login`, data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		return response
	} catch {
		throw new Error('auth error')
	}
}

export const getMe = async () => {
	try {
		const response = await API.get(`v1/users/me`)
		return response.data
	} catch {
		throw new Error('getme error')
	}
}
