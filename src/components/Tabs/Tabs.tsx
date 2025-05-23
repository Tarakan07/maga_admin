import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import s from './Tabs.module.scss'
import { TTabsProps } from './type'
const Tabs = <T,>({ data, callback, saveData }: TTabsProps<T>) => {
	return (
		<div className={s.tabs}>
			{data.map((tab) => {
				return (
					<div
						key={String(tab.key)}
						onClick={() => {
							saveData()
							callback(tab.key)
						}}
						className={cn(s.tab, { [s.active]: tab.isActive })}
					>
						<P size="s">{tab.label}</P>
					</div>
				)
			})}
		</div>
	)
}
export default Tabs
