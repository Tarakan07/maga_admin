import { TVariantResource } from '@/store/newResourceStore/type'

type TVariantCatResource = TVariantResource | 'genres'

type TCatState = {
	_key: TVariantCatResource
	label: string
	isCanEdit: boolean
	isActiveEdit: boolean
	add_link: string
	update_link: string
}

type TEditCatParams = {
	_key: TVariantCatResource
	isShow: boolean
}

type TCatEditProps = {
	changeEditCat: (params: TEditCatParams) => void
} & TCatState

export type { TEditCatParams, TCatEditProps, TCatState, TVariantCatResource }
