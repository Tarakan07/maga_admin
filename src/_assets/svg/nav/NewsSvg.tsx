import React from 'react'
import { TPropsNavSvg } from './type'

const NewsSvg = ({ isActive }: TPropsNavSvg) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g
				stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				clipPath="url(#clip0_619_7904)"
			>
				<path d="M3 4v14a2 2 0 002 2h14a2 2 0 002-2V8h-4"></path>
				<path d="M3 4h14v14a2 2 0 002 2v0M13 8H7M13 12H9"></path>
			</g>
			<defs>
				<clipPath id="clip0_619_7904">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	)
}

export default NewsSvg
