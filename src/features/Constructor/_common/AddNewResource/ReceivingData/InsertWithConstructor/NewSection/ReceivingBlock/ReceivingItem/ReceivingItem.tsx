import { FC, useContext, useState } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import DragSvg from '@/_assets/svg/DragSvg'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import { TReturnDrag } from '@/libs/hooks/use-dragAndDrop/type'
import useRedefineDragAndDrop from '@/libs/hooks/use-redefineDragAndDrop/use-redefineDragAndDrop'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorSectionId,
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './ReceivingItem.module.scss'
import { WrapperWithBlockPlaceInsert } from '../../_comp'
import { VariantNewResourceContext } from '../../../../_context/VariantNewResourceContext'
import {
	BigImage,
	DefaultText,
	ContentHTML,
	List,
	ProsAndCons,
	Quote,
	RowImages,
	RowImageText,
	Table,
	TableMultiple,
	Faq
} from '../VariantContent'

type TProps = {
	content: TContentTypeWithId<TContentTypeKey>
	sectionId: IConstructorSectionId
	drag: TReturnDrag<TContentTypeWithId<TContentTypeKey>>
}

const ReceivingItem: FC<TProps> = ({ content, sectionId, drag }) => {
	const { variantResource } = useContext(VariantNewResourceContext)
	const { bindActionContent, emdeddedStore } = useConstructorStore()
	const { removeContent } = bindActionContent
	const { dragEvent, draggingId, wrapRef } = drag
	const { dragRedefineEvent } = useRedefineDragAndDrop({
		dragEvent,
		workData: content,
		sectionId,
	})
	const [isCollapsed, updateCollapsed] = useState(true)

	let CurrentContent: FC<any> | null = null
	const currentContentType = emdeddedStore.emdeddedContent.find(
		(e) => e._key === content.contentType
	)
	switch (currentContentType?._key) {
		case 'defaultText':
			CurrentContent = DefaultText
			break
		case 'bigImage':
			CurrentContent = BigImage
			break
		case 'list':
			CurrentContent = List
			break
		case 'prosAndCons':
			CurrentContent = ProsAndCons
			break
		case 'quote':
			CurrentContent = Quote
			break
		case 'rowImages':
			CurrentContent = RowImages
			break
		case 'table':
			CurrentContent = Table
			break
		case 'tableMultiple':
			CurrentContent = TableMultiple
			break
		case 'rowImageText':
			CurrentContent = RowImageText
			break
		case 'contentHTML':
			CurrentContent = ContentHTML
			break
		case 'faq':
			CurrentContent = Faq
			break
		default:
			CurrentContent = null
	}

	return (
		<WrapperWithBlockPlaceInsert
			dragOver={
				dragEvent.dragOverId === content.id ||
				emdeddedStore.receivingElement === content.id
			}
		>
			<div
				ref={wrapRef}
				className={cn(s.receivingBox, {
					[s.dragActive]: draggingId,
					[s.dragging]: draggingId === content.id,
					[s.dragOver]: dragEvent.dragOverId === content.id,
				})}
				draggable={false}
				onDragOver={(e) => dragRedefineEvent.onRedefineOver(e, content.id)}
				onDragLeave={(e) => {
					dragRedefineEvent.onRedefineLeave(e, content.id)
				}}
				onDrop={(e) => dragRedefineEvent.onRedefineDrop(e, content)}
			>
				<div
					className={s.dragPart}
					draggable={true}
					onDragStart={(e) => dragEvent.onDragStart(e, content)}
					onDragEnd={(e) => {
						dragEvent.onDragEnd(e)
						emdeddedStore.setReceivingElement(null)
						emdeddedStore.setEmdeddedMovingElement(null)
					}}
				>
					<DragSvg />
				</div>
				{content.id !== -1 && (
					<div className={cn(s.contentPart, { [s.isShow]: !isCollapsed })}>
						<div className={s.headerContent}>
							<P size="m">{currentContentType?.label}</P>

							<div className={s.right}>
								<button
									className={cn({ [s.isShow]: !isCollapsed })}
									onClick={() => updateCollapsed((prev) => !prev)}
								>
									<ArrowSelectorSvg />
								</button>
								<div
									className={s.removeContent}
									onClick={() => {
										removeContent({
											key: variantResource,
											section_id: sectionId,
											id: content.id,
										})
									}}
								>
									<DeleteSvg />
								</div>
							</div>
						</div>
						<div
							className={s.content}
							style={{
								overflow: 'hidden',
								maxHeight: isCollapsed ? '1000px' : '0px',
								transition: '0.5s',
							}}
						>
							{CurrentContent && (
								<CurrentContent
									content={content}
									variantResource={variantResource}
									sectionId={sectionId}
								/>
							)}
						</div>
					</div>
				)}
			</div>
		</WrapperWithBlockPlaceInsert>
	)
}

export default ReceivingItem
