import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { TKeySelectorName } from '@/features/Constructor/_common/PanelLightSetting/type'
import s from './SelectorHOC.module.scss'
type TProps = {
	children: ReactNode
	background?: string
	keyName?: TKeySelectorName
}
const SelectorHOC: FC<TProps> = ({
	children,
	background = 'transparent',
	keyName,
}) => {
	const { filters } = useFilter()
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [height, setHeight] = useState<string | null>(null)
	const refBlock = useRef<HTMLDivElement>(null)
	useEffect(() => {
		setHeight(`calc(var(--s21) + var(--s12) * 2)`)
	}, [])
	useEffect(() => {
		if (refBlock.current) {
			if (isOpen) {
				setHeight(`${refBlock.current.scrollHeight}px`)
			} else {
				setHeight(`calc(var(--s20) + var(--s12) * 2)`)
			}
		}
	}, [isOpen])
	///
	const handleOpenSelector = () => {
		setIsOpen((prev) => !prev)
	}
	return (
		<div className={s.wrapper}>
			{height && (
				<div
					className={s.selector}
					ref={refBlock}
					style={{ height, background: background }}
					onClick={() => handleOpenSelector()}
				>
					{children}
				</div>
			)}
		</div>
	)
}

export default SelectorHOC
