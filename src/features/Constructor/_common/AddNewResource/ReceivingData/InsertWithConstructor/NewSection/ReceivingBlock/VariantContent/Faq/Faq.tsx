import React, { FC } from 'react'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorSectionId,
	TBlockFaqItem,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './Faq.module.scss'
import FaqItem from './FaqItem/FaqItem'
import {
	TParamsChangeText,
	TParamsRemoveRow,
	TParamsSetContent,
} from './Faq.type'

type TProps = {
	content: TContentTypeWithId<'faq'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const Faq: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { data } = content
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()

	const handleSetContent = ({ array }: TParamsSetContent) => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'faq',
				id: content.id,
				data: [...array],
			},
		})
	}
	const handleChangeText = ({
		keyVariantData,
		id,
		text,
	}: TParamsChangeText) => {
		const arrayDataOfKey = data

		const findIndexData = arrayDataOfKey.findIndex((e) => e.id === id)
		const changingElem: TBlockFaqItem = arrayDataOfKey[findIndexData]

		const newTextOfKey: TBlockFaqItem = {
			...changingElem,
			text: {
				...changingElem.text,
				[keyVariantData]: text,
			},
		}
		const newArrayData = [
			...arrayDataOfKey.slice(0, findIndexData),
			newTextOfKey,
			...arrayDataOfKey.slice(findIndexData + 1),
		]

		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'faq',
				id: content.id,
				data: newArrayData,
			},
		})
	}
	const handleAddNew = () => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'faq',
				id: content.id,
				data: [
					...data,
					{
						id: Number(new Date()),
						text: {
							answer: '',
							question: '',
						},
					},
				],
			},
		})
	}
	const handleRemoveRow = ({ id }: TParamsRemoveRow) => {
		const findIndex = data.findIndex((e) => e.id === id)
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'faq',
				id: content.id,
				data: [...data.slice(0, findIndex), ...data.slice(findIndex + 1)],
			},
		})
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<FaqItem
					{...{
						handleSetContent,
						handleChangeText,
						handleAddNew,
						handleRemoveRow,
						array: data,
					}}
				/>
			</div>
		</div>
	)
}

export default Faq
