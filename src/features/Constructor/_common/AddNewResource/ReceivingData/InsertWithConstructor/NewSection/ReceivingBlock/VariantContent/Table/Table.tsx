import React, { FC } from 'react'
import cn from 'classnames'
import { TextArea } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './Table.module.scss'
import { DuplicatePartContent } from '../../../_comp'
import WrapperWithRemoveRow from '../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'
type TProps = {
	content: TContentTypeWithId<'table'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

const Table: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { header, data } = content

	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()

	const handleChangeHeader = ({
		key,
		value,
	}: {
		key: 'base' | 'secondary'
		value: string
	}) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'table',
				id: content.id,
				header: {
					...header,
					[key]: value,
				},
				data: [...data],
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const handleChangeData = ({
		key,
		value,
		index,
	}: {
		key: 'base' | 'secondary'
		value: string
		index: number
	}) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'table',
				id: content.id,
				header: {
					...header,
				},
				data: [
					...data.slice(0, index),
					{
						...data[index],
						[key]: value,
					},
					...data.slice(index + 1),
				],
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}
	const handleAddNew = () => {
		changeContent({
			id: content.id,
			content: {
				contentType: 'table',
				id: content.id,
				header: { ...header },
				data: [...data, { id: Number(new Date()), base: '', secondary: '' }],
			},
			key: variantResource,
			section_id: sectionId,
		})
	}
	const handleRemoveRow = ({ id }: { id: number }) => {
		const findIndex = data.findIndex((e) => e.id === id)

		changeContent({
			id: content.id,
			content: {
				contentType: 'table',
				id: content.id,
				header: { ...header },
				data: [...data.slice(0, findIndex), ...data.slice(findIndex + 1)],
			},
			key: variantResource,
			section_id: sectionId,
		})
	}
	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<div className={cn(s.tableRow, s.tableSettingChild, s.tableRowHead)}>
					<div className={s.tableBase}>
						<input
							type="text"
							placeholder={getLocalization('Заголовок')}
							value={header.base}
							onChange={({ target: { value } }) => {
								handleChangeHeader({
									key: 'base',
									value: value,
								})
							}}
						/>
					</div>
					<div className={s.tableSecondary}>
						<input
							type="text"
							placeholder={getLocalization('Заголовок')}
							value={header.secondary}
							onChange={({ target: { value } }) => {
								handleChangeHeader({
									key: 'secondary',
									value: value,
								})
							}}
						/>
					</div>
				</div>
				{data.map((row, index) => {
					return (
						<div key={row.id} className={cn(s.tableRow, s.tableSettingChild)}>
							<div className={s.tableBase}>
								<TextArea
									id={'base'}
									type="table"
									onChange={(value) => {
										handleChangeData({
											key: 'base',
											index,
											value: value,
										})
									}}
									value={row.base}
									placeholder={getLocalization('Текст')}
								/>
							</div>
							<WrapperWithRemoveRow
								callback={() => {
									handleRemoveRow({ id: row.id })
								}}
							>
								<div className={s.tableSecondary}>
									<TextArea
										id={'secondary'}
										type="table"
										onChange={(value) => {
											handleChangeData({
												key: 'secondary',
												index,
												value: value,
											})
										}}
										value={row.secondary}
										placeholder={getLocalization('Текст')}
									/>
								</div>
							</WrapperWithRemoveRow>
						</div>
					)
				})}
				<div className={cn(s.tableRow, s.tableRowBottom)}>
					<DuplicatePartContent
						label={getLocalization('Добавить строку')}
						callback={handleAddNew}
					/>
				</div>
			</div>
		</div>
	)
}

export default Table
