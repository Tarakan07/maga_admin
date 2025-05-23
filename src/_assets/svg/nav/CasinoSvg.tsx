import React from 'react'
import { TPropsNavSvg } from './type'

function CasinoSvg({ isActive }: TPropsNavSvg) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<rect
				width="7"
				height="7"
				x="3.5"
				y="4"
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeWidth="2"
				rx="2.5"
			></rect>
			<rect
				width="7"
				height="7"
				x="3.5"
				y="14"
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeWidth="2"
				rx="2.5"
			></rect>
			<rect
				width="7"
				height="7"
				x="13.5"
				y="4"
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeWidth="2"
				rx="2.5"
			></rect>
			<rect
				width="7"
				height="7"
				x="13.5"
				y="14"
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeWidth="2"
				rx="2.5"
			></rect>
		</svg>
	)
}

export default CasinoSvg
