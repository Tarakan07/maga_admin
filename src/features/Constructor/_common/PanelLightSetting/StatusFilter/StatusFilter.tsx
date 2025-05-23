import { FC } from 'react'
import { SelectorHOC } from '@/libs/HOC'
import { useLanguage } from '@/libs/context/LanguageProvider'
import s from './StatusFilter.module.scss'
import ItemStatus from './ItemStatus/ItemStatus'
import { TKeySelectorName, TStatusSelector, TStatusSelectorKey } from '../type'
type TProps = {
	dataSelector: TStatusSelector[]
	updateDataSelector: (key: TStatusSelectorKey) => void
	keyName: TKeySelectorName
}
const StatusFilter: FC<TProps> = ({
	dataSelector,
	updateDataSelector,
	keyName,
}) => {
	const { getLocalization } = useLanguage()

	return (
		<div className={s.wrap}>
			<SelectorHOC keyName={keyName} background="var(--casino-bg-blue-grey)">
				<ItemStatus {...{ dataSelector, updateDataSelector }} />
			</SelectorHOC>
		</div>
	)
}
export default StatusFilter
