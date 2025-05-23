import { NavLink, Outlet } from 'react-router-dom'

const Dashboard = () => {
	return (
		<div>
			<h2>Личный кабинет</h2>
			<nav>
				<ul>
					<li>
						<NavLink
							to="profile"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
							})}
						>
							Профиль
						</NavLink>
					</li>
					<li>
						<NavLink
							to="casino"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
							})}
						>
							Казино
						</NavLink>
					</li>
					<li>
						<NavLink
							to="news"
							style={({ isActive }) => ({
								fontWeight: isActive ? 'bold' : 'normal',
							})}
						>
							Новости
						</NavLink>
					</li>
				</ul>
			</nav>

			{/* Здесь отображаются дочерние маршруты */}
			<Outlet />
		</div>
	)
}

export default Dashboard
