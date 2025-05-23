import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewProvider from '@/features/Constructor/Providers/WrapperAddNewProvider/WrapperAddNewProvider'
import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateProvider = () => {
	const { itemId } = useParams()

  return (
    <WrapperLang>
      <WrapperAddNewProvider editFor='UPDATE' labelPage='Обновление провайдера' id={Number(itemId) || -1} />
    </WrapperLang>
  )
}

export default UpdateProvider