import { Input } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import Select from '@/features/Constructor/_common/_comp/Select/Select'
import { data, infoProps, TVolatilityKey, volatilityData } from './data'
import s from './CommonResource.module.scss'
import { useCommonStore } from '@/store/newResourceStore/slots'
import { TCommonData, TTypeTagSlotsCommon } from '@/store/newResourceStore/slots/common/common.type'
import CommonVolatility from './CommonVolatility/CommonVolatility'
import { useEffect, useState } from 'react'

const AddedTextArray = ({ item }: { item: TTypeTagSlotsCommon }) => {
	return <P>{item}</P>
}
const FeatureTextArray = ({ item }: { item: TTypeTagSlotsCommon }) => {
	return <P>{item}</P>
}
const CommonResource = ({
}: {
}) => {
	const {
		commonData,
		setSelects,
		setInfo,
	} = useCommonStore()
	const [volatilitySelector, setVolatilitySelector] = useState<TVolatilityKey[]>(volatilityData)

	useEffect(() => {
		if(!!commonData.volatility) {
			setVolatilitySelector((prev) => {
				const findIndex = prev.findIndex((e) => e.key === commonData.volatility)
				if (prev[findIndex].active) return prev
				const newArray = prev.map((e, index) => ({
					...e,
					active: index === findIndex,
				}))
				return newArray
			})
		}
	}, [])

	const handleUpdateVolatility = (item: TVolatilityKey) => {
		setVolatilitySelector((prev) => {
			const findIndex = prev.findIndex((e) => e.key === item.key)
			if (prev[findIndex].active) return prev
			const newArray = prev.map((e, index) => ({
				...e,
				active: index === findIndex,
			}))
			return newArray
		})
	}

	return (
		<div className={s.common}>
			<div className={s.wrap}>
				<div className={s.inputs}>
					<div className={s.left}>
						{Object.entries(infoProps).slice(0, Object.entries(infoProps).length / 2).map(([key, value]) => (
							<Input
								key={key}
								placeholder={value.placeholder}
								placeholder_type='is_shown'
								type={value.type}
								value={commonData.info[key as keyof TCommonData['info']]}
								onChange={(e) => setInfo({ field: key as keyof TCommonData['info'], value: e.target.value })}
							/>
						))}
					</div>
					<div className={s.right}>
						{Object.entries(infoProps).slice(Object.entries(infoProps).length / 2, Object.entries(infoProps).length).map(([key, value]) => (
							<Input
								key={key}
								placeholder={value.placeholder}
								placeholder_type='is_shown'
								type={value.type}
								value={commonData.info[key as keyof TCommonData['info']]}
								onChange={(e) => setInfo({ field: key as keyof TCommonData['info'], value: e.target.value })}
							/>
						))}
					</div>
				</div>
				<CommonVolatility dataSelector={volatilitySelector} updateDataSelector={handleUpdateVolatility} />
			</div>
			<div className={s.selects}>
				<Select
					label="Доп.функции слота"
					dataAdded={commonData.selects.extra_functions}
					value={data.additionalFunc}
					DataComponent={(e) => <AddedTextArray item={e.item} />}
					ValueComponent={(e) => <FeatureTextArray item={e.item} />}
					placeholder="Доп.функции"
					onGetTextForSearch={(e) => e}
					onChange={(e) => setSelects({field: 'extra_functions', value: e})}
				/>
				<Select
					label="Языки интерфейсов"
					dataAdded={commonData.selects.languages}
					value={data.languageInterfacesData}
					DataComponent={(e) => <AddedTextArray item={e.item} />}
					ValueComponent={(e) => <FeatureTextArray item={e.item} />}
					placeholder="Языки"
					onGetTextForSearch={(e) => e}
					onChange={(e) => setSelects({field: 'languages', value: e})}
				/>
				<Select
					label="Доступные платформы"
					dataAdded={commonData.selects.platforms}
					value={data.availablePlatforms}
					DataComponent={(e) => <AddedTextArray item={e.item} />}
					ValueComponent={(e) => <FeatureTextArray item={e.item} />}
					placeholder="Платформы"
					onChange={(e) => setSelects({ field: 'platforms', value: e })}
					onGetTextForSearch={(e) => e}
				/>
			</div>
		</div>
	)
}

export default CommonResource
