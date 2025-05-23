import { FC, ReactNode, useEffect, useState } from 'react'
import cn from 'classnames'
import { SelectorHOC } from '@/libs/HOC'
import { P } from '@/libs/UI/CustomTags'
import { ArrowSelectorSvg } from '@/_assets/svg/arrows'
import { TLangKey } from '@/libs/context/LanguageProvider'
import s from './LangSelector.module.scss'
import LangSvg from '../../_assets/svg/LangSvg'
type TState = {
	icon: ReactNode
	key: TLangKey
	isActive: boolean
}
type TProps = {
	activeLang: TLangKey
	callback: (params: TLangKey) => void
	isActiveSelector?: boolean
}
const LangSelector: FC<TProps> = ({
	callback,
	activeLang,
	isActiveSelector = true,
}) => {
	const [langSelector, setLangSelector] = useState<TState[]>([
		{
			icon: <LangSvg langKey="ru" />,
			key: 'ru',
			isActive: false,
		},
		{
			icon: <LangSvg langKey="en" />,
			key: 'en',
			isActive: false,
		},
	] as TState[])
	const activeItem = langSelector.find((e) => e.isActive)
	useEffect(() => {
		setLangSelector((prev) => {
			return prev.map((l) => {
				if (l.key === activeLang) return { ...l, isActive: true }
				return { ...l, isActive: false }
			})
		})
	}, [activeLang])
	return (
		<>
			{isActiveSelector ? (
				<SelectorHOC background="var(--casino-bg-blue-purple)">
					{activeItem && (
						<div className={cn(s.item, s.itemChosen, s[activeItem.key])}>
							<div className={s.box}>
								{activeItem.icon}
								<P size="xs">{activeItem.key.toUpperCase()}</P>
							</div>
							<ArrowSelectorSvg />
						</div>
					)}

					{langSelector.map((item) => {
						return (
							<div
								key={item.key}
								className={cn(s.item, s[item.key], {
									[s.isActive]: item.isActive,
								})}
								onClick={() => callback(item.key)}
							>
								<div className={s.box}>
									{item.icon}
									<P size="xs">{item.key.toUpperCase()}</P>
								</div>
							</div>
						)
					})}
				</SelectorHOC>
			) : (
				<>
					{activeItem && (
						<div className={s.currentLang}>
							{activeItem.icon}
							<P size="xs">{activeItem.key.toUpperCase()}</P>
						</div>
					)}
				</>
			)}
		</>
	)
}
export default LangSelector
