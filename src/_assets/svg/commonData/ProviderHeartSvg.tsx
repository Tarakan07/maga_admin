import React from 'react'

function ProviderHeartSvg() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="18"
			height="18"
			fill="none"
			viewBox="0 0 18 18"
		>
			<path fill="url(#pattern0_225_11097)" d="M0 0H18V18H0z"></path>
			<defs>
				<pattern
					id="pattern0_225_11097"
					width="1"
					height="1"
					patternContentUnits="objectBoundingBox"
				>
					<use transform="scale(.02273)" xlinkHref="#image0_225_11097"></use>
				</pattern>
				<image
					id="image0_225_11097"
					width="44"
					height="44"
					xlinkHref="data:image/png;base64,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"
				></image>
			</defs>
		</svg>
	)
}

export default ProviderHeartSvg
