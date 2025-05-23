import { FC } from 'react'
import cn from 'classnames'
import DragSvg from '@/_assets/svg/DragSvg'
import { Input, TextArea } from '@/libs/UI'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useDragAndDrop from '@/libs/hooks/use-dragAndDrop/use-dragAndDrop'
import { TBlockFaqItem } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './FaqItem.module.scss'
import {
	TParamsChangeText,
	TParamsRemoveRow,
	TParamsSetContent,
} from '../Faq.type'
import {
	DuplicatePartContent,
	WrapperWithBlockPlaceInsert,
} from '../../../../_comp'
import WrapperWithRemoveRow from '../../../../_comp/WrapperWithRemoveRow/WrapperWithRemoveRow'

type TProps = {
	handleSetContent: (params: TParamsSetContent) => void
	handleChangeText: (params: TParamsChangeText) => void
	handleAddNew: () => void
	handleRemoveRow: (params: TParamsRemoveRow) => void
	array: TBlockFaqItem[]
}

const FaqItem: FC<TProps> = ({
	array,
	handleAddNew,
	handleChangeText,
	handleSetContent,
	handleRemoveRow,
}) => {
	const { getLocalization } = useLanguage()
	const drag = useDragAndDrop({
		state: array,
		setNewState: (state) => handleSetContent({ array: state }),
		type: 'faq',
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
			<div className={s.head}>{/* <P>{labelHead}</P> */}</div>

			<div className={s.block}>
				{array.map((item, index) => {
					return (
						<WrapperWithBlockPlaceInsert
							key={`${item.id}`}
							dragOver={dragOverId === item.id}
						>
							<WrapperWithRemoveRow
								callback={() => {
									handleRemoveRow({ id: item.id })
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
											placeholder={getLocalization('Вопрос')}
											value={item.text.question}
											onChange={(e) => {
												handleChangeText({
													id: item.id,
													text: e.target.value,
													keyVariantData: 'question',
												})
											}}
										/>
										<div className={s.textArea}>
											<TextArea
												type="input"
												value={item.text.answer}
												placeholder={getLocalization('Ответ')}
												onChange={(value) => {
													handleChangeText({
														id: item.id,
														text: value,
														keyVariantData: 'answer',
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
					callback={() => handleAddNew()}
				/>
			</div>
		</div>
	)
}

export default FaqItem
