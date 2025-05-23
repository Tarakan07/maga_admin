import React, { FC } from 'react'
import { Input } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './BigImage.module.scss'
type TProps = {
	content: TContentTypeWithId<'bigImage'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const BigImage: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { image } = content

	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()
	const transform = ({
		key,
		value,
	}: {
		key: 'description' | 'src'
		value: string
	}) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'bigImage',
				id: content.id,
				image: {
					...image,
					[key]: value,
				},
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const handleChangeText = ({ value }: { value: string }) => {
		transform({ key: 'description', value })
	}
	const handleChangeImage = ({ value }: { value: string }) => {
		transform({ key: 'src', value })
	}

	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<div className={s.image}>
					<UploadImage
						idInput={`bog-image-${content.id}`}
						fileURL={image.src}
						onChange={(e) => {
							handleChangeImage({ value: e })
						}}
					/>
				</div>

				<Input
					value={image.description}
					placeholder={getLocalization('Описание')}
					onChange={(e) => {
						handleChangeText({ value: e.target.value })
					}}
				/>
			</div>
		</div>
	)
}

export default BigImage
