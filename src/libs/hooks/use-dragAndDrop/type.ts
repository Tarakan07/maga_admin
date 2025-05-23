type TParamsDrag<T extends { id: number }> = {
	setNewState: (params: T[]) => void
	state: T[]
	type: string
}

type TDragEvent<T> = {
	dragOverId: number | null
	onDragStart: (e: React.DragEvent<HTMLDivElement>, box: T) => void
	onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void
	onDragOver: (e: React.DragEvent<HTMLDivElement>, boxId: number) => void
	onDragLeave: (e: React.DragEvent<HTMLDivElement>, boxId: number) => void
	onDrop: (e: React.DragEvent<HTMLDivElement>, box: T) => void
	onClearDrag: () => void
}

type TReturnDrag<T> = {
	wrapRef: React.RefObject<HTMLDivElement>
	draggingId: number | null
	dragEvent: TDragEvent<T>
}

export type { TParamsDrag, TDragEvent, TReturnDrag }
