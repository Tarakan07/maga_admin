import { FC } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import DragSvg from '@/_assets/svg/DragSvg'
import { Input, TextArea } from '@/libs/UI'
import ProsAndConsSvg from '@/_assets/svg/ProsAndConsSvg'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useDragAndDrop from '@/libs/hooks/use-dragAndDrop/use-dragAndDrop'
import {
	TBlockProsAndConsItem,
	TBlockProsAndConsKeys,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './ProsAndConsItem.module.scss'
import {
	DuplicatePartContent,
	WrapperWithBlockPlaceInsert,
} from '../../../../_comp'
import WrapperWithRemoveRow from '../../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'
import {
	TParamsAddNew,
	TParamsChangeText,
	TParamsRemoveRow,
	TParamsSetContent,
} from '../ProsAndCos.type'
type TProps = {
	handleSetContent: (params: TParamsSetContent) => void
	handleChangeText: (params: TParamsChangeText) => void
	handleAddNew: (params: TParamsAddNew) => void
	handleRemoveRow: (params: TParamsRemoveRow) => void
	_key: TBlockProsAndConsKeys
	array: TBlockProsAndConsItem[]
	labelHead: string
}
const ProsAndConsItem: FC<TProps> = ({
	array,
	handleAddNew,
	handleChangeText,
	handleSetContent,
	_key,
	labelHead,
	handleRemoveRow,
}) => {
	const { getLocalization } = useLanguage()
	const drag = useDragAndDrop({
		state: array,
		setNewState: (state) => handleSetContent({ _key, array: state }),
		type: 'prosAndCos',
	})
	const { dragEvent, draggingId, wrapRef } = drag
	const {
		dragOverId,
		onDragEnd,
		onDragLeave,
		onDragOver,
		onDragStart,
		onDrop,
	} = dragEvent
	return (
		<div className={s.wrap}>
			<div className={s.head}>
				<ProsAndConsSvg isPros={_key === 'pros'} />
				<P>{labelHead}</P>
			</div>

			<div className={s.block}>
				{array.map((item, index) => {
					return (
						<WrapperWithBlockPlaceInsert
							key={`${item.id}-${_key}`}
							dragOver={dragOverId === item.id}
						>
							<WrapperWithRemoveRow
								callback={() => {
									handleRemoveRow({ id: item.id, _key })
								}}
								isShowCross={array.length > 1}
							>
								<div
									ref={wrapRef}
									className={cn(s.item, {
										[s.dragging]: draggingId === item.id,
										[s.dragOver]: dragOverId === item.id,
									})}
									draggable={false}
									onDragOver={(e) => onDragOver(e, item.id)}
									onDragLeave={(e) => onDragLeave(e, item.id)}
									onDrop={(e) => onDrop(e, item)}
								>
									<div
										className={s.handleDrag}
										draggable={true}
										onDragStart={(e) => onDragStart(e, item)}
										onDragEnd={onDragEnd}
									>
										<DragSvg />
									</div>
									<div className={s.row}>
										<Input
											placeholder={getLocalization('Название')}
											value={item.text.base}
											onChange={(e) => {
												handleChangeText({
													id: item.id,
													text: e.target.value,
													keyVariantText: 'base',
													keyVariantData: _key,
												})
											}}
										/>
										<div className={s.textArea}>
											<TextArea
												type="input"
												value={item.text.secondary}
												placeholder={getLocalization('Описание')}
												onChange={(value) => {
													handleChangeText({
														id: item.id,
														text: value,
														keyVariantText: 'secondary',
														keyVariantData: _key,
													})
												}}
											/>
										</div>
									</div>
								</div>
							</WrapperWithRemoveRow>
						</WrapperWithBlockPlaceInsert>
					)
				})}
			</div>

			<div className={s.bottom}>
				<DuplicatePartContent
					label={getLocalization('Добавить строку')}
					callback={() => handleAddNew({ _key })}
				/>
			</div>
		</div>
	)
}

export default ProsAndConsItem
