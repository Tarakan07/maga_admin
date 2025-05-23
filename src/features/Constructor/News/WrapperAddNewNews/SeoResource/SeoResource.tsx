import { Input } from '@/libs/UI'
import { useSeoStore } from '@/store/newResourceStore/news'
import { TTagResource } from '@/store/newResourceStore/type'
import { TTypeTagNews } from '@/store/newResourceStore/news/seo/seo.type'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import BindIdInput from '@/features/Constructor/_common/_comp/BindIdInput/BindIdInput'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './SeoResource.module.scss'
import ColorPicker from './../../../_common/_comp/ColorPicker/ColorPicker'

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
] as TTypeTagNews[]

const Added = (item: TTagResource) => {
	return <p>{item.title}</p>
}
const Feature = (item: TTagResource) => {
	return <p>{item.title}</p>
}

const SeoResource = () => {
	const { seoData, setSeoData, setTags } = useSeoStore()

	const settings = useSettingStore()
	return (
		<div className={s.seo}>
			<div className={s.inputFile_block}>
				<p>Обложка</p>
				<div className={s.inputFile}>
					<UploadImage
						fileURL={seoData.banner}
						onChange={(e) => setSeoData({ field: 'banner', value: e })}
						idInput={'seo-news'}
						resourceType="news"
					/>
				</div>
			</div>

			<div className={s.colorPicker}>
				<ColorPicker
					onChange={(color) => {
						setSeoData({ field: 'color', value: color })
					}}
					activeColor={seoData.color}
					label="Цвет новости"
				/>
			</div>
			<BindIdInput
				placeholder="Связывающий id "
				value={seoData.bind_id || ''}
				onChange={(e) =>
					setSeoData({ field: 'bind_id', value: e.target.value })
				}
				placeholder_type="is_shown"
			/>

			<div className={s.inputs_block}>
				<p>Meta {settings.getCurrentLang('news').toUpperCase()}</p>
				<div className={s.inputs}>
					<Input
						placeholder="Ссылка"
						value={seoData.link}
						onChange={(e) => {
							setSeoData({
								field: 'link',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Meta Title"
						value={seoData.meta_title}
						validationType="meta_title"
						onChange={(e) => {
							setSeoData({
								field: 'meta_title',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Meta Description"
						value={seoData.meta_description}
						validationType="meta_description"
						onChange={(e) => {
							setSeoData({
								field: 'meta_description',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Title"
						value={seoData.title}
						onChange={(e) => {
							setSeoData({
								field: 'title',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Description"
						value={seoData.description}
						onChange={(e) => {
							setSeoData({
								field: 'description',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>

					{/* <Select
						dataAdded={seoData.tags}
						value={testData}
						DataComponent={(e) => <Added title={e.item.title} id={e.item.id} />}
						ValueComponent={(e) => (
							<Feature title={e.item.title} id={e.item.id} />
						)}
						placeholder="Tags"
						onChange={(e) => setTags({ field: "tags", tag: e })}
					/> */}
				</div>
			</div>
		</div>
	)
}

export default SeoResource
