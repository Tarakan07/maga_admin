import { Input } from '@/libs/UI'
import { useSeoStore } from '@/store/newResourceStore/casino'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import BindIdInput from '@/features/Constructor/_common/_comp/BindIdInput/BindIdInput'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './SeoResource.module.scss'

const SeoResource = () => {
	const { seoData, setSeoData } = useSeoStore()
	const settings = useSettingStore()
	return (
		<div className={s.seo}>
			<div className={s.inputFile_block}>
				<p>Логотип</p>
				<div className={s.inputFile}>
					<UploadImage
						fileURL={seoData.logo}
						onChange={(e) => setSeoData({ field: 'logo', value: e })}
						idInput={'seo'}
						resourceType="casino"
					/>
				</div>
			</div>
			<Input
				placeholder="Название казино"
				value={seoData.name}
				onChange={(e) => setSeoData({ field: 'name', value: e.target.value })}
				placeholder_type="is_shown"
			/>

			<div className={s.inputs_block}>
				<p>Meta {settings.getCurrentLang('casino').toUpperCase()}</p>
				<div className={s.inputs}>
					<BindIdInput
						placeholder="Связывающий id "
						value={seoData.bind_id || ''}
						onChange={(e) => {
							setSeoData({
								field: 'bind_id',
								value: e.target.value,
							})
						}}
						placeholder_type="is_shown"
					/>

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
