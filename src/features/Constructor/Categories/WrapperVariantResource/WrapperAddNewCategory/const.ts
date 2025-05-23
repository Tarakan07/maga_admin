import { TTabItem } from "@/components/Tabs/type";
import { TCategoriesRes } from "@/services/API/categories/categories.type";
import { TCategoriesKeysTabs } from "@/store/newResourceStore/_common/categories/categoriesStore";

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
]
export const INIT_DATA: TCategoriesRes = {
	link: '',
	id: 0,
	title: '',
    parent_id: 0,
    children: [],
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
			content: []
		},
	},
}