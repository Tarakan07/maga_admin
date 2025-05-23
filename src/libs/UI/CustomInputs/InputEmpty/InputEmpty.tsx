import { FC, KeyboardEvent } from 'react'
import s from './InputEmpty.module.scss'
type TProps = {
	value: string
	onChangeText: (params: string) => void
	callback?: () => void
} & React.InputHTMLAttributes<HTMLInputElement>
const InputEmpty: FC<TProps> = (props) => {
	const { value, onChangeText, callback, ...original } = props
	//
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter' && callback) {
			callback()
		}
	}
	return (
		<div className={s.wrapInputEmpty}>
			<input
				{...original}
				type="text"
				onChange={(e) => onChangeText(e.target.value)}
				onKeyDown={handleKeyDown}
				value={value}
			/>
		</div>
	)
}
export default InputEmpty
