import React from 'react'
import { useParams } from 'react-router-dom'
import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewCategory from '@/features/Constructor/Categories/WrapperAddNewCategory/WrapperAddNewCategory'

const UpdateCategory = () => {
	const { itemId } = useParams()

	return (
		<WrapperLang>
			<WrapperAddNewCategory
				editFor="UPDATE"
				labelPage="Обновление категории"
				id={Number(itemId) || -1}
			/>
		</WrapperLang>
	)
}

export default UpdateCategory
