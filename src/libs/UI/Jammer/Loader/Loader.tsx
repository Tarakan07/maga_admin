import React, { FC } from 'react'
import { CirclesProps, CirclesWithBar } from 'react-loader-spinner'
import s from './Loader.module.scss'
type TProps = {
	params: CirclesProps
}
const Loader: FC<TProps> = ({ params }) => {
	return (
		<div className={s.wrap}>
			<CirclesWithBar
				height="100"
				width="100"
				color="#4fa94d"
				outerCircleColor="#4fa94d"
				innerCircleColor="#4fa94d"
				barColor="#4fa94d"
				ariaLabel="circles-with-bar-loading"
				wrapperStyle={{}}
				wrapperClass=""
				{...params}
			/>
		</div>
	)
}

export default Loader
