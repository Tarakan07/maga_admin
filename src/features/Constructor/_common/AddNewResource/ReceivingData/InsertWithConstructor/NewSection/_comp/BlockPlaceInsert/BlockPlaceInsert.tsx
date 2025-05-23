import React, { memo } from 'react'
import { P } from '@/libs/UI/CustomTags'
import { useLanguage } from '@/libs/context/LanguageProvider'
import s from './BlockPlaceInsert.module.scss'
const BlockPlaceInsert = memo(() => {
	const { getLocalization } = useLanguage()
	return (
		<div className={s.wrap}>
			<div className={s.circle} />
			<div className={s.place}>
				<P size="xss" weight={500}>
					{getLocalization('Вставить сюда')}
				</P>
			</div>
			<div className={s.circle} />
		</div>
	)
})

export default BlockPlaceInsert
