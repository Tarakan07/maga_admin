import { NavLink } from 'react-router-dom'
import { P } from '@/libs/UI/CustomTags'
import { navigate } from '@/constants/routes'
import s from './Nav.module.scss'

const Nav = () => {
	return (
		<div className={s.wrapNav}>
			<nav>
				<ul>
					{navigate.map((route, index) => {
						return (
							<li key={index}>
								<NavLink
									to={route.link}
									className={({ isActive }) =>
										isActive ? s.isActive.toString() : ''
									}
								>
									{({ isActive }) => {
										const Icon = route.icon
										return (
											<>
												<Icon isActive={isActive} />
												<P size="m">{route.name}</P>
											</>
										)
									}}
								</NavLink>
							</li>
						)
					})}
				</ul>
			</nav>
		</div>
	)
}
export default Nav
