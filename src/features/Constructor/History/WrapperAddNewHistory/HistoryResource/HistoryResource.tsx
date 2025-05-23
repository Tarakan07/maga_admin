import { Input } from '@/libs/UI'
import { ColorPicker } from '@/features/Constructor/_common/_comp'
import { useSeoStore } from '@/store/newResourceStore/history/seo/seo'
import UploadImage from '@/features/Constructor/_common/_comp/UploadImage/UploadImage'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './HistoryResource.module.scss'

const HistoryResource = () => {
	const { seoData, setSeoData, setSeoBonuses } = useSeoStore()
	const settings = useSettingStore()
	return (
		<div className={s.seo}>
			<div className={s.uploads}>
				<div className={s.inputFile_block}>
					<p>Превью</p>
					<div className={s.inputFile}>
						<UploadImage
							fileURL={seoData.preview_image}
							onChange={(e) => {
								setSeoData({ field: 'preview_image', value: e })
							}}
							idInput={'preview'}
						/>
					</div>
				</div>

				<div className={s.inputFile_block}>
					<p>История {settings.getCurrentLang('history').toUpperCase()}</p>
					<div className={s.inputFile}>
						<UploadImage
							fileURL={seoData.image}
							onChange={(e) => setSeoData({ field: 'image', value: e })}
							idInput={'historyRus'}
							resourceType="history"
						/>
					</div>
				</div>
			</div>

			<div className={s.inputs_block}>
				<Input
					placeholder={`Названия ${settings.getCurrentLang('history')}`}
					value={seoData.name}
					onChange={(e) => setSeoData({ field: 'name', value: e.target.value })}
					placeholder_type="is_shown"
				/>

				<div className={s.inputs}>
					<div className={s.inputs_promo}>
						<Input
							placeholder="Промокод"
							value={seoData.bonuses.promo_code.code}
							onChange={(e) =>
								setSeoBonuses({
									field: 'promo_code',
									value: {
										code: e.target.value,
									},
								})
							}
							placeholder_type="is_shown"
						/>
					</div>
					<div className={s.inputs_link}>
						<Input
							placeholder="Ссылка на казино"
							value={seoData.bonuses.referral.url}
							onChange={(e) =>
								setSeoBonuses({
									field: 'referral',
									value: {
										url: e.target.value,
									},
								})
							}
							placeholder_type="is_shown"
						/>
					</div>
				</div>
			</div>
			<div className={s.colorPicker}>
				<ColorPicker
					activeColor={seoData.color}
					onChange={(color) => {
						setSeoData({ field: 'color', value: color })
					}}
					label="Цвет истории"
				/>
			</div>
		</div>
	)
}

export default HistoryResource
