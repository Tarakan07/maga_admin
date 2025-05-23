import { useLocation } from 'react-router-dom'
import WrapperAddNewHistory from '@/features/Constructor/History/WrapperAddNewHistory'
import { TLocationState } from './type'

export const UpdateHistory = () => {
	const { state }: TLocationState = useLocation()
	return (
		<WrapperAddNewHistory
			editFor="UPDATE"
			labelPage="Обновление истории"
			id={state.itemId}
		/>
	)
}

export default UpdateHistory
