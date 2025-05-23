import React, { useEffect, useState } from 'react'
import cn from 'classnames'
import { InputEmpty, Tag } from '@/libs/UI'
import { Button, P } from '@/libs/UI/CustomTags'
import { useInput } from '@/libs/hooks/use-input'
import SelectPlsBtnSvg from '@/_assets/svg/SelectPlsBtnSvg'
import CheckboxArrowSvg from '@/_assets/svg/CheckboxArrowSvg'
import s from './Select.module.scss'

type TSelectProps<TItem> = {
	value: TItem[]
	onChange: (items: TItem) => void
	dataAdded: TItem[]
	label?: string
	placeholder?: string
	ValueComponent: React.ComponentType<{ item: TItem }>
	DataComponent: React.ComponentType<{ item: TItem }>
	isWithSearch?: boolean
	onGetTextForSearch?: ((e: TItem) => string) | null
}

const Select = <TItem,>({
	value,
	onChange,
	dataAdded,
	label,
	placeholder,
	ValueComponent,
	DataComponent,
	isWithSearch = false,
	onGetTextForSearch = null,
}: TSelectProps<TItem>) => {
	const [isActive, setIsActive] = useState(false)
	const { value: inputValue, onChangeText } = useInput()
	const [transformValue, setTransformValue] = useState<TItem[]>([])
	useEffect(() => {
		if (value && !isWithSearch) {
			setTransformValue(value)
		} else {
			setTransformValue(value.slice(0, 5))
		}
	}, [value, isWithSearch])

	const updateTransformValue = (word: string) => {
		if (onGetTextForSearch) {
			setTransformValue(() => {
				const filter = value
					?.filter((e) =>
						onGetTextForSearch(e)
							.toLocaleLowerCase()
							.includes(word.toLocaleLowerCase())
					)
					.slice(0, 5)
				return filter || []
			})
		}
	}

	const isChecked = (item: TItem): boolean => {
		return dataAdded.some(
			(addedItem) => JSON.stringify(addedItem) === JSON.stringify(item)
		)
	}

	const handleOpen = () => {
		setIsActive(!isActive)
	}
	///
	useEffect(() => {
		if (isWithSearch) {
			updateTransformValue(inputValue)
		}
	}, [isWithSearch, inputValue])
	return (
		<div className={s.selectWrapper}>
			{label && <label>{label}</label>}
			<div className={cn(s.inputWrapper)}>
				{placeholder && !dataAdded.length && (
					<p className={s.placeholder}>{placeholder}</p>
				)}
				{dataAdded.length > 0 && (
					<div className={s.cards}>
						{dataAdded.map((item, index) => (
							<Tag key={index} onClick={() => onChange(item)}>
								<DataComponent item={item} />
							</Tag>
						))}
					</div>
				)}
				<Button type="add" onClick={handleOpen} icon={<SelectPlsBtnSvg />}>
					{'Добавить'}
				</Button>

				<input className={s.input} />
			</div>

			{isActive && (
				<div className={s.wrapValue}>
					<div className={s.window}>
						{isWithSearch && (
							<div className={s.search}>
								<InputEmpty
									type="text"
									placeholder="Ввод..."
									value={inputValue}
									onChangeText={(e) => onChangeText(e)}
								/>

								{transformValue?.length < 1 && <P>Не найдено</P>}
							</div>
						)}

						<div className={s.variants}>
							{transformValue?.map((item, index) => (
								<div
									key={index}
									className={s.window_card}
									onClick={() => {
										onChange(item)
									}}
								>
									<label className={cn(s.custom_checkbox)}>
										<input
											type="checkbox"
											checked={isChecked(item)}
											onClick={(e) => e.stopPropagation()}
											onChange={(e) => {
												e.preventDefault()
											}}
										/>
										<span
											className={cn(s.checkmark, isChecked(item) && s.checked)}
										></span>
										{isChecked(item) && <CheckboxArrowSvg />}
									</label>
									<ValueComponent item={item} />
								</div>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Select
