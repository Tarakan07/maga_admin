import React from 'react'
import { Button } from '@/libs/UI/CustomTags'
import { useLanguage } from '@/libs/context/LanguageProvider'
import s from './ActionRightBlock.module.scss'
type TProps = {
	isActiveEdit: boolean
	save: () => void
	reset: () => void
	changeActive: () => void
}
const ActionRightBlock = ({
	changeActive,
	isActiveEdit,
	reset,
	save,
}: TProps) => {
	const { getLocalization } = useLanguage()
	return (
		<div className={s.wrap}>
			{!isActiveEdit && (
				<Button type="primary" onClick={changeActive}>
					{getLocalization('Редактировать')}
				</Button>
			)}
			{isActiveEdit && (
				<Button
					type="secondary"
					onClick={() => {
						reset()
						changeActive()
					}}
				>
					{getLocalization('Отменить')}
				</Button>
			)}
			{isActiveEdit && (
				<Button
					type="primary"
					onClick={() => {
						save()
						changeActive()
					}}
				>
					{getLocalization('Сохранить')}
				</Button>
			)}
		</div>
	)
}

export default ActionRightBlock
