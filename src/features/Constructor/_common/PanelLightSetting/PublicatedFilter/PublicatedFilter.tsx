import { FC } from 'react'
import { SelectorHOC } from '@/libs/HOC'
import { useLanguage } from '@/libs/context/LanguageProvider'
import s from './PublicatedFilter.module.scss'
import ItemStatus from './ItemStatus/ItemStatus'
import {
	TKeySelectorName,
	TPublicatedSelector,
	TPublicatedSelectorKey,
} from '../type'
type TProps = {
	dataSelector: TPublicatedSelector[]
	updateDataSelector: (key: TPublicatedSelectorKey) => void
	keyName: TKeySelectorName
}
const PublicatedFilter: FC<TProps> = ({
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
export default PublicatedFilter
