import { toast } from 'react-toastify'
import { TLangKey } from '../context/LanguageProvider'

type TParams = {
	status: 'fulfilled' | 'rejected'
	lang: TLangKey
}
export const toastGetItemLang = ({ lang, status }: TParams) => {
	if (status === 'fulfilled') {
		toast.success(`Получена ${lang} версия`)
	}
	if (status === 'rejected') {
		toast.warning(`Ошибка получения ${lang}`)
	}
}
