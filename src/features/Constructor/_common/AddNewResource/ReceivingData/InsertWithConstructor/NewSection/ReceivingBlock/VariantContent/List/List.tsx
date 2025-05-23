import { FC } from 'react'
import { Input } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './List.module.scss'
import { DuplicatePartContent } from '../../../_comp'
import WrapperWithRemoveRow from '../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'
type TProps = {
	content: TContentTypeWithId<'list'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}
const List: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { listText } = content
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()

	const handleRemove = ({ index }: { index: number }) => {
		return changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'list',
				id: content.id,
				listText: [...listText.slice(0, index), ...listText.slice(index + 1)],
			},
		})
	}
	const handleChangeText = ({
		indexChanging,
		value,
	}: {
		indexChanging: number
		value: string
	}) => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'list',
				id: content.id,
				listText: [
					...listText.slice(0, indexChanging),
					value,
					...listText.slice(indexChanging + 1),
				],
			},
		})
	}
	const handleAddNew = () => {
		changeContent({
			id: content.id,
			section_id: sectionId,
			key: variantResource,
			content: {
				contentType: 'list',
				id: content.id,
				listText: [...listText, ''],
			},
		})
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				{listText.map((item, index) => {
					return (
						<WrapperWithRemoveRow
							key={index}
							callback={() => {
								handleRemove({ index })
							}}
							isShowCross={listText.length > 1}
						>
							<div className={s.item}>
								<div className={s.row}>
									<Input
										placeholder={getLocalization('Текст')}
										value={item}
										onChange={(e) => {
											handleChangeText({
												indexChanging: index,
												value: e.target.value,
											})
										}}
									/>
								</div>
							</div>
						</WrapperWithRemoveRow>
					)
				})}
			</div>
			<div className={s.bottom}>
				<DuplicatePartContent
					label={getLocalization('Добавить строку')}
					callback={handleAddNew}
				/>
			</div>
		</div>
	)
}

export default List
