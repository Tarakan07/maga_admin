import { FC } from 'react'
import {
	useCreateCategory,
	useDeleteCategoryById,
	useGetAllCategories,
	useUpdateCategoryById,
} from '@/services/API/categories/hook'
import { WrapperCatItemEdit } from '../_comp'
import { useEditCat } from '../_hooks/use-edit-cat'
import { TCatEditProps } from '../../WrapperCat.type'
import ListEditCat from '../_comp/ListEditCat/ListEditCat'

const CatCasino: FC<TCatEditProps> = (props) => {
	const { data: categories = [], isLoading, refetch } = useGetAllCategories()
	const { mutateAsync: createItem, data } = useCreateCategory()
	const { mutateAsync: updateItem } = useUpdateCategoryById()
	const { mutateAsync: deleteItem } = useDeleteCategoryById()
	const { handleEdit } = useEditCat({
		bindActions: {
			createItem,
			deleteItem,
			updateItem,
		},
	})

	return (
		<WrapperCatItemEdit
			editActivity={props}
			handleEdit={handleEdit}
			count={categories.length}
		>
			<ListEditCat {...{ categories, handleEdit }} />
		</WrapperCatItemEdit>
	)
}
export default CatCasino
