import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import WrapperAddNewCasino from '@/features/Constructor/Casino/WrapperAddNewCasino'
import { TLocationState } from './type'

export const UpdateCasino = () => {
	const { state }: TLocationState = useLocation()
	const { bind_id } = useParams()

	return (
		<WrapperAddNewCasino
			editFor="UPDATE"
			labelPage="Обновление казино"
			id={state?.itemId}
			bind_id={state?.bind_id || bind_id}
		/>
	)
}

export default UpdateCasino
