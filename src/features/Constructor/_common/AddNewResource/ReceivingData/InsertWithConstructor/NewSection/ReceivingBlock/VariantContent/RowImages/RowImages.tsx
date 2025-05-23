import React, { FC } from 'react'
import { Input } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { UploadImage } from '@/features/Constructor/_common/_comp'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './RowImages.module.scss'
type TProps = {
	content: TContentTypeWithId<'rowImages'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const RowImages: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { images } = content
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()
	const transform = ({
		key,
		value,
		index,
	}: {
		key: 'description' | 'src'
		value: string
		index: number
	}) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'rowImages',
				id: content.id,
				images: [
					...images.slice(0, index),
					{
						...images[index],
						[key]: value,
					},
					...images.slice(index + 1),
				],
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const handleChangeText = ({
		value,
		index,
	}: {
		value: string
		index: number
	}) => {
		transform({ key: 'description', value, index })
	}
	const handleChangeImage = ({
		value,
		index,
	}: {
		value: string
		index: number
	}) => {
		transform({ key: 'src', value, index })
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				{images.map((item, index) => {
					return (
						<div key={item.id} className={s.item}>
							<div className={s.image}>
								<UploadImage
									key={item.id}
									fileURL={item.src}
									idInput={`row-${index}`}
									onChange={(e) => {
										handleChangeImage({
											index: index,
											value: e,
										})
									}}
								/>
							</div>
							<Input
								value={item.description}
								placeholder={getLocalization('Описание')}
								onChange={(e) => {
									handleChangeText({ value: e.target.value, index })
								}}
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default RowImages
