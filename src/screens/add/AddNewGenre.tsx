import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewGenre from '@/features/Constructor/Categories/WrapperVariantResource/WrapperAddNewGenre/WrapperAddNewGenre'
import React from 'react'

const AddNewGenre = () => {
  return (
    <WrapperLang>
      <WrapperAddNewGenre editFor='ADD' labelPage='Добавление жанра' />
    </WrapperLang>
  )

}

export default AddNewGenre