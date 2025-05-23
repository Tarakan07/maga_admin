import React from 'react'
import { TPropsNavSvg } from './type'

const ArticlesSvg = ({ isActive }: TPropsNavSvg) => {
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
				d="M9 21h6M12 3a6 6 0 00-5.019 9.29c.954 1.452 1.43 2.178 1.493 2.286.55.965.449.625.518 1.734.008.124.008.313.008.69a1 1 0 001 1h4a1 1 0 001-1c0-.377 0-.566.008-.69.07-1.11-.033-.769.518-1.734.062-.108.54-.834 1.493-2.287A6 6 0 0012 3z"
			></path>
		</svg>
	)
}

export default ArticlesSvg
