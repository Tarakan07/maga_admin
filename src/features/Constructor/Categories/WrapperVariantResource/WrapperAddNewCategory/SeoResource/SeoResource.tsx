import React from 'react'
import { Input } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import s from './SeoResource.module.scss'
import { THandleChangeFromParams, TStateModalCat } from '../type'

type TProps = {
	formData: TStateModalCat
	handleChangeForm: ({ key, value, lang }: THandleChangeFromParams) => void
}

const SeoResource = ({ formData, handleChangeForm }: TProps) => {
	const { lang, handleChangeLang } = useLang()

	return (
		<div className={s.wrapForm}>
			<div className={s.seoCommon}>
				<Input
					placeholder="Title"
					placeholder_type="is_shown"
					value={formData.title}
					onChange={(e) =>
						handleChangeForm({
							key: 'title',
							value: e.target.value,
						})
					}
				/>
				<Input
					placeholder="Link"
					value={formData.link}
					placeholder_type="is_shown"
					onChange={(e) =>
						handleChangeForm({
							key: 'link',
							value: e.target.value,
						})
					}
				/>
			</div>

			<div className={s.seoByLang}>
				<P>Контент по языку</P>
				<Input
					placeholder={`Cat name ${lang.toUpperCase()}`}
					placeholder_type="is_shown"
					value={formData.translations[lang].cat_name}
					onChange={(e) =>
						handleChangeForm({
							key: 'cat_name',
							value: e.target.value,
							lang,
						})
					}
				/>
				<Input
					placeholder={`H1 ${lang.toUpperCase()}`}
					placeholder_type="is_shown"
					value={formData.translations[lang].title_h1}
					onChange={(e) =>
						handleChangeForm({
							key: 'title_h1',
							value: e.target.value,
							lang,
						})
					}
				/>
				{/* <ContentHTML 
                            placeholder={`Description ${lang.toUpperCase()}`}
                            value={formData.translations[lang].description}
                            onChange={(e) => 
                                handleChangeForm({
                                    key: 'description',
                                    value: e,
                                    lang
                                })
                            }
                        /> */}
				<Input
					placeholder={`Meta Title ${lang.toUpperCase()}`}
					placeholder_type="is_shown"
					value={formData.translations[lang].meta_title}
					onChange={(e) =>
						handleChangeForm({
							key: 'meta_title',
							value: e.target.value,
							lang,
						})
					}
				/>
				<Input
					placeholder={`Meta description ${lang.toUpperCase()}`}
					placeholder_type="is_shown"
					value={formData.translations[lang].meta_description}
					onChange={(e) =>
						handleChangeForm({
							key: 'meta_description',
							value: e.target.value,
							lang,
						})
					}
				/>
			</div>
		</div>
	)
}

export default SeoResource
