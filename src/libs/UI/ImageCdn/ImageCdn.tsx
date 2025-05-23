import { FC, useState } from 'react'
import { BASE_CDN_URL } from '@/constants/api'
import NotFound from '@/_assets/images/not-found.jpg'

type TProps = {
	src: string
	alt: string
	onRef?: (img: HTMLImageElement | null) => void
} & React.ImgHTMLAttributes<HTMLImageElement>

const ImageCdn: FC<TProps> = ({ src, alt, onRef, ...props }) => {
	const [isError, setIsError] = useState(false)
	return (
		<img
			ref={(img) => {
				if (onRef) onRef(img)
			}}
			onError={() => setIsError(true)}
			src={isError ? NotFound : `${BASE_CDN_URL}/${src}`}
			alt={alt}
			crossOrigin="anonymous"
			{...props}
		/>
	)
}

export default ImageCdn
