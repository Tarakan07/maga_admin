import Calendar from 'react-calendar'
import { useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import { Input } from '@/libs/UI'
import EditSvg from '@/_assets/svg/EditSvg'
import { Button } from '@/libs/UI/CustomTags'
import CalendarSvg from '@/_assets/svg/CalendarSvg'
import s from './PublishCalendar.module.scss'

type TProps = {
	value: string
	onChange: (value: string) => void
}

const PublishCalendar = ({ value, onChange }: TProps) => {
	const initialMinDate = new Date()
	const [stateDate, setStateDate] = useState<Date>(new Date())
	const [stateTime, setStateTime] = useState({
		hours: '',
		minutes: '',
	})
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [calendarPosition, setCalendarPosition] = useState<'top' | 'bottom'>(
		'bottom'
	)
	const inputRef = useRef<HTMLInputElement | null>(null)

	useEffect(() => {
		const currentDate = new Date(value)
		currentDate.setHours(currentDate.getHours() - 3)

		setStateDate(currentDate)
		setStateTime({
			hours: String(currentDate.getHours()),
			minutes: String(currentDate.getMinutes()),
		})
	}, [value])

	const onDateChange = (date: Date) => {
		setStateDate(date)
		setIsOpen(false)
	}

	const getLocalISOString = (date: Date) => {
		const tzOffset = new Date().getTimezoneOffset() * 60000
		return new Date(date.getTime() - tzOffset).toISOString()
	}

	useEffect(() => {
		if (!isEdit) {
			const updatedDate = new Date(
				stateDate.getFullYear(),
				stateDate.getMonth(),
				stateDate.getDate(),
				Number(stateTime.hours),
				Number(stateTime.minutes)
			)
			const currentDate = new Date(value)
			currentDate.setHours(currentDate.getHours() - 3)
			const localISODate = getLocalISOString(updatedDate)
			const localValueISO = getLocalISOString(currentDate)

			if (localISODate !== localValueISO) {
				onChange(localISODate)
			}
		}
	}, [stateDate, stateTime, isEdit])

	const handleChangeTime = ({
		value,
		type,
	}: {
		value: string
		type: 'hours' | 'minutes'
	}) => {
		setStateTime((prev) => {
			let currentValue = value
			if (type === 'hours') {
				if (value.length > 2) currentValue = value.slice(0, 2)
				if (Number(value) > 23) currentValue = '23'
			} else if (type === 'minutes') {
				if (value.length > 2) currentValue = value.slice(0, 2)
				if (Number(value) > 59) currentValue = '59'
			}

			return {
				...prev,
				[type]: currentValue,
			}
		})
	}

	const handleSave = () => {
		setStateTime((prev) => {
			let currentHours = prev.hours
			let currentMinutes = prev.minutes
			if (prev.hours.length <= 0)
				currentHours = String(initialMinDate.getHours())

			if (prev.minutes.length <= 0)
				currentMinutes = String(initialMinDate.getMinutes())

			return {
				hours: currentHours,
				minutes: currentMinutes,
			}
		})
		setIsEdit(false)
	}

	const handleOpenCalendar = () => {
		if (inputRef.current) {
			const { bottom } = inputRef.current.getBoundingClientRect()
			const calendarHeight = 300
			const availableSpaceBelow = window.innerHeight - bottom

			if (availableSpaceBelow < calendarHeight) {
				setCalendarPosition('bottom')
			} else {
				setCalendarPosition('top')
			}
			setIsOpen(!isOpen)
		}
	}

	return (
		<div className={s.publishCalendar}>
			<div className={s.inputCalendar} onClick={handleOpenCalendar}>
				<Input
					readOnly
					className={s['input-calendar']}
					ref={inputRef}
					value={`${stateDate.getDate().toString().padStart(2, '0')}-${(
						stateDate.getMonth() + 1
					)
						.toString()
						.padStart(2, '0')}-${stateDate.getFullYear()}`}
					placeholder="Период публикации"
					placeholder_type="is_shown"
				/>
				<CalendarSvg />
			</div>
			{isOpen && (
				<div
					style={{
						position: 'absolute',
						[calendarPosition]:
							calendarPosition === 'top' ? 'var(--s50)' : '100%',
					}}
				>
					<Calendar
						className={s['react-calendar']}
						onChange={(e) => onDateChange(e as Date)}
						value={stateDate}
					/>
				</div>
			)}
			<div className={s.timePicker}>
				<div className={cn(s.timePicker_inputs, !isEdit && s.inActive)}>
					<Input
						disabled={!isEdit}
						type="number"
						placeholder="HH"
						value={stateTime.hours}
						onChange={(e) =>
							handleChangeTime({ type: 'hours', value: e.target.value })
						}
						placeholder_type="is_shown"
					/>
					<p className={s.dots}>:</p>
					<Input
						disabled={!isEdit}
						type="number"
						placeholder="MM"
						value={stateTime.minutes}
						onChange={(e) =>
							handleChangeTime({ type: 'minutes', value: e.target.value })
						}
						placeholder_type="is_shown"
					/>
				</div>
				{isEdit ? (
					<Button onClick={() => handleSave()} type="add">
						Сохранить
					</Button>
				) : (
					<div className={s.edit} onClick={() => setIsEdit(true)}>
						<EditSvg />
					</div>
				)}
			</div>
		</div>
	)
}

export default PublishCalendar
