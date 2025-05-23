import { useEffect, useState } from 'react'
import { Calendar, DateObject } from 'react-multi-date-picker'
import cn from 'classnames'
import { Input } from '@/libs/UI'
import { CloseSvg } from '@/_assets/svg/close'
import FilterCalendarSvg from '@/_assets/svg/FilterCalendarSvg'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import { months, weekDays } from './const'
import s from './FilterCalendar.module.scss'

type TCalendarProps = {
	onReset: () => void
}

const FilterCalendar = ({ onReset }: TCalendarProps) => {
	const { filters, filterSelectors } = useFilter()
	const [dateView, setDateView] = useState<Date[]>([])
	const [isOpen, setIsOpen] = useState<boolean>(false)

	useEffect(() => {
		setDateView(
			[
				filters.from_date ? new Date(filters.from_date) : null,
				filters.to_date ? new Date(filters.to_date) : null,
			].filter((date): date is Date => date !== null)
		)

		if (!filters.from_date && !filters.to_date && dateView.length > 1) {
			setDateView([])
		}
	}, [filters.from_date, filters.to_date])

	const handleOpenCalendar = () => {
		setIsOpen(!isOpen)
	}
	const handleResetCalendar = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		filterSelectors({ keyType: 'calendar', keyValue: [] })
		onReset()
	}

	const handleDateChange = (selectedDates: DateObject[]) => {
		const selected = selectedDates.map(
			(dateObj) => new Date(dateObj.toDate().toISOString())
		)
		setDateView(selected)
		filterSelectors({ keyType: 'calendar', keyValue: selected })
		if (selected.length > 1) {
			setIsOpen(false)
		}
	}

	return (
		<div className={s.publishCalendar}>
			<div className={s.inputCalendar} onClick={handleOpenCalendar}>
				<Input
					readOnly
					className={s['input-calendar']}
					value={
						dateView.length &&
						dateView
							.map(
								(date) =>
									`${date.getDate().toString().padStart(2, '0')}-${(
										date.getMonth() + 1
									)
										.toString()
										.padStart(2, '0')}-${date.getFullYear()}`
							)
							.join(', ')
					}
					placeholder="Период публикации"
					placeholder_type="is_shown"
				/>
				{dateView.length !== 2 ? (
					<div className={cn(s.calendar, s.svg)}>
						<FilterCalendarSvg />
					</div>
				) : (
					<button className={cn(s.reset, s.svg)} onClick={handleResetCalendar}>
						<CloseSvg />
					</button>
				)}
			</div>
			{isOpen && (
				<div style={{ position: 'absolute', top: '100%', width: '100%' }}>
					<Calendar
						className={s['react-calendar']}
						onChange={handleDateChange}
						range
						value={dateView}
						weekDays={weekDays}
						months={months}
					/>
				</div>
			)}
		</div>
	)
}

export default FilterCalendar
