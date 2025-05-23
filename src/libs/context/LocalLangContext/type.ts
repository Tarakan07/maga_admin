import { TLangKey } from '../LanguageProvider'

type TLocalLangContextProps = {
	lang: TLangKey
	handleChangeLang: (value: TLangKey) => void
}

export type { TLocalLangContextProps }
