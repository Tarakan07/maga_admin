import {
	TCategoriesBodyEdit,
	TCategoriesCreateReq,
	TCategoriesCreateRes,
	TCategoriesDeleteReq,
	TCategoriesPatchReq,
} from '@/services/API/categories/categories.type'
import { THandleEditParams } from '../CatVariantResource/CatVariantResource.type'

type TParams = {
	bindActions: {
		createItem: (params: TCategoriesCreateReq) => void
		updateItem: (params: TCategoriesPatchReq) => void
		deleteItem: (params: TCategoriesDeleteReq) => void
	}
}
export const useEditCat = ({ bindActions }: TParams) => {
	const handleEdit = (params: THandleEditParams) => {
		const { data, variantEdit } = params
		const { link, id, parent_id, title, translations } = data as TCategoriesBodyEdit
		if (variantEdit === 'remove') {
			return bindActions.deleteItem({
				id,
			})
		}
		if (variantEdit === 'create') {
			return bindActions.createItem({
				link,
				parent_id,
				title,
				translations,
			})
		}
		if (variantEdit === 'update') {
			return bindActions.updateItem({
				id,
				_body: {
					link,
					parent_id,
					title,
					translations,
				},
			})
		}
	}

	return { handleEdit }
}
