import axios from 'axios'
import jsCookie from 'js-cookie'
import { BASE_URL } from '@/constants/api'

const API = axios.create({
	baseURL: BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
})

API.interceptors.request.use(
	(config) => {
		if (jsCookie.get('token')) {
			config.headers['Authorization'] = `${jsCookie.get('token')}`
		}
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

export { API }
