import { create } from 'zustand'
import { generateLink } from '@/libs/utils/generateLink'
import { TSeoData, TSeoState } from './seo.type'
// metaRus metaEng
export const INIT_SEO_DATA: TSeoData = {
	btn_url: '',
	color: '',
	meta_title: '',
	meta_description: '',
	title: '',
	description: '',
	tags: [],
	link: '',
	banner: '',
}
export const useSeoStore = create<TSeoState>((set) => ({
	seoData: INIT_SEO_DATA,
	setSeoData: ({ field, value }) =>
		set((state) => {
			return {
				seoData: {
					...state.seoData,
					link: field === 'title' ? generateLink(value) : state.seoData.link,
					[field]: value,
				},
			}
		}),
	setTags: ({ field, tag }) =>
		set((state) => {
			const findIndex = state.seoData.tags.findIndex((e) => e.id === tag.id)
			const tags = [...state.seoData.tags]
			if (findIndex > -1) {
				return {
					seoData: {
						...state.seoData,
						tags: [...tags.slice(0, findIndex), ...tags.slice(findIndex + 1)],
					},
				}
			} else {
				return {
					seoData: {
						...state.seoData,
						tags: [
							...tags,
							{ language: tag.language, title: tag.title, id: tag.id },
						],
					},
				}
			}
		}),
}))
