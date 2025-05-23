import React, { useRef, useState } from 'react'
import { TParamsDrag, TReturnDrag } from './type'

const useDragAndDrop = <T extends { id: number }>({
	setNewState,
	state,
	type,
}: TParamsDrag<T>): TReturnDrag<T> => {
	const [activeElement, setActiveElement] = useState<T | null>(null)
	const [draggingId, setDraggingId] = useState<number | null>(null)
	const [dragOverId, setDragOverId] = useState<number | null>(null)
	const [draggedType, setDraggedType] = useState<string | null>(null)
	const wrapRef = useRef<HTMLDivElement>(null)

	const onDragStart = (e: React.DragEvent<HTMLDivElement>, box: T): void => {
		e.stopPropagation()

		setActiveElement(box)
		setDraggingId(box.id)
		setDraggedType(type)

		if (wrapRef.current) {
			e.dataTransfer.setDragImage(wrapRef.current, 0, 0)
		}
	}

	const onDragEnd = (e: React.DragEvent<HTMLDivElement>): void => {
		e.stopPropagation()
		setDragOverId(null)
		setDraggingId(null)
		setDraggedType(null)
	}

	const onDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		boxId: number
	): void => {
		e.preventDefault()
		e.stopPropagation()

		if (draggedType === type) {
			setDragOverId(boxId)
		}

		if (activeElement && wrapRef.current && e.target === wrapRef.current) {
			return
		}
	}

	const onDragLeave = (
		e: React.DragEvent<HTMLDivElement>,
		boxId: number
	): void => {
		e.preventDefault()
		e.stopPropagation()

		if (dragOverId === boxId) {
			// setDragOverId(null);
		}
	}

	const onDrop = (e: React.DragEvent<HTMLDivElement>, box: T): void => {
		e.stopPropagation()

		if (draggedType !== type) {
			return
		}

		if (activeElement) {
			const newState = state.filter((el) => el.id !== activeElement.id)
			const boxIndex = state.findIndex((el) => el.id === box.id)

			if (boxIndex !== -1) {
				newState.splice(boxIndex + 1, 0, activeElement)
			}
			setActiveElement(null)

			setNewState(newState)
		}

		setDragOverId(null)
		setDraggingId(null)
		setDraggedType(null)
	}

	const onClearDrag = () => {
		setActiveElement(null)
		setDragOverId(null)
		setDraggingId(null)
		setDraggedType(null)
	}

	return {
		wrapRef,
		draggingId,
		dragEvent: {
			dragOverId,
			onDragStart,
			onDragEnd,
			onDragOver,
			onDragLeave,
			onDrop,
			onClearDrag,
		},
	}
}

export default useDragAndDrop
