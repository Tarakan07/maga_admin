import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import WrapperAddNewSlot from '@/features/Constructor/Slots/WrapperAddNewSlot'
import { TLocationState } from './type'

export const UpdateSlot = () => {
	const { state }: TLocationState = useLocation()
	const { bind_id } = useParams()

	return (
		<WrapperAddNewSlot
			editFor="UPDATE"
			labelPage="Обновление слота"
			id={state?.itemId}
			bind_id={state?.bind_id || bind_id}
		/>
	)
}

export default UpdateSlot
