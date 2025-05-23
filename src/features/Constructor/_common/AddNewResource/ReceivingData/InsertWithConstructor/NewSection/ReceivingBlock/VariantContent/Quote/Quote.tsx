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
import s from './Quote.module.scss'
type TProps = {
	content: TContentTypeWithId<'quote'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const Quote: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { text } = content

	const {
		bindActionContent: { changeContent, addContent },
	} = useConstructorStore()

	const handleChangeText = ({ value }: { value: string }) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'quote',
				id: content.id,
				text: value,
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}

	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<div>
					<TextArea
						value={text}
						placeholder={getLocalization('Цитата')}
						onChange={(value) => handleChangeText({ value })}
					/>
				</div>
			</div>
		</div>
	)
}

export default Quote
