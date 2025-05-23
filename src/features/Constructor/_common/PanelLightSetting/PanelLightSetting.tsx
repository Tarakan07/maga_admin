import { FC, useCallback, useState } from 'react'
import { InputSearch } from '@/libs/UI'
import { useInput } from '@/libs/hooks/use-input'
import { TVariantResource } from '@/store/newResourceStore/type'
import LangSelector from '@/components/LangSelector/LangSelector'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { TLangKey, useLanguage } from '@/libs/context/LanguageProvider'
import StatusFilter from './StatusFilter'
import s from './PanelLightSetting.module.scss'
import { publicatedData, statusData } from './const'
import AscDescFilter from './AscDescFilter/AscDescFilter'
import FilterCalendar from './FilterCalendar/FilterCalendar'
import PublicatedFilter from './PublicatedFilter/PublicatedFilter'
import {
	TKeySelectorName,
	TPublicatedSelector,
	TPublicatedSelectorKey,
	TStatusSelector,
	TStatusSelectorKey,
} from './type'
type TProps = {
	linkAdd?: string
	labelAdd?: string
	bindLang: {
		lang?: TLangKey
		callbackLang?: (params: TLangKey) => void
	}
	variantContent?: TVariantResource
}
const PanelLightSetting: FC<TProps> = ({ bindLang, variantContent }) => {
	const { onChangeText, value } = useInput()
	const { getLocalization } = useLanguage()
	const { reset, isThrow } = useFilter()

	const [selectors, setSelectors] = useState<{
		status: TStatusSelector[]
		publicated: TPublicatedSelector[]
	}>({
		status: statusData,
		publicated: publicatedData,
	})
	///
	const updateDataSelector = useCallback(
		(
			key: TStatusSelectorKey | TPublicatedSelectorKey,
			type: TKeySelectorName
		) => {
			setSelectors((prev) => {
				const selectedArray = prev[type]
				const findIndex = selectedArray.findIndex((e) => e.key === key)

				if (selectedArray[findIndex].active) return prev

				const newArray = selectedArray.map((e) => ({ ...e, active: false }))

				return {
					...prev,
					[type]: [
						...newArray.slice(0, findIndex),
						{ ...newArray[findIndex], active: true },
						...newArray.slice(findIndex + 1),
					],
				}
			})
		},
		[]
	)

	const handleReset = () => {
		reset()
		setSelectors({
			status: statusData,
			publicated: publicatedData,
		})
	}

	const handleResetCalendar = () => {
		setSelectors((prev) => {
			return {
				...prev,
				publicated: publicatedData,
			}
		})
	}

	return (
		<div className={s.panelLightSetting}>
			<div className={s.filters}>
				<div className={s.left}>
					<StatusFilter
						dataSelector={selectors.status}
						updateDataSelector={(key) => updateDataSelector(key, 'status')}
						keyName={'status'}
					/>
					{variantContent !== 'casino' && variantContent !== 'slots' &&  variantContent !== 'providers' && (
						<PublicatedFilter
							dataSelector={selectors.publicated}
							updateDataSelector={(key) =>
								updateDataSelector(key, 'publicated')
							}
							keyName={'publicated'}
						/>
					)}
					<AscDescFilter />
					{variantContent !== 'casino' && variantContent !== 'slots' && variantContent !== 'providers' && (
						<FilterCalendar onReset={handleResetCalendar} />
					)}
					{isThrow && (
						<button className={s.reset} onClick={handleReset}>
							Сбросить
						</button>
					)}
				</div>
				<div className={s.right}>
					<InputSearch {...{ onChangeText, value }} placeholder="Cats..." />
					{variantContent !== 'providers' && (
						<div className={s.lang}>
							<LangSelector
								activeLang={bindLang.lang || 'ru'}
								callback={(lang) => {
									if (bindLang.callbackLang) {
										bindLang.callbackLang(lang)
									}
								}}
								/>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
export default PanelLightSetting
