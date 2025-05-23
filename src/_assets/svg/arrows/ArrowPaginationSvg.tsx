import React, { FC } from 'react'

const ArrowPaginationSvg: FC<{ isInactive: boolean }> = ({ isInactive }) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g
				stroke={!isInactive ? '#fff' : 'var(--casino-dark-grey)'}
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				clipPath="url(#clip0_188_6155)"
			>
				<path d="M14 7l-5 5M9 12l5 5"></path>
			</g>
			<defs>
				<clipPath id="clip0_188_6155">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	)
}

export default ArrowPaginationSvg
