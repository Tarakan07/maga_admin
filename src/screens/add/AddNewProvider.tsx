import WrapperLang from '@/components/WrapperLang/WrapperLang'
import WrapperAddNewProvider from '@/features/Constructor/Providers/WrapperAddNewProvider/WrapperAddNewProvider'
import React from 'react'

const AddNewProvider = () => {
  return (
    <WrapperLang>
      <WrapperAddNewProvider editFor='ADD' labelPage='Добавление провайдера' />
    </WrapperLang>
  )

}

export default AddNewProvider