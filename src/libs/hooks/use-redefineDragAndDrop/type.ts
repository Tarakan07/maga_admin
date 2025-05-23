import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import { TDragEvent } from '../use-dragAndDrop/type'

type TParamsRedefineDrag<
	T extends
		| IConstructorContentSectionWithId
		| TContentTypeWithId<TContentTypeKey>,
> = {
	dragEvent: TDragEvent<T>
	workData: T
	sectionId: IConstructorSectionId
}

type TRedefineDragEvent<T> = {
	onRedefineOver: (e: React.DragEvent<HTMLDivElement>, boxId: number) => void
	onRedefineLeave: (e: React.DragEvent<HTMLDivElement>, boxId: number) => void
	onRedefineDrop: (e: React.DragEvent<HTMLDivElement>, box: T) => void
}

type TRedefineReturnDrag<T> = {
	dragRedefineEvent: TRedefineDragEvent<T>
}
export type { TParamsRedefineDrag, TRedefineDragEvent, TRedefineReturnDrag }
