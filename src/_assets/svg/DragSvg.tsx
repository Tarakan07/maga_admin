import React, { FC } from 'react'

const DragSvg: FC<{ color?: string }> = ({ color = 'var(--casino-white)' }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<path
				stroke={color}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				d="M14 18a1 1 0 102 0 1 1 0 00-2 0zM8 18a1 1 0 102 0 1 1 0 00-2 0zM14 12a1 1 0 102 0 1 1 0 00-2 0zM8 12a1 1 0 102 0 1 1 0 00-2 0zM14 6a1 1 0 102 0 1 1 0 00-2 0zM8 6a1 1 0 102 0 1 1 0 00-2 0z"
			></path>
		</svg>
	)
}

export default DragSvg
