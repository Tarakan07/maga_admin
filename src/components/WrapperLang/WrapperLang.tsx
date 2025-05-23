import React, { FC, ReactNode } from 'react'
import { LangProvider } from '@/libs/context/LocalLangContext/LocalLangContext'

type TProps = {
	children: ReactNode
}

const WrapperLang: FC<TProps> = ({ children }) => {
	return <LangProvider>{children}</LangProvider>
}

export default WrapperLang
