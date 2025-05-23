import { TEmbeddedContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'

type TDataTransfer = {
	item: TEmbeddedContent
	defaultContent: TContentTypeWithId<TContentTypeKey>
}

export type { TDataTransfer }
