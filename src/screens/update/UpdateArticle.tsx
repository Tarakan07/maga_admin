import { useLocation, useParams } from 'react-router-dom'
import WrapperAddNewArticle from '@/features/Constructor/Article/WrapperAddNewArticle'
import { TLocationState } from './type'

export const UpdateArticle = () => {
	const { state }: TLocationState = useLocation()
	const { bind_id } = useParams()

	return (
		<WrapperAddNewArticle
			editFor="UPDATE"
			labelPage="Обновление статьи"
			id={state?.itemId}
			bind_id={state?.bind_id || bind_id}
		/>
	)
}

export default UpdateArticle
