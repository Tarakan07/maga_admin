import { FC, useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop'
import { Button, P } from '@/libs/UI/CustomTags'
import ImageCdn from '@/libs/UI/ImageCdn/ImageCdn'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { base64ToBlob } from '@/libs/utils/base64ToBlob'
import s from './CropModalUpdate.module.scss'
type CropModalProps = {
	fileURL: string
	handleCompleteCrop: (croppedFile: File) => void
	cropConfig: { width: number; height: number }
}
const CropModalUpdate: FC<CropModalProps> = ({
	cropConfig,
	fileURL,
	handleCompleteCrop,
}) => {
	const [crop, setCrop] = useState<Crop>()
	const { closeModal } = useModal()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
	const [cropSize, setCropSize] = useState(cropConfig)

	let imageRef = useRef<HTMLImageElement | null>(null)
	useEffect(() => {
		if (imageRef.current) {
			const { naturalWidth, naturalHeight, width, height } = imageRef.current

			setCropSize((prev) => {
				if (height <= cropConfig.height || width <= cropConfig.width) {
					const diff = cropConfig.height / height - cropConfig.width / width
					const decimal = cropConfig.width / cropConfig.height
					if (diff >= 0) {
						return {
							height: height,
							width: height * decimal,
						}
					} else {
						return {
							height: width / decimal,
							width: width,
						}
					}
				}
				return prev
			})
		}
	}, [imageRef.current, cropConfig])
	//

	const onComplete = async () => {
		if (imageRef.current && completedCrop) {
			try {
				const croppedImageUrl = await getCroppedImg(
					imageRef.current,
					completedCrop
				)
				const blob = base64ToBlob(croppedImageUrl, 'image/png')

				const file = new File([blob], 'lalaal.png', { type: 'image/png' })
				handleCompleteCrop(file)
			} catch (error) {
				console.error('Error cropping image:', error)
			}
		}
	}

	const getCroppedImg = (
		image: HTMLImageElement,
		crop: PixelCrop
	): Promise<string> => {
		const canvas = document.createElement('canvas')
		const scaleX = image.naturalWidth / image.width
		const scaleY = image.naturalHeight / image.height

		canvas.width = crop.width
		canvas.height = crop.height
		const ctx = canvas.getContext('2d')

		if (!ctx) {
			throw new Error('No 2D context')
		}

		ctx.drawImage(
			image,
			crop.x * scaleX,
			crop.y * scaleY,
			crop.width * scaleX,
			crop.height * scaleY,
			0,
			0,
			crop.width,
			crop.height
		)

		return new Promise((resolve) => {
			const dataUrl = canvas.toDataURL('image/png', 1.0)
			resolve(dataUrl)
		})
	}

	return (
		<div className={s.container}>
			<ReactCrop
				onComplete={setCompletedCrop}
				crop={crop}
				onChange={(c) => setCrop(c)}
				maxHeight={cropSize.height}
				minHeight={cropSize.height}
				maxWidth={cropSize.width}
				minWidth={cropSize.width}
			>
				<ImageCdn
					onRef={(ref) => {
						imageRef.current = ref
					}}
					src={fileURL}
					alt="asd"
				/>
			</ReactCrop>
			{cropConfig.height + cropConfig.width >
				(imageRef.current?.naturalHeight || 2000) +
					(imageRef.current?.naturalWidth || 2000) && (
				<>
					<P color="red">
						Размеры картинки должны быть: Ширина - {cropConfig.width}, Высота{' '}
						{cropConfig.height}
					</P>
					<P color="red">
						Ваша картинка: Ширина - {imageRef.current?.naturalWidth}, Высота{' '}
						{imageRef.current?.naturalHeight}
					</P>
				</>
			)}

			<Button type="primary" onClick={onComplete}>
				Подтвердить
			</Button>
			<Button type="secondary" onClick={closeModal}>
				Отмена
			</Button>
		</div>
	)
}

export default CropModalUpdate
