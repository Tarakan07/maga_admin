import { FC } from 'react'
import { useGetAllCategories } from '@/services/API/categories/hook'
import { TCatEditProps } from '../../WrapperCat.type'

const CatArticle: FC<TCatEditProps> = (props) => {
	// const [categories, setCategory] = useState<TCategory[]>(CATEGORY)
	///get all
	const { data: categories = [], isLoading, refetch } = useGetAllCategories()

	const handleGetAll = () => {
		return []
	}
	const handleUpdate = () => {}
	const handleCreate = () => {}
	return null
	// <WrapperTagsItemEdit editActivity={props}>
	// 	{null}
	// 	{/* <ListEditTags {...{ categories }} /> */}
	// </WrapperTagsItemEdit>
}
export default CatArticle
