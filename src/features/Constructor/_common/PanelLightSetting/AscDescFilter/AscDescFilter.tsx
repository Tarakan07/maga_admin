import React from 'react'
import AscSvg from '@/_assets/svg/filters/AscSvg'
import DescSvg from '@/_assets/svg/filters/DescSvg'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { TAscDescKey } from '../type'
import s from './AscDescFilter.module.scss'
const AscDescFilter = () => {
	const { onChangeFilter, filters } = useFilter()
	const handleChange = ({ ascDesc }: { ascDesc: TAscDescKey }) => {
		onChangeFilter({ key: 'order_side', value: ascDesc })
	}

	return (
		<div
			className={s.wrapper}
			onClick={() =>
				handleChange({ ascDesc: filters.order_side === 'ASC' ? 'DESC' : 'ASC' })
			}
		>
			{filters.order_side === 'ASC' ? <AscSvg /> : <DescSvg />}
		</div>
	)
}

export default AscDescFilter
