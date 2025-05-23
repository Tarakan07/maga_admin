import { TTabItem } from "@/components/Tabs/type"
import { TProvidersBody, TProvidersBodyEdit } from "@/services/API/providers/providers.type"
import { TCategoriesKeysTabs } from "@/store/newResourceStore/_common/categories/categoriesStore"

export const INIT_TABS: TTabItem<TCategoriesKeysTabs>[] = [
	{
		key: 'seo',
		label: 'SEO',
		isActive: true,
	},
	{
		key: 'review',
		label: 'Обзор',
		isActive: false,
	},
	{
		key: 'relations',
		label: 'Связи',
		isActive: false,
	},
]

export const INIT_DATA: TProvidersBodyEdit = {
	link: '',
	id: 0,
	title: '',
	hidden: false,
	translations: {
		en: {
			cat_name: '',
			title_h1: '',
			meta_title: '',
			meta_description: '',
			content: [],
		},
		ru: {
			cat_name: '',
			title_h1: '',
			meta_title: '',
			meta_description: '',
			content: [],
		},
	},
}
