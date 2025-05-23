import { FC, useEffect } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import s from './ItemStatus.module.scss'
import { TPublicatedSelector, TPublicatedSelectorKey } from '../../type'

type TProps = {
	dataSelector: TPublicatedSelector[]
	updateDataSelector: (key: TPublicatedSelectorKey) => void
}
const ItemStatus: FC<TProps> = ({ dataSelector, updateDataSelector }) => {
	const { filterSelectors } = useFilter()
	const activeItem = dataSelector.find((e) => e.active)

	useEffect(() => {
		if (activeItem) {
			filterSelectors({ keyType: 'publicated', keyValue: activeItem.key })
		}
	}, [activeItem])

	return (
		<>
			<div
				className={cn(s.item, s.itemChosen, {
					[s.placeholder]: !activeItem,
				})}
			>
				<div className={s.box}>
					<P size="s">{activeItem ? activeItem.label : 'Публикации'}</P>
				</div>
				<ArrowSelectorSvg />
			</div>

			{dataSelector.map((item) => {
				return (
					<div
						key={item.key}
						className={cn(s.item, s[item.key], { [s.isActive]: item.active })}
						onClick={() => updateDataSelector(item.key)}
					>
						<div className={s.box}>
							<P size="s">{item.label}</P>
						</div>
					</div>
				)
			})}
		</>
	)
}
export default ItemStatus
