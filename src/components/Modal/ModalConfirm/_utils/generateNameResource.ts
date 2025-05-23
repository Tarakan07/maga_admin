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
		news: { ru: 'Новость', en: 'News' },
		articles: { ru: 'Статью', en: 'Articles' },
		category: { ru: 'Категорию', en: 'Category' },
	}
	return resourceTitles[variantResource][lang]
}
