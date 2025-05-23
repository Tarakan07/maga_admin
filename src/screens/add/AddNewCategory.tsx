import React from 'react'
import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewCategory from '@/features/Constructor/Categories/WrapperVariantResource/WrapperAddNewCategory/WrapperAddNewCategory'

const AddNewCategory = () => {
	return (
		<WrapperLang>
			<WrapperAddNewCategory editFor="ADD" labelPage="Добавление категории" />
		</WrapperLang>
	)
}

export default AddNewCategory
