import React, { FC } from 'react'
type TProps = {
	isOpen?: boolean
}
const EyeSvg: FC<TProps> = ({ isOpen = false }) => {
	if (!isOpen) {
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				fill="none"
				viewBox="0 0 24 24"
			>
				<g
					stroke="#B5B5BE"
					strokeLinecap="round"
					strokeWidth="2"
					clipPath="url(#clip0_580_4328)"
				>
					<path
						strokeLinejoin="round"
						d="M10.73 5.073A10.96 10.96 0 0112 5c4.664 0 8.4 2.903 10 7a11.595 11.595 0 01-1.555 2.788M6.52 6.519C4.48 7.764 2.9 9.693 2 12c1.6 4.097 5.336 7 10 7a10.44 10.44 0 005.48-1.52M9.88 9.88a3 3 0 104.243 4.243"
					></path>
					<path d="M4 4l16 16"></path>
				</g>
				<defs>
					<clipPath id="clip0_580_4328">
						<path fill="#fff" d="M0 0H24V24H0z"></path>
					</clipPath>
				</defs>
			</svg>
		)
	}

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			fill="none"
			viewBox="0 0 24 24"
		>
			<g
				stroke="#B5B5BE"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="2"
				clipPath="url(#clip0_193_504)"
			>
				<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
				<path d="M2 12c1.6-4.097 5.336-7 10-7s8.4 2.903 10 7c-1.6 4.097-5.336 7-10 7s-8.4-2.903-10-7z"></path>
			</g>
			<defs>
				<clipPath id="clip0_193_504">
					<path fill="#fff" d="M0 0H24V24H0z"></path>
				</clipPath>
			</defs>
		</svg>
	)
}

export default EyeSvg
