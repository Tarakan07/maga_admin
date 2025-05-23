import { TLangKey } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'

type TParams = {
	lang: TLangKey
	variantResource: TVariantResource
}

export const generateNameResource = ({
	lang,
	variantResource,
}: TParams): string => {
	const resourceTitles: Record<TVariantResource, Record<TLangKey, string>> = {
		casino: { ru: 'Казино', en: 'Casino' },
		slots: { ru: 'Слоты', en: 'Slots' },
		news: { ru: 'Новость', en: 'News' },
		articles: { ru: 'Статью', en: 'Articles' },
		history: { ru: 'Историю', en: 'History' },
		category: { ru: 'Категорию', en: 'Category' },
		providers: { ru: 'Провайдер', en: 'Provider' },
	}
	return resourceTitles[variantResource][lang]
}
