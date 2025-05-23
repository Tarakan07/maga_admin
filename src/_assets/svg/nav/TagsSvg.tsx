import * as React from 'react'
import { TPropsNavSvg } from './type'

const TagsSvg = ({ isActive }: TPropsNavSvg) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		fill="none"
		viewBox="0 0 20 20"
	>
		<g
			stroke={!isActive ? '#9C9DA9' : '#2ABE42'}
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth="2"
			clipPath="url(#clip0_890_8468)"
		>
			<path d="M10.489 2.155a1.67 1.67 0 0 0-1.179-.488H3.334a1.667 1.667 0 0 0-1.667 1.667V9.31c0 .442.176.866.488 1.179l7.254 7.253a2.02 2.02 0 0 0 2.85 0l5.483-5.483a2.02 2.02 0 0 0 0-2.85z"></path>
			<path
				fill="#9C9DA9"
				d="M6.25 6.666a.417.417 0 1 0 0-.833.417.417 0 0 0 0 .833"
			></path>
		</g>
		<defs>
			<clipPath id="clip0_890_8468">
				<path fill="#fff" d="M0 0h20v20H0z"></path>
			</clipPath>
		</defs>
	</svg>
)

export default TagsSvg
