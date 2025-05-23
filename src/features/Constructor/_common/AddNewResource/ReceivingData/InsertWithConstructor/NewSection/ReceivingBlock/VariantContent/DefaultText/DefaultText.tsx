import React, { FC } from 'react'
import { TextArea } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './DefaultText.module.scss'
import { DuplicatePartContent } from '../../../_comp'
import WrapperWithRemoveRow from '../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'

type TProps = {
	content: TContentTypeWithId<'defaultText'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const DefaultText: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { textArray } = content

	const {
		bindActionContent: { changeContent, addContent },
	} = useConstructorStore()

	const handleChangeText = ({
		index,
		value,
	}: {
		index: number
		value: string
	}) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'defaultText',
				id: content.id,
				textArray: [
					...textArray.slice(0, index),
					value,
					...textArray.slice(index + 1),
				],
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const handleAddNew = () => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'defaultText',
				id: content.id,
				textArray: [...textArray, ''],
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}

	const handleRemove = ({ index }: { index: number }) => {
		return changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'defaultText',
				id: content.id,
				textArray: [
					...textArray.slice(0, index),
					...textArray.slice(index + 1),
				],
			},
		})
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				{textArray?.map((text, index) => (
					<div key={index}>
						<WrapperWithRemoveRow
							isShowCross={textArray.length > 1}
							callback={() => {
								handleRemove({ index })
							}}
						>
							<TextArea
								value={text}
								placeholder={getLocalization('Контент блока')}
								onChange={(value) => handleChangeText({ index, value })}
							/>
						</WrapperWithRemoveRow>
						{index === textArray.length - 1 && (
							<div className={s.duplicate}>
								<DuplicatePartContent
									label={getLocalization('Добавить абзац')}
									callback={handleAddNew}
								/>
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}

export default DefaultText
