import { FC, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { P } from '@/libs/UI/CustomTags'
import LabelSvg from '@/_assets/svg/LabelSvg'
import { useGetMe } from '@/services/API/auth/hook'
import { useAuthStore } from '@/store/authStore/authStore'
import s from './Header.module.scss'

const Header: FC = () => {
	const { isAuthenticated, logout, setUser, userInfo } = useAuthStore()
	const navigate = useNavigate()

	const { data: userData, isLoading, isError } = useGetMe(!!isAuthenticated)

	useEffect(() => {
		if (userData) {
			setUser(userData)
		}

		if (isError && !isLoading) {
			logout()
			navigate('/')
		}
	}, [userData, isError, isLoading])

	return (
		<div className={s.header}>
			<div className={s.label}>
				<NavLink to="/">
					<LabelSvg />
				</NavLink>
			</div>
			<div className={s.setting}>
				{/* <div className={s.ch_lang}>tab</div> */}

				{isAuthenticated && userInfo && (
					<div>
						<P size="m">{userInfo.email}</P>
					</div>
				)}
			</div>
		</div>
	)
}
export default Header
