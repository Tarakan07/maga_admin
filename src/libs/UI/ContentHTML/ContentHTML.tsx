import ReactQuill from 'react-quill'
import { FC, useEffect } from 'react'
import 'react-quill/dist/quill.snow.css'
import s from './ContentHTML.module.scss'

type TProps = {
	value: string
	onChange: (e: string) => void
	placeholder: string
}
const ContentHTML: FC<TProps> = ({ value, onChange, placeholder }) => {
	useEffect(() => {
		console.log(placeholder)
	}, [value, placeholder])
	const formats = [
		'header',
		'bold',
		'italic',
		'underline',
		'strike',
		'blockquote',
		'list',
		'bullet',
		'indent',
		'link',
		'image',
	]

	return (
		<div className={s.wrap}>
			<ReactQuill
				key={placeholder}
				theme="snow"
				className={s.quill}
				value={value}
				placeholder={placeholder}
				onChange={(e) => {
					onChange(e)
				}}
				formats={formats}
			/>
		</div>
	)
}

export default ContentHTML
