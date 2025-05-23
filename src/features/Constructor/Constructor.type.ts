import { TLocationState } from '@/screens/update/type'
import { TVariantRequest } from '@/store/newResourceStore/type'

type TVariantOpenPage = {
	editFor: TVariantRequest
	labelPage: string
	id?: TLocationState['state']['itemId']
	bind_id?: TLocationState['state']['bind_id']
}

export type { TVariantOpenPage }
