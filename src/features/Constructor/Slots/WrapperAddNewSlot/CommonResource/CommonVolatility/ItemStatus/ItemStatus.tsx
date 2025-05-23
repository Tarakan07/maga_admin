import { FC, useEffect } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import s from './ItemStatus.module.scss'
import { TVolatilityKey } from '../../data'
import { useCommonStore } from '@/store/newResourceStore/slots'

type TProps = {
	dataSelector: TVolatilityKey[]
	updateDataSelector: (key: TVolatilityKey) => void
}
const ItemStatus: FC<TProps> = ({ dataSelector, updateDataSelector }) => {
	const { setVolatility } = useCommonStore()
	const activeItem = dataSelector.find((e) => e.active)
	useEffect(() => {
		if (activeItem) {
            setVolatility({ value: activeItem.key })
		}
	}, [activeItem])
	return (
		<>
			{activeItem ? (
				<div className={cn(s.item, s.itemChosen, s[activeItem.key])}>
					<div className={s.box}>
						<P size="s">{activeItem.label}</P>
					</div>
					<ArrowSelectorSvg />
				</div>
			) : (
				<div className={cn(s.item, s.itemChosen, s.placeholder)}>
					<div className={s.box}>
						<P size="s">Волатильность</P>
					</div>
					<ArrowSelectorSvg />
				</div>
			)}
			{dataSelector.map((item) => {
				return (
					<div
						key={item.key}
						className={cn(s.item, s[item.key], { [s.isActive]: item.active })}
						onClick={() => updateDataSelector(item)}
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
