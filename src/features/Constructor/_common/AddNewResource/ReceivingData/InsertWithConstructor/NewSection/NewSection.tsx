import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import { Input } from '@/libs/UI'
import DragSvg from '@/_assets/svg/DragSvg'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import { TReturnDrag } from '@/libs/hooks/use-dragAndDrop/type'
import useRedefineDragAndDrop from '@/libs/hooks/use-redefineDragAndDrop/use-redefineDragAndDrop'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './NewSection.module.scss'
import ReceivingBlock from './ReceivingBlock'
import { WrapperWithBlockPlaceInsert } from './_comp'
import { VariantNewResourceContext } from '../../_context/VariantNewResourceContext'
type TProps = {
	section: IConstructorContentSectionWithId

	handleRemoveSection: (params: IConstructorSectionId) => void
	drag: TReturnDrag<IConstructorContentSectionWithId>
}
const NewSection: FC<TProps> = ({ section, drag, handleRemoveSection }) => {
	const { dragEvent, draggingId, wrapRef } = drag

	const { content } = section

	const { bindActionSection } = useConstructorStore()
	const { changeTitleSection } = bindActionSection

	const { variantResource } = useContext(VariantNewResourceContext)
	const [isCollapsed, updateCollapsed] = useState(true)

	//
	const { dragRedefineEvent } = useRedefineDragAndDrop({
		dragEvent,
		workData: section,
		sectionId: section.id,
	})
	return (
		<WrapperWithBlockPlaceInsert dragOver={dragEvent.dragOverId === section.id}>
			<div
				ref={wrapRef}
				className={cn(s.box, {
					[s.dragActive]: !!draggingId,
					[s.dragging]: draggingId === section.id,
					[s.dragOver]: dragEvent.dragOverId === section.id,
				})}
				draggable={false}
				onDragOver={(e) => dragEvent.onDragOver(e, section.id)}
				onDragLeave={(e) => dragEvent.onDragLeave(e, section.id)}
				onDrop={(e) => dragEvent.onDrop(e, section)}
			>
				<div
					className={s.headerTitle}
					draggable={false}
					onDragOver={(e) => dragRedefineEvent.onRedefineOver(e, section.id)}
					onDragLeave={(e) => dragRedefineEvent.onRedefineLeave(e, section.id)}
					onDrop={(e) => dragRedefineEvent.onRedefineDrop(e, section)}
				>
					<div className={s.left}>
						<div
							className={s.handleDrag}
							draggable={true}
							onDragStart={(e) => dragEvent.onDragStart(e, section)}
							onDragEnd={dragEvent.onDragEnd}
						>
							<DragSvg color="var(--casino-green)" />
						</div>
						<Input
							value={section?.title || ''}
							placeholder="Заголовок секции"
							onChange={(e) => {
								changeTitleSection({
									id: section.id,
									key: variantResource,
									newTitle: e.target.value,
								})
							}}
						/>
					</div>
					<div className={s.right}>
						{section.content.length > 0 && (
							<button
								className={!isCollapsed ? s.isShow : ''}
								onClick={() => updateCollapsed((prev) => !prev)}
							>
								<ArrowSelectorSvg />
							</button>
						)}

						<div
							className={s.deleteSection}
							onClick={() => {
								handleRemoveSection(section.id)
							}}
						>
							<DeleteSvg />
						</div>
					</div>
				</div>
				{section.content.length > 0 && (
					<div
						style={{
							overflow: 'hidden',
							maxHeight: isCollapsed ? '10000px' : '0px', // Управление высотой для main
							transition: 'max-height 0.3s ease',
						}}
					>
						<ReceivingBlock
							sectionId={section.id}
							fillingContent={content}
							drag={drag}
						/>
					</div>
				)}
			</div>
		</WrapperWithBlockPlaceInsert>
	)
}

export default NewSection
