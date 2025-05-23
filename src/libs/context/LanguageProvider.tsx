import { useLocation } from 'react-router-dom'
import {
	FC,
	createContext,
	useCallback,
	useContext,
	useMemo,
	useState,
} from 'react'
import { IChildren } from '@/types/IChildren'
import { dictionary } from '@/constants/dictionary'
export type TLangKey = 'ru' | 'en'
export const VARIATION_LANG: TLangKey[] = ['ru', 'en']
export type TLanguageContext = {
	lang: TLangKey
	changeLang: (lang: TLangKey) => void
	getLocalization: (word: string) => string
}
export const LanguageContext = createContext<TLanguageContext>(
	{} as TLanguageContext
)

export const useLanguage = () => {
	const context = useContext<TLanguageContext>(LanguageContext)
	return context
}

export const LanguageProvider: FC<IChildren> = ({ children }) => {
	const [lang, setLang] = useState<TLangKey>('ru')
	const location = useLocation()
	const changeLang = useCallback((langKey: TLangKey) => {
		setLang(langKey)
	}, [])

	const getLocalization = useCallback(
		(word: string): string => {
			if (lang && lang !== 'ru') {
				return dictionary[lang][word] ? dictionary[lang][word] : word
			}
			return word
		},
		[lang]
	)

	const values = useMemo(() => {
		return {
			lang,
			changeLang,
			getLocalization,
		}
	}, [lang])

	return (
		<LanguageContext.Provider value={values}>
			{children}
		</LanguageContext.Provider>
	)
}
