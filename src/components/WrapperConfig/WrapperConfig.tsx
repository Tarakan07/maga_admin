import { Outlet } from 'react-router-dom'
import Nav from './Nav/Nav'
import s from './WrapperConfig.module.scss'

const WrapperConfig = () => {
	return (
		<div className={s.wrapper}>
			<Nav />
			<div style={{ flex: 1 }}>
				<Outlet />
			</div>
		</div>
	)
}
export default WrapperConfig
