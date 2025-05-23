import { Input } from '@/libs/UI'
import { useSeoStore } from '@/store/newResourceStore/article'
import { ColorPicker } from '@/features/Constructor/_common/_comp'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import BindIdInput from '@/features/Constructor/_common/_comp/BindIdInput/BindIdInput'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './SeoResource.module.scss'

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
						onChange={(e) => {
							setSeoData({ field: 'banner', value: e })
						}}
						idInput={'seo'}
						resourceType="article"
					/>
				</div>
			</div>

			<div className={s.colorPicker}>
				<ColorPicker
					label="Цвет новости"
					activeColor={seoData.color}
					onChange={(color) => {
						setSeoData({ field: 'color', value: color })
					}}
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
			<Input
				placeholder="Ссылка на кнопку"
				label="Ссылка на кнопку"
				value={seoData.btn_url}
				onChange={(e) =>
					setSeoData({ field: 'btn_url', value: e.target.value })
				}
				placeholder_type="is_shown"
			/>
			<div className={s.inputs_block}>
				<p>Meta {settings.getCurrentLang('articles').toUpperCase()}</p>
				<div className={s.inputs}>
					<Input
						placeholder="Ccылка"
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
						onChange={(e) =>
							setSeoData({
								field: 'meta_description',
								value: e.target.value,
							})
						}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Title"
						value={seoData.title}
						onChange={(e) =>
							setSeoData({
								field: 'title',
								value: e.target.value,
							})
						}
						placeholder_type="is_shown"
					/>
					<Input
						placeholder="Description"
						value={seoData.description}
						onChange={(e) =>
							setSeoData({
								field: 'description',
								value: e.target.value,
							})
						}
						placeholder_type="is_shown"
					/>
				</div>
			</div>
		</div>
	)
}

export default SeoResource
