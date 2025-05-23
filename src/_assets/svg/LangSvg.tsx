import { FC } from 'react'
import { TLangKey } from '@/libs/context/LanguageProvider'
const LangSvg: FC<{ langKey: TLangKey }> = ({ langKey }) => {
	if (langKey === 'ru') return <RuSvg />
	if (langKey === 'en') return <EnSvg />
	return <RuSvg />
}

const RuSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			fill="none"
			viewBox="0 0 26 26"
		>
			<g fillRule="evenodd" clipPath="url(#clip0_222_1674)" clipRule="evenodd">
				<path fill="#F6F6F6" d="M1 1h32v24H1V1z"></path>
				<path fill="#0039A6" d="M1 9h32v16H1V9z"></path>
				<path fill="#D52B1E" d="M1 17h32v8H1v-8z"></path>
			</g>
			<rect width="24" height="24" x="1" y="1" stroke="#2A354D" rx="3.2"></rect>
			<defs>
				<clipPath id="clip0_222_1674">
					<rect width="24" height="24" x="1" y="1" fill="#fff" rx="3.2"></rect>
				</clipPath>
			</defs>
		</svg>
	)
}

const EnSvg = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="26"
			height="26"
			fill="none"
			viewBox="0 0 26 26"
		>
			<g clipPath="url(#clip0_70_1662)">
				<rect
					width="33.6"
					height="24"
					x="-3.8"
					y="1"
					fill="#fff"
					rx="2.4"
				></rect>
				<mask
					id="mask0_70_1662"
					style={{ maskType: 'luminance' }}
					width="34"
					height="24"
					x="-4"
					y="1"
					maskUnits="userSpaceOnUse"
				>
					<rect
						width="33.6"
						height="24"
						x="-3.8"
						y="1"
						fill="#fff"
						rx="2.4"
					></rect>
				</mask>
				<g mask="url(#mask0_70_1662)">
					<path fill="#0A17A7" d="M-3.8 1H29.8V25H-3.8z"></path>
					<path
						fill="#fff"
						fillRule="evenodd"
						d="M-5.339-1.3L9 8.372V-.6h8v8.972L31.339-1.3l1.79 2.653L21.791 9H29.8v8h-8.009l11.337 7.647L31.34 27.3 17 17.628V26.6H9v-8.972L-5.339 27.3l-1.79-2.653L4.209 17H-3.8V9h8.008L-7.128 1.353-5.34-1.3z"
						clipRule="evenodd"
					></path>
					<path
						stroke="#DB1F35"
						strokeLinecap="round"
						strokeWidth="0.8"
						d="M18.602 8.599L33.8-1.4M20.215 17.437L33.84 26.62M5.807 8.573L-8.405-1.005M7.348 17.326L-8.405 27.773"
					></path>
					<path
						fill="#E6273E"
						fillRule="evenodd"
						d="M-3.8 15.4h14.4V25h4.8v-9.6h14.4v-4.8H15.4V1h-4.8v9.6H-3.8v4.8z"
						clipRule="evenodd"
					></path>
				</g>
			</g>
			<rect width="24" height="24" x="1" y="1" stroke="#2A354D" rx="3.2"></rect>
			<defs>
				<clipPath id="clip0_70_1662">
					<rect width="24" height="24" x="1" y="1" fill="#fff" rx="3.2"></rect>
				</clipPath>
			</defs>
		</svg>
	)
}
export default LangSvg
