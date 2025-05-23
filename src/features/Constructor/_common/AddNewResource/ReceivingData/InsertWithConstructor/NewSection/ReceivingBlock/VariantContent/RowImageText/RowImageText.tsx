import React, { FC } from 'react'
import cn from 'classnames'
import { Input, TextArea } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { UploadImage } from '@/features/Constructor/_common/_comp'
import CustomSelect from '@/features/Constructor/_common/_comp/CustomSelect'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './RowImageText.module.scss'
import { DuplicatePartContent } from '../../../_comp'
import WrapperWithRemoveRow from '../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'
import {
	TTransformImageBlockParams,
	TTransformTextBlockParams,
} from './RowImageText.type'
type TProps = {
	content: TContentTypeWithId<'rowImageText'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const RowImageText: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { data } = content
	const { image, textArray, reverse } = data
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()
	const transformImageBlock = ({ key, value }: TTransformImageBlockParams) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'rowImageText',
				id: content.id,
				data: {
					...data,
					image: {
						...data.image,
						[key]: value,
					},
				},
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const transformTextBlock = ({
		action,
		value,
		index,
	}: TTransformTextBlockParams) => {
		let newTextArray: string[] = ['']
		switch (action) {
			case 'addRow':
				newTextArray = [...textArray, '']
				break
			case 'removeRow':
				newTextArray = [
					...textArray.slice(0, index),
					...textArray.slice(index + 1),
				]
				break
			case 'change':
				newTextArray = [
					...textArray.slice(0, index),
					value || '',
					...textArray.slice(index + 1),
				]
		}

		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'rowImageText',
				id: content.id,
				data: {
					...data,
					textArray: [...newTextArray],
				},
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const toggleReverse = () => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'rowImageText',
				id: content.id,
				data: {
					...data,
					reverse: !data.reverse,
				},
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	// 	value,
	// 	index,
	// }: {
	// 	value: string;
	// 	index: number;
	// }) => {
	// 	transform({ key: "description", value, index });
	// };
	// const handleChangeImage = ({
	// 	value,
	// 	index,
	// }: {
	// 	value: string;
	// 	index: number;
	// }) => {
	// 	transform({ key: "src", value, index });
	// };
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<div className={s.toggle}>
					<CustomSelect
						onChange={toggleReverse}
						isActive={reverse}
						label={getLocalization('Изображение слева')}
					/>
				</div>
				<div className={cn(s.content, { [s.reverse]: reverse })}>
					<div className={s.imageBlock}>
						<div className={s.image}>
							<UploadImage
								fileURL={image.src}
								idInput={`${variantResource}-${content.id}`}
								onChange={(e) => {
									transformImageBlock({
										key: 'src',
										value: e,
									})
								}}
							/>
						</div>

						<Input
							value={image.description}
							placeholder={getLocalization('Описание')}
							onChange={(e) => {
								transformImageBlock({
									key: 'description',
									value: e.target.value,
								})
							}}
						/>
					</div>
					<div className={s.textBlock}>
						{textArray?.map((text, index) => (
							<div key={index} className={s.item}>
								<div className={s.wrapField}>
									<WrapperWithRemoveRow
										isShowCross={textArray.length > 1}
										callback={() => {
											transformTextBlock({ action: 'removeRow', index })
										}}
									>
										<TextArea
											value={text}
											placeholder={getLocalization('Контент блока')}
											onChange={(value) =>
												transformTextBlock({ action: 'change', index, value })
											}
										/>
									</WrapperWithRemoveRow>
								</div>

								{index === textArray.length - 1 && (
									<div className={s.duplicate}>
										<DuplicatePartContent
											label={getLocalization('Добавить абзац')}
											callback={() => {
												console.log('click')
												transformTextBlock({ action: 'addRow', index })
											}}
										/>
									</div>
								)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}

export default RowImageText
