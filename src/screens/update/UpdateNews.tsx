import { useLocation, useParams } from 'react-router-dom'
import WrapperAddNewNews from '@/features/Constructor/News/WrapperAddNewNews'
import { TLocationState } from './type'

export const UpdateNews = () => {
	const { state }: TLocationState = useLocation()
	const { bind_id } = useParams()

	return (
		<WrapperAddNewNews
			editFor="UPDATE"
			labelPage="Обновление новости"
			id={state?.itemId}
			bind_id={state?.bind_id || bind_id}
		/>
	)
}

export default UpdateNews
