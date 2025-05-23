import { toast } from 'react-toastify'
import 'react-image-crop/src/ReactCrop.scss'
import { useMutation } from 'react-query'
import React, { useMemo, useState } from 'react'
import ImageCdn from '@/libs/UI/ImageCdn/ImageCdn'
import InputFileSvg from '@/_assets/svg/InputFileSvg'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import LoaderImage from '@/libs/UI/Jammer/LoaderImage/LoaderImage'
import { deleteFile, uploadFile } from '@/services/API/cdn/upload-image'
import { CropSvg, ImageDeleteSvg, ImageEditSvg } from '@/_assets/svg/image_edit'
import s from './UploadImage.module.scss'
import CropModalUpdate from './CropModal/CropModalUpdate'

type TInputFile = {
	fileURL: string
	onChange: (file: string) => void
	idInput: string
	resourceType?: 'article' | 'casino' | 'news' | 'history' | 'slots' | 'default'
}

const cropConfig = {
	article: { width: 1300, height: 590 },
	news: { width: 1300, height: 590 },
	casino: { width: 465, height: 125 },
	slots: { width: 465, height: 125 },
	history: { width: 565, height: 1080 },
	default: { width: 1300, height: 590 },
}

const UploadImage = ({
	fileURL,
	onChange,
	idInput,
	resourceType = 'default',
}: TInputFile) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { openModal, closeModal } = useModal()
	const { mutate: mutateUploadFile } = useMutation(
		['uploadFile'],
		({ image }: { image: File }) => {
			if (image) {
				return uploadFile({ image })
			} else {
				throw new Error('No image file selected')
			}
		},
		{
			onSuccess: async (data) => {
				try {
					// if (fileURL !== data.id) {
					// 	deleteImage({ id: fileURL })
					// }
					onChange(data.id)
				} catch (err) {
					console.log(err)
				} finally {
					setIsLoading(false)
				}
			},
			onError: () => {
				toast.error('Не удалось загрузить изображение')
				setIsLoading(false)
			},
		}
	)
	const sizeBlock: { width?: number; height?: number } = useMemo(() => {
		const divider = cropConfig[resourceType].width > 700 ? 2 : 1
		return resourceType === 'default' || resourceType === 'history'
			? {}
			: {
					width: cropConfig[resourceType].width / divider,
					height: cropConfig[resourceType].height / divider,
				}
	}, [resourceType])

	const { mutate: deleteImage } = useMutation(
		['deleteImage'],
		({ id }: { id: string }) => {
			if (id) {
				return deleteFile({ id })
			} else {
				throw new Error('No image file selected')
			}
		}
	)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files || !e.target.files[0]) {
			return
		}
		if (e.target.files[0].size < 1 * 1024 * 1024) {
			const file = e.target.files[0]
			mutateUploadFile({ image: file })
			setIsLoading(true)
		} else {
			toast.error('Файл слишком большой')
		}
	}

	const handleDelete = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		deleteImage({ id: fileURL })
		onChange('')
	}

	const handleEdit = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		const fileInput = document.getElementById(idInput) as HTMLInputElement
		if (fileInput) {
			fileInput.click()
		}
	}

	const handleEditCrop = (e: React.MouseEvent<HTMLDivElement>) => {
		e.preventDefault()
		openModal({
			component: (
				<CropModalUpdate
					{...{
						fileURL,
						handleCompleteCrop,
						cropConfig: cropConfig[resourceType],
					}}
				/>
			),
			settingModal: {
				fullScreen: true,
				position: 'center',
				isOuterClose: true,
			},
		})
	}

	const handleCompleteCrop = (croppedFile: File | null) => {
		if (croppedFile) {
			mutateUploadFile({ image: croppedFile })
			setIsLoading(true)
		}
		closeModal()
	}
	return (
		<label htmlFor={idInput} className={s.dropWrapper}>
			{isLoading ? (
				<LoaderImage />
			) : fileURL === '' ? (
				<div className={s.empty}>
					<p className={s.dropTitle}>
						Загрузите <br /> изображение
					</p>
					<InputFileSvg />
				</div>
			) : (
				<div className={s.wrapImag} style={sizeBlock}>
					<ImageCdn src={fileURL} alt={'uploaded file'} />
					<div className={s.menu}>
						<div onClick={handleDelete}>
							<ImageDeleteSvg />
						</div>
						<div onClick={handleEdit}>
							<ImageEditSvg />
						</div>
						{resourceType !== 'default' && (
							<div onClick={handleEditCrop}>
								<CropSvg />
							</div>
						)}
					</div>
				</div>
			)}
			<input
				type="file"
				// id="file-drop"
				id={idInput}
				className={s.dropInput}
				required
				onChange={handleChange}
			/>
		</label>
	)
}

export default UploadImage
