import { toast } from 'react-toastify'
import { Input } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './SeoResource.module.scss'
import { useSeoStore } from '@/store/newResourceStore/slots'

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
						resourceType="slots"
					/>
				</div>
			</div>
			<Input
				placeholder="Название слота"
				value={seoData.name}
				onChange={(e) => setSeoData({ field: 'name', value: e.target.value })}
				placeholder_type="is_shown"
			/>

			<div className={s.inputs_block}>
				<p>Meta {settings.getCurrentLang('slots').toUpperCase()}</p>
				<div className={s.inputs}>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							gap: 'var(--s8)',
							cursor: 'pointer',
						}}
					>
						{seoData.bind_id && (
							<div
								onClick={() => {
									navigator.clipboard.writeText(seoData.bind_id || '')
									toast.success(`Cкопировано!`)
								}}
							>
								<P>КЛИК для копирования</P>
							</div>
						)}

						<Input
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
					</div>

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
						placeholder="Ссылка на демо"
						value={seoData.demo_link}
						onChange={(e) =>
							setSeoData({
								field: 'demo_link',
								value: e.target.value,
							})
						}
						placeholder_type="is_shown"
					/>

					{/* <Input
						placeholder="Ссылка на казино"
						value={String(seoData.casino_id.length > 0 ? seoData.casino_id.map((e) => e) : '')}
						onChange={(e) =>
							setSeoData({
								field: 'casino_id',
								value: e.target.value,
							})
						}
						placeholder_type="is_shown"
					/> */}

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
						value={seoData.name}
						onChange={(e) =>
							setSeoData({
								field: 'name',
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
