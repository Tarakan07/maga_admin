import { FC, useState } from 'react'
import cn from 'classnames'
import { TextArea } from '@/libs/UI'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import PlusColumnSvg from '@/_assets/svg/PlusColumnSvg'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './TableMultiple.module.scss'
import { DuplicatePartContent } from '../../../_comp'
type TProps = {
	content: TContentTypeWithId<'tableMultiple'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}

type THover = {
	type: 'column' | 'row'
	id: number | null
}
const TableMultiple: FC<TProps> = ({ content, variantResource, sectionId }) => {
	const { getLocalization } = useLanguage()
	const { contentTable } = content
	const [hovered, setHovered] = useState<THover>({ type: 'column', id: null })
	const {
		bindActionContent: { changeContent },
	} = useConstructorStore()

	const handleChangeHeader = ({ id, value }: { id: number; value: string }) => {
		const findIndex = contentTable.findIndex((e) => e.id === id)

		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: contentTable.map((column, index) =>
					index === findIndex ? { ...column, header: value } : column
				),
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}

	const handleChangeData = ({
		value,
		idColumn,
		idRow,
	}: {
		value: string
		idColumn: number
		idRow: number
	}) => {
		const findIndexColumn = contentTable.findIndex((e) => e.id === idColumn)
		const findIndexRow = contentTable[findIndexColumn].data.findIndex(
			(e) => e.id === idRow
		)

		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: contentTable.map((column, index) =>
					index === findIndexColumn
						? {
								...column,
								data: column.data.map((row, index) =>
									index === findIndexRow ? { ...row, text: value } : row
								),
							}
						: column
				),
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}

	const handleRemoveRow = ({ id }: { id: number }) => {
		const findIndex = contentTable[0].data.findIndex((e) => e.id === id)

		changeContent({
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: contentTable.map((column) => ({
					...column,
					id: column.id,
					header: column.header,
					data: [
						...column.data.slice(0, findIndex),
						...column.data.slice(findIndex + 1),
					],
				})),
			},
			key: variantResource,
			section_id: sectionId,
		})
	}
	const handleRemoveColumn = ({ id }: { id: number }) => {
		const findIndex = contentTable.findIndex((e) => e.id === id)

		changeContent({
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: [
					...contentTable.slice(0, findIndex),
					...contentTable.slice(findIndex + 1),
				],
			},
			key: variantResource,
			section_id: sectionId,
		})
	}
	const handleAddNewColumn = () => {
		changeContent({
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: [
					...contentTable,
					{
						id: Number(new Date()),
						header: '',
						data: contentTable[0].data.map((item) => ({
							...item,
							id: item.id,
							text: '',
						})),
					},
				],
			},
			key: variantResource,
			section_id: sectionId,
		})
	}
	const handleAddNewRow = () => {
		changeContent({
			id: content.id,
			content: {
				contentType: 'tableMultiple',
				id: content.id,
				contentTable: contentTable.map((column) => ({
					...column,
					data: [
						...column.data,
						{
							id: Number(new Date()),
							text: '',
						},
					],
				})),
			},
			key: variantResource,
			section_id: sectionId,
		})
	}

	const getHoverClass = (type: 'column' | 'row', id: number) => {
		return (
			hovered.type === type &&
			hovered.id === id &&
			(type === 'column'
				? contentTable.length > 1 && s.hoveredHeader
				: contentTable[0].data.length > 1 && s.hoveredCell)
		)
	}

	return (
		<div className={s.wrap}>
			<div className={s.block}>
				<div className={cn(s.table, s.tableRowHead)}>
					{contentTable.map((column, colIndex) => {
						return (
							<div
								key={`${column}-${colIndex}`}
								className={cn(
									s.tableColumn,
									getHoverClass('column', column.id)
								)}
								style={{ width: `${100 / contentTable.length}%` }}
							>
								<div className={cn(s.tableColumn_inner, s.tableSettingChild)}>
									<div
										onMouseEnter={() =>
											setHovered({ type: 'column', id: column.id })
										}
										onMouseLeave={() =>
											setHovered({ type: 'column', id: null })
										}
										className={s.columnHeader}
									>
										{hovered.type === 'column' &&
											hovered.id === column.id &&
											contentTable.length > 1 && (
												<div
													onClick={() => handleRemoveColumn({ id: column.id })}
													className={cn(s.deleteSvg, s.deleteUp)}
												>
													<DeleteSvg />
												</div>
											)}
										<input
											type="text"
											placeholder={getLocalization('Заголовок')}
											value={column.header}
											onChange={(e) => {
												handleChangeHeader({
													id: column.id,
													value: e.target.value,
												})
											}}
										/>
									</div>
									<div key={column.id} className={s.columnData}>
										{column.data.map((row, index) => (
											<div
												key={index}
												className={cn(
													s.columnCell,
													getHoverClass('row', row.id)
												)}
												onMouseEnter={() =>
													setHovered({ type: 'row', id: row.id })
												}
												onMouseLeave={() =>
													setHovered({ type: 'row', id: null })
												}
											>
												{hovered.type === 'row' &&
													hovered.id === row.id &&
													column.data.length > 1 &&
													colIndex === 0 && (
														<div
															onClick={() => handleRemoveRow({ id: row.id })}
															className={cn(s.deleteSvg, s.deleteLeft)}
														>
															<DeleteSvg />
														</div>
													)}
												<TextArea
													id={row.id}
													type="table"
													value={row.text}
													onChange={(e) => {
														handleChangeData({
															idColumn: column.id,
															idRow: row.id,
															value: e,
														})
													}}
													placeholder={getLocalization('Текст')}
												/>
											</div>
										))}
									</div>
								</div>
							</div>
						)
					})}
					{contentTable.length < 4 && (
						<div className={s.tableColumnRight} onClick={handleAddNewColumn}>
							<PlusColumnSvg />
						</div>
					)}
				</div>
				<div className={s.tableRowBottom}>
					<DuplicatePartContent
						label={getLocalization('Добавить строку')}
						callback={handleAddNewRow}
					/>
				</div>
			</div>
		</div>
	)
}

export default TableMultiple
