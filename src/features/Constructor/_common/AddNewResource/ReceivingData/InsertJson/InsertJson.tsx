import { FC, useContext, useEffect, useRef, useState } from 'react'
import { TextArea } from '@/libs/UI'
import { Button, P } from '@/libs/UI/CustomTags'
import { useInput } from '@/libs/hooks/use-input'
import { isValidJSON } from '@/libs/utils/jsonValidate'
import { useLanguage } from '@/libs/context/LanguageProvider'
import useLoadJSON from '@/store/newResourceStore/_common/useLoadJSON'
import s from './InsertJson.module.scss'
import { TVariantAddedContent } from '../ReceivingData.type'
import { VariantNewResourceContext } from '../_context/VariantNewResourceContext'
type TProps = {
	handleChangeVariantEditor: (params: TVariantAddedContent) => void
}
const InsertJson: FC<TProps> = ({ handleChangeVariantEditor }) => {
	const [isNotValid, setIsNotValid] = useState(false)
	const { getLocalization } = useLanguage()
	const { onChangeText, value } = useInput()
	const { variantResource } = useContext(VariantNewResourceContext)
	const { bindResource } = useLoadJSON({ variantResource })
	let textareaRef = useRef<HTMLTextAreaElement>(null)
	//
	const handleInputChange = (e: string) => {
		onChangeText(e)
		setIsNotValid(false)
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			textareaRef.current.style.height =
				textareaRef.current.scrollHeight < 450
					? `${textareaRef.current.scrollHeight}px`
					: '450px'
		}
	}
	const handleInsertJSON = () => {
		if (value && isValidJSON(value)) {
			bindResource(JSON.parse(value))
			handleChangeVariantEditor('constructor')
			setIsNotValid(false)
		} else {
			setIsNotValid(true)
		}
	}
	//
	useEffect(() => {
		if (textareaRef.current) {
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}, [])

	return (
		<div className={s.wrap}>
			<TextArea
				type="insert"
				value={value}
				onChange={handleInputChange}
				placeholder={getLocalization('Код JSON')}
				ref={textareaRef}
			/>
			<div className={s.bottom}>
				<div>{isNotValid && <P color="red">Невалидный JSON</P>}</div>
				<Button
					type="primary"
					disabled={value.length < 0}
					onClick={() => {
						handleInsertJSON()
					}}
				>
					{getLocalization('Применить')}
				</Button>
			</div>
		</div>
	)
}
export default InsertJson
