type TUserInfo = {
	email: string
	roles: string[]
}

type TAuthState = {
	isAuthenticated: boolean | null
	userInfo: TUserInfo | null
	setLogin: (token: string) => void
	setUser: (userData: TUserInfo) => void
	logout: () => void
	checkAuthentication: () => void
}

export type { TUserInfo, TAuthState }
