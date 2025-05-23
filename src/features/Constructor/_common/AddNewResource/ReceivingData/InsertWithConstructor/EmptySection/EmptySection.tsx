import React, { FC } from 'react'
import { P } from '@/libs/UI/CustomTags'
import PlusSvg from '@/_assets/svg/PlusSvg'
import { useLanguage } from '@/libs/context/LanguageProvider'
import s from './EmptySection.module.scss'
import { TDataTransfer } from '../../../types'
const EmptySection: FC<any> = ({ handleAddSection }) => {
	const { getLocalization } = useLanguage()

	const handleDrop = (e: React.DragEvent) => {
		e.preventDefault()
		const data = e.dataTransfer.getData('application/json')
		const element: TDataTransfer = JSON.parse(data)
		handleAddSection(element)
	}

	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault()
	}
	return (
		<div
			className={s.wrap}
			onClick={() => {
				handleAddSection()
			}}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
		>
			<div>
				<P size="xl">{getLocalization('Добавить новую секцию')}</P>
				<PlusSvg />
			</div>
			<P color="grey">
				{getLocalization('Нажмите сюда или перетащите контент в блок')}
			</P>
		</div>
	)
}

export default EmptySection
