import { create } from 'zustand'
import jsCookie from 'js-cookie'
import { TAuthState, TUserInfo } from './authStore.type'

export const useAuthStore = create<TAuthState>((set) => ({
	isAuthenticated: null,
	userInfo: null,

	setLogin: (token: string) => {
		jsCookie.set('token', token)
		set({ isAuthenticated: true })
	},

	setUser: (userData: TUserInfo) => {
		set({ userInfo: userData })
	},

	logout: () => {
		jsCookie.remove('token')
		set({ isAuthenticated: false, userInfo: null })
	},

	checkAuthentication: () => {
		const token = jsCookie.get('token')
		if (token) {
			set({ isAuthenticated: true })
		} else {
			set({ isAuthenticated: false })
		}
	},
}))
