import React, { FC } from 'react'

const ProsAndConsSvg: FC<{ isPros: boolean }> = ({ isPros }) => {
	return <>{isPros ? <ProsSvg /> : <ConsSvg />}</>
}
const ProsSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			viewBox="0 0 20 20"
		>
			<rect
				width="20"
				height="20"
				fill="url(#paint0_radial_196_6779)"
				fillOpacity="0.1"
				rx="10"
			></rect>
			<path
				stroke="#2ABE42"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.25"
				d="M6.5 10l2.475 2.475 4.95-4.95"
			></path>
			<defs>
				<radialGradient
					id="paint0_radial_196_6779"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="translate(10.052 10.222) scale(20.9424)"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#2ABE42"></stop>
					<stop offset="1" stopColor="#fff"></stop>
				</radialGradient>
			</defs>
		</svg>
	)
}
const ConsSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			fill="none"
			viewBox="0 0 20 20"
		>
			<rect
				width="20"
				height="20"
				fill="url(#paint0_radial_196_6798)"
				fillOpacity="0.1"
				rx="10"
			></rect>
			<path
				stroke="#FF4141"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth="1.25"
				d="M7.223 7.222l5.555 5.555m-5.555 0l5.555-5.555"
			></path>
			<defs>
				<radialGradient
					id="paint0_radial_196_6798"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="translate(10.052 10.222) scale(20.9424)"
					gradientUnits="userSpaceOnUse"
				>
					<stop stopColor="#BE2A2A"></stop>
					<stop offset="1" stopColor="#fff"></stop>
				</radialGradient>
			</defs>
		</svg>
	)
}
export default ProsAndConsSvg
