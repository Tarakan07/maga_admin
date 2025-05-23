import { TTypeTagArticle } from '@/store/newResourceStore/article/seo/seo.type'
import s from './Tags.module.scss'
import Select from '../../../_comp/Select/Select'
import { TParamsSetTags, TTypeTag } from './tags.type'

const testData = [
	{
		id: 1,
		title: 'Партнерские программы',
	},
	{
		id: 2,
		title: 'Аналитика слотов',
	},
	{
		id: 3,
		title: 'Интервью',
	},
	{
		id: 4,
		title: 'Правила игр',
	},
	{
		id: 5,
		title: 'Знаменитости',
	},
	{
		id: 7,
		title: 'Топ слотов',
	},
	{
		id: 8,
		title: 'Культовые казино',
	},
] as TTypeTagArticle[]

const Added = (item: TTypeTagArticle) => {
	return <p>{item.title}</p>
}
const Feature = (item: TTypeTagArticle) => {
	return <p>{item.title}</p>
}

type TTagsData = {
	dataTags: TTypeTag[]
	changeStoreData: (params: TParamsSetTags) => void
	allTags: TTypeTag[]
}

const Tags = ({ dataTags, changeStoreData, allTags }: TTagsData) => {
	return (
		<div className={s.tags}>
			<p>Теги</p>
			<Select
				dataAdded={dataTags}
				value={allTags}
				DataComponent={(e) => (
					<Added
						language={e.item.language}
						title={e.item.title}
						id={e.item.id}
					/>
				)}
				ValueComponent={(e) => (
					<Feature
						language={e.item.language}
						title={e.item.title}
						id={e.item.id}
					/>
				)}
				placeholder="Tags"
				onChange={(e) => changeStoreData({ field: 'tags', tag: e })}
			/>
		</div>
	)
}

export default Tags
