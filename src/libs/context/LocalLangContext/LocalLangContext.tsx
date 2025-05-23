import React, {
	FC,
	PropsWithChildren,
	createContext,
	useContext,
	useState,
} from 'react'
import { TLangKey } from '../LanguageProvider'
import { TLocalLangContextProps } from './type'

export type TLocalLangContext = TLocalLangContextProps
export const LocalLangContext = createContext<TLocalLangContext>(
	{} as TLocalLangContext
)
export const useLang = () => {
	const context = useContext<TLocalLangContext>(LocalLangContext)
	return context
}

export const LangProvider: FC<PropsWithChildren> = ({ children }) => {
	const [lang, setLang] = useState<TLangKey>('ru')

	const handleChangeLang = (value: TLangKey) => {
		setLang(value)
	}
	const values = {
		lang,
		handleChangeLang,
	}

	return (
		<LocalLangContext.Provider value={values}>
			{children}
		</LocalLangContext.Provider>
	)
}
