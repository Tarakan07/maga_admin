import { DragEvent, useCallback, useContext } from 'react'
import { TDataTransfer } from '@/features/Constructor/_common/AddNewResource/types'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { VariantNewResourceContext } from '@/features/Constructor/_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'
import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import { TParamsRedefineDrag, TRedefineReturnDrag } from './type'

export const useRedefineDragAndDrop = <
	T extends
		| IConstructorContentSectionWithId
		| TContentTypeWithId<TContentTypeKey>,
>({
	dragEvent,
	workData,
	sectionId,
}: TParamsRedefineDrag<T>): TRedefineReturnDrag<T> => {
	const { bindActionContent, emdeddedStore } = useConstructorStore()
	const { variantResource } = useContext(VariantNewResourceContext)
	const handleAddContent = useCallback(
		({
			element,
			sectionId,
			contentBeforeId,
		}: {
			element: TDataTransfer
			sectionId: IConstructorSectionId
			contentBeforeId: IConstructorSectionId
		}) => {
			bindActionContent.addContent({
				key: variantResource,
				section_id: sectionId,
				content: element.defaultContent,
				contentBeforeId,
			})
		},
		[]
	)
	const onRedefineOver = (e: DragEvent<HTMLDivElement>, boxId: number) => {
		e.preventDefault()
		e.stopPropagation()

		if (emdeddedStore.emdeddedMovingElement?._key) {
			emdeddedStore.setReceivingElement(boxId)
		} else {
			dragEvent.onDragOver(e, boxId)
		}
	}
	const onRedefineLeave = (e: DragEvent<HTMLDivElement>, boxId: number) => {
		e.preventDefault()
		e.stopPropagation()
		if (emdeddedStore.emdeddedMovingElement?._key) {
			// setActiveLocalOver(false);
		} else {
			dragEvent.onDragLeave(e, boxId)
		}
	}
	const onRedefineDrop = (e: DragEvent<HTMLDivElement>, content: T) => {
		e.preventDefault()
		const data = e.dataTransfer.getData('application/json') || ''

		if (data.length > 0) {
			const element: TDataTransfer = JSON.parse(data)

			handleAddContent({
				element,
				sectionId: sectionId,
				contentBeforeId: content.id,
			})
			emdeddedStore.setReceivingElement(null)
			emdeddedStore.setEmdeddedMovingElement(null)
			dragEvent.onClearDrag()
		} else {
			dragEvent.onDrop(e, workData)
		}
	}
	return {
		dragRedefineEvent: {
			onRedefineOver,
			onRedefineLeave,
			onRedefineDrop,
		},
	}
}

export default useRedefineDragAndDrop
