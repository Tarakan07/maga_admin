import { FC, useEffect } from 'react'
import SearchSvg from '@/_assets/svg/SearchSvg'
import { useDebounce } from '@/libs/hooks/use-debounce'
import { useFilter } from '@/libs/context/FilterContext/FilterContext'
import s from './InputSearch.module.scss'
type TProps = {
	onChangeText: (params: string) => void
	value: string
	isShowIcon?: boolean
} & React.InputHTMLAttributes<HTMLInputElement>
const InputSearch: FC<TProps> = (props) => {
	const { value, onChangeText, isShowIcon = true, ...original } = props
	const { onChangeFilter } = useFilter()

	const debouncedValue = useDebounce({ value, delay: 500 })

	useEffect(() => {
		onChangeFilter({ key: 'search', value: debouncedValue })
	}, [debouncedValue])

	return (
		<div className={s.wrapInputSearch}>
			{isShowIcon && <SearchSvg />}
			<input
				{...original}
				type="text"
				value={value}
				onChange={(e) => onChangeText(e.target.value)}
			/>
		</div>
	)
}
export default InputSearch
