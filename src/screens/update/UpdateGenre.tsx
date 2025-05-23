import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewGenre from '@/features/Constructor/Categories/WrapperVariantResource/WrapperAddNewGenre/WrapperAddNewGenre'
import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateGenre = () => {
	const { itemId } = useParams()

  return (
    <WrapperLang>
      <WrapperAddNewGenre editFor='UPDATE' labelPage='Обновление жанра' id={Number(itemId) || -1} />
    </WrapperLang>
  )
}

export default UpdateGenre