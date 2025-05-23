import { Input } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import { BASE_CDN_URL } from '@/constants/api'
import { useCommonStore } from '@/store/newResourceStore/casino'
import Select from '@/features/Constructor/_common/_comp/Select/Select'
import {
	TSetRatingsParams,
	TTypeTagCasinoCommon,
	TTypeTagCasinoCommonWallets,
} from '@/store/newResourceStore/casino/common/common.type'
import { data } from './data'
import { countries } from './countries'
import s from './CommonResource.module.scss'

const AddedTextArray = ({ item }: { item: TTypeTagCasinoCommon }) => {
	return <P>{item}</P>
}
const FeatureTextArray = ({ item }: { item: TTypeTagCasinoCommon }) => {
	return <P>{item}</P>
}
const AddedIconArray = ({ item }: { item: TTypeTagCasinoCommonWallets }) => {
	return (
		<div className={s.itemWithIcon}>
			<img src={`${BASE_CDN_URL}/${item.icon}.png`} alt="" />
			<P>{item.title}</P>
		</div>
	)
}
const FeatureIconArray = ({ item }: { item: TTypeTagCasinoCommonWallets }) => {
	return (
		<div className={s.itemWithIcon}>
			<img src={`${BASE_CDN_URL}/${item.icon}.png`} alt="" />
			<P size="xs">{item.title}</P>
		</div>
	)
}
const CommonResource = ({
	allPayments,
}: {
	allPayments: TTypeTagCasinoCommonWallets[]
}) => {
	const {
		commonData,
		setRatings,
		setSelects,
		setWallets,
		setPromos,
		setReferral,
	} = useCommonStore()

	const rulesSetRatings = ({ field, value }: TSetRatingsParams) => {
		if (Number(value) > 5.0) {
			return setRatings({ field, value: '5.0' })
		}
		if (value.length > 3) return setRatings({ field, value: value.slice(0, 3) })
		return setRatings({ field, value })
	}
	return (
		<div className={s.common}>
			<div className={s.inputs}>
				<div className={s.up}>
					<Input
						placeholder="Например 4.7"
						type="number"
						value={String(commonData.ratings.reliability)}
						onChange={(e) =>
							rulesSetRatings({ field: 'reliability', value: e.target.value })
						}
						label={'Надежность'}
					/>
					<Input
						type="number"
						placeholder="Например 4.7"
						value={commonData.ratings.withdrawal}
						onChange={(e) =>
							rulesSetRatings({ field: 'withdrawal', value: e.target.value })
						}
						label={'Вывод средств'}
					/>
				</div>
				<div className={s.down}>
					<Input
						type="number"
						placeholder="Например 4.7"
						value={commonData.ratings.speed}
						onChange={(e) =>
							rulesSetRatings({ field: 'speed', value: e.target.value })
						}
						label={'Скорость'}
					/>
					<Input
						type="number"
						placeholder="Например 4.7"
						value={commonData.ratings.playerRating}
						onChange={(e) =>
							rulesSetRatings({ field: 'playerRating', value: e.target.value })
						}
						label={'Оценка игроков'}
					/>
				</div>
			</div>
			<div className={s.selects}>
				<Select
					label="Список запрещенных стран"
					dataAdded={commonData.selects.blockedCountries}
					value={countries.ru}
					DataComponent={(e) => <AddedTextArray item={e.item} />}
					ValueComponent={(e) => <FeatureTextArray item={e.item} />}
					placeholder="Tags"
					isWithSearch={true}
					onGetTextForSearch={(e) => e}
					onChange={(e) => setSelects('blockedCountries', e)}
				/>
				<Select
					label="Языки интерфейсов"
					dataAdded={commonData.selects.languageInterfaces}
					value={data.languageInterfacesData}
					DataComponent={(e) => <AddedTextArray item={e.item} />}
					ValueComponent={(e) => <FeatureTextArray item={e.item} />}
					placeholder="Tags"
					isWithSearch={true}
					onGetTextForSearch={(e) => e}
					onChange={(e) => setSelects('languageInterfaces', e)}
				/>
				<Select
					label="Платежи"
					dataAdded={commonData.wallets}
					value={allPayments}
					DataComponent={(e) => <AddedIconArray item={{ ...e.item }} />}
					ValueComponent={(e) => <FeatureIconArray item={{ ...e.item }} />}
					placeholder="Tags"
					onChange={(e) => setWallets({ field: 'wallets', value: e })}
					isWithSearch={true}
					onGetTextForSearch={(e) => e.title}
				/>
			</div>
			<div className={s.inputs_bonuses}>
				<div className={s.bonus_title}>
					<Input
						placeholder="Промокод"
						value={commonData.promos.promoTitle}
						onChange={(e) => setPromos('promoTitle', e.target.value)}
						label={'Промокод'}
					/>
				</div>
				<div className={s.bonus_description}>
					<Input
						placeholder="Промокод"
						value={commonData.promos.promoDescription}
						onChange={(e) => setPromos('promoDescription', e.target.value)}
						label={'Описание промокода'}
					/>
				</div>
			</div>
			<div className={s.inputs_bonuses}>
				<div className={s.bonus_title}>
					<Input
						placeholder="Ссылка на казино"
						value={commonData.referral.refUrl}
						onChange={(e) => setReferral('refUrl', e.target.value)}
						label={'Ссылка на казино'}
					/>
				</div>
				<div className={s.bonus_description}>
					<Input
						placeholder="Имя кнопки"
						value={commonData.referral.refBtnTitle}
						onChange={(e) => setReferral('refBtnTitle', e.target.value)}
						label={'Имя кнопки'}
					/>
				</div>
			</div>
		</div>
	)
}

export default CommonResource
