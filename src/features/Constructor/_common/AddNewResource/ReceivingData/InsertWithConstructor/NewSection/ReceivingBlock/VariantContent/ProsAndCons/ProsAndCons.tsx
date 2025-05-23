import { FC } from 'react'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorSectionId,
	TBlockProsAndConsItem,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './ProsAndCons.module.scss'
import ProsAndConsItem from './ProsAndConsItem/ProsAndConsItem'
import {
	TParamsAddNew,
	TParamsChangeText,
	TParamsRemoveRow,
	TParamsSetContent,
} from './ProsAndCos.type'
type TProps = {
	content: TContentTypeWithId<'prosAndCons'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const ProsAndCons: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { data } = content
	const { cons, pros } = data
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()

	const handleSetContent = ({ _key, array }: TParamsSetContent) => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'prosAndCons',
				id: content.id,
				data: {
					...data,
					[_key]: array,
				},
			},
		})
	}
	const handleChangeText = ({
		keyVariantData,
		id,
		text,
		keyVariantText,
	}: TParamsChangeText) => {
		const arrayDataOfKey = data[keyVariantData]

		const findIndexData = arrayDataOfKey.findIndex((e) => e.id === id)
		const changingElem: TBlockProsAndConsItem = arrayDataOfKey[findIndexData]

		const newTextOfKey: TBlockProsAndConsItem = {
			...changingElem,
			text: {
				...changingElem.text,
				[keyVariantText]: text,
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
				contentType: 'prosAndCons',
				id: content.id,
				data: {
					...data,

					[keyVariantData]: newArrayData,
				},
			},
		})
	}
	const handleAddNew = ({ _key }: TParamsAddNew) => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'prosAndCons',
				id: content.id,
				data: {
					...data,
					[_key]: [
						...data[_key],
						{
							id: Number(new Date()),
							text: {
								base: '',
								secondary: '',
							},
						},
					],
				},
			},
		})
	}
	const handleRemoveRow = ({ _key, id }: TParamsRemoveRow) => {
		const findIndex = data[_key].findIndex((e) => e.id === id)
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'prosAndCons',
				id: content.id,
				data: {
					...data,
					[_key]: [
						...data[_key].slice(0, findIndex),
						...data[_key].slice(findIndex + 1),
					],
				},
			},
		})
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<ProsAndConsItem
					{...{
						handleSetContent,
						handleChangeText,
						handleAddNew,
						handleRemoveRow,
						array: pros,
						labelHead: getLocalization('Преимущества'),
						_key: 'pros',
					}}
				/>
				<ProsAndConsItem
					{...{
						handleSetContent,
						handleChangeText,
						handleAddNew,
						handleRemoveRow,
						array: cons,
						labelHead: getLocalization('Недостатки'),
						_key: 'cons',
					}}
				/>
			</div>
		</div>
	)
}

export default ProsAndCons
