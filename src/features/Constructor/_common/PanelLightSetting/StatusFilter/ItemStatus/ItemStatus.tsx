import { FC, useEffect } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import s from './ItemStatus.module.scss'
import { TStatusSelector, TStatusSelectorKey } from '../../type'

type TProps = {
	dataSelector: TStatusSelector[]
	updateDataSelector: (key: TStatusSelectorKey) => void
}
const ItemStatus: FC<TProps> = ({ dataSelector, updateDataSelector }) => {
	const { filterSelectors } = useFilter()
	const activeItem = dataSelector.find((e) => e.active)
	useEffect(() => {
		if (activeItem) {
			filterSelectors({ keyType: 'status', keyValue: activeItem.key })
		}
	}, [activeItem])
	return (
		<>
			{activeItem ? (
				<div className={cn(s.item, s.itemChosen, s[activeItem.key])}>
					<div className={s.box}>
						{activeItem.key !== 'all' && <div />}
						<P size="s">{activeItem.label}</P>
					</div>
					<ArrowSelectorSvg />
				</div>
			) : (
				<div className={cn(s.item, s.itemChosen, s.placeholder)}>
					<div className={s.box}>
						<P size="s">Статус</P>
					</div>
					<ArrowSelectorSvg />
				</div>
			)}
			{dataSelector.map((item) => {
				return (
					<div
						key={item.key}
						className={cn(s.item, s[item.key], { [s.isActive]: item.active })}
						onClick={() => updateDataSelector(item.key)}
					>
						<div className={s.box}>
							<div />
							<P size="s">{item.label}</P>
						</div>
					</div>
				)
			})}
		</>
	)
}
export default ItemStatus
