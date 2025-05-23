import React from 'react'
import { TPropsNavSvg } from './type'

const RobotsSvg = ({ isActive }: TPropsNavSvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M12 8V4H8M18 8H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zM2 14h2M20 14h2M15 13v2M9 13v2"
			></path>
		</svg>
	)
}

export default RobotsSvg
