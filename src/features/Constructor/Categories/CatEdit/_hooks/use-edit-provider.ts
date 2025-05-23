import {
	TProvidersBodyEdit,
	TProvidersCreateReq,
	TProvidersDeleteReq,
	TProvidersPatchReq,
} from '@/services/API/providers/providers.type'
import { THandleEditParams } from '../CatVariantResource/CatVariantResource.type'

type TParams = {
	bindActions: {
		createItem: (params: TProvidersCreateReq) => void
		updateItem: (params: TProvidersPatchReq) => void
		deleteItem: (params: TProvidersDeleteReq) => void
	}
}
export const useEditCat = ({ bindActions }: TParams) => {
	const handleEdit = (params: THandleEditParams) => {
		const { data, variantEdit } = params
		const { link, id, title, translations, hidden } = data as TProvidersBodyEdit
		if (variantEdit === 'remove') {
			return bindActions.deleteItem({
				id,
			})
		}
		if (variantEdit === 'create') {
			return bindActions.createItem({
				hidden,
				link,
				title,
				translations,
			})
		}
		if (variantEdit === 'update') {
			return bindActions.updateItem({
				id,
				_body: {
					hidden,
					link,
					title,
					translations,
				},
			})
		}
	}

	return { handleEdit }
}
