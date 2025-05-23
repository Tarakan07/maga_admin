import { useState } from 'react'
import s from './CatEdit.module.scss'
import CatCasino from './CatVariantResource/CatCasino'
import CatArticle from './CatVariantResource/CatArticle'
import { TCatState, TEditCatParams } from '../WrapperCat.type'
import CatProvider from './CatVariantResource/CatGenre'
import { routes } from '@/constants/routes'
import CatGenre from './CatVariantResource/CatGenre'

const INIT_STATE_CAT: TCatState[] = [
	{
		_key: 'articles',
		isCanEdit: true,
		label: 'Статьи',
		isActiveEdit: false,
		add_link: '',
		update_link: '',
	},
	{
		_key: 'casino',
		isCanEdit: true,
		label: 'Казино',
		isActiveEdit: false,
		add_link: routes.ADD_CATEGORY,
		update_link: routes.UPDATE_CATEGORY,
	},
	{
		_key: 'genres',
		isCanEdit: true,
		label: 'Жанры',
		isActiveEdit: false,
		add_link: routes.ADD_GENRE,
		update_link: routes.UPDATE_GENRE,
	},
	{
		_key: 'news',
		isCanEdit: true,
		label: 'Новости',
		isActiveEdit: false,
		add_link: '',
		update_link: '',
	},
]
const CatEdit = () => {
	const [editCat, setEditCat] = useState<TCatState[]>(INIT_STATE_CAT)
	//

	const changeEditCat = (params: TEditCatParams) => {
		setEditCat((prev) => {
			const newArray = prev.map((e) => {
				if (params.isShow) {
					return {
						...e,
						isCanEdit: params._key === e._key,
						isActiveEdit: params._key === e._key,
					}
				} else {
					return { ...e, isCanEdit: true, isActiveEdit: false }
				}
			})
			return newArray
		})
	}
	return (
		<div className={s.container}>
			{editCat.map((item) => {
				if (item._key === 'casino') {
					return <CatCasino key={item._key} {...item} {...{ changeEditCat }} />
				} else if (item._key === 'articles') {
					return <CatArticle key={item._key} {...item} {...{ changeEditCat }} />
				} else if (item._key === 'genres') {
					return <CatGenre key={item._key} {...item} {...{ changeEditCat }} />
				}
				return null
			})}
		</div>
	)
}

export default CatEdit
