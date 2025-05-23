import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { TSeoData, TSeoState } from './seo.type'
// metaRus metaEng
export const INIT_SEO_DATA: TSeoData = {
	name: '',
	link: '',
	meta_title: '',
	meta_description: '',
	demo_link: '',
	logo: '',
	bind_id: null,
}
export const useSeoStore = create<TSeoState>((set) => ({
	seoData: INIT_SEO_DATA,
	setSeoData: ({ field, value }) =>
		set((state) => {
			return {
				seoData: {
					...state.seoData,
					link:
						field === 'name' && value
							? generateLink(value)
							: state.seoData.link,
					[field]: value,
				},
			}
		}),
}))
