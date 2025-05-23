import { useQuery } from 'react-query'
import React, { useEffect, useRef, useState } from 'react'
import ReactCrop, { Crop, PixelCrop, centerCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import { Button } from '@/libs/UI/CustomTags'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { getFile } from '@/services/API/cdn/upload-image'
import s from './CropModal.module.scss'

type CropModalProps = {
	fileURL: string
	handleCompleteCrop: (croppedFile: File) => void
	cropConfig: { width: number; height: number }
}

function calculateDynamicCrop(
	imgWidth: number,
	imgHeight: number,
	cropWidth: number,
	cropHeight: number
) {
	const scaleFactor = imgWidth / 1440
	const dynamicWidth = cropWidth * scaleFactor
	const aspectRatio = cropWidth / cropHeight
	const dynamicHeight = dynamicWidth / aspectRatio

	return centerCrop(
		{
			unit: 'px',
			width: dynamicWidth,
			height: dynamicHeight,
		},
		imgWidth,
		imgHeight
	)
}
const CropModal = ({
	fileURL,
	handleCompleteCrop,
	cropConfig,
}: CropModalProps) => {
	const [imgSrc, setImgSrc] = useState(fileURL)
	const imgRef = useRef<HTMLImageElement>(null)
	const [crop, setCrop] = useState<Crop>()
	const [cropWidth, setCropWidth] = useState<number | undefined>()
	const [cropHeight, setCropHeight] = useState<number | undefined>()
	const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
	const [aspect, setAspect] = useState<number | undefined>(
		cropConfig.width / cropConfig.height
	)
	const { closeModal } = useModal()
	const { data } = useQuery(['getImage'], () => getFile(fileURL))

	useEffect(() => {
		if (data instanceof Blob) {
			const reader = new FileReader()
			reader.addEventListener('load', () =>
				setImgSrc(reader.result?.toString() || '')
			)
			reader.readAsDataURL(data)
		}
	}, [data])

	function calculateModalSize(imageWidth: number, imageHeight: number) {
		const scaleFactor = imageWidth / cropConfig.width
		const modalWidth = cropConfig.width * scaleFactor
		const modalHeight = cropConfig.height * scaleFactor

		setCropWidth(modalWidth)
		setCropHeight(modalHeight)
	}

	function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
		if (aspect) {
			const { width, height } = e.currentTarget
			const dynamicCrop = calculateDynamicCrop(
				width,
				height,
				cropConfig.width,
				cropConfig.height
			)
			setCrop(dynamicCrop)
		}
	}

	function getCroppedImage(crop: PixelCrop) {
		if (!imgRef.current || !crop.width || !crop.height) {
			return null
		}

		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')

		if (!ctx) return null

		const image = imgRef.current
		canvas.width = crop.width
		canvas.height = crop.height

		ctx.drawImage(
			image,
			crop.x,
			crop.y,
			crop.width,
			crop.height,
			0,
			0,
			crop.width,
			crop.height
		)

		return new Promise<File | null>((resolve) => {
			canvas.toBlob((blob) => {
				if (blob) {
					const file = new File([blob], 'cropped-image.jpg', {
						type: 'image/jpeg',
					})
					resolve(file)
				} else {
					resolve(null)
				}
			}, 'image/jpeg')
		})
	}

	const onComplete = async () => {
		if (completedCrop) {
			const croppedFile = await getCroppedImage(completedCrop)
			if (croppedFile) {
				handleCompleteCrop(croppedFile)
			}
		}
	}

	return (
		<div
			className={s.crop_wrapper}
			style={{ width: cropWidth, height: cropHeight }}
		>
			{!!imgSrc && (
				<ReactCrop
					crop={crop}
					onChange={(_, percentCrop) => setCrop(percentCrop)}
					onComplete={(c) => setCompletedCrop(c)}
					locked
				>
					<img ref={imgRef} alt="Crop me" src={imgSrc} onLoad={onImageLoad} />
				</ReactCrop>
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

export default CropModal
