import { FC } from 'react'
import ReactQuill from 'react-quill'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TParamsChangeContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	IConstructorSectionId,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import 'react-quill/dist/quill.snow.css'
import s from './ContentHTML.module.scss'

type TProps = {
	content: TContentTypeWithId<'contentHTML'>
	variantResource: TVariantResource
	sectionId: IConstructorSectionId
}
const ContentHTML: FC<TProps> = ({ content, sectionId, variantResource }) => {
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

	const { getLocalization } = useLanguage()
	const { contentHTML } = content

	const {
		bindActionContent: { changeContent, addContent },
	} = useConstructorStore()

	const handleChangeText = ({ value }: { value: string }) => {
		const newContent: TParamsChangeContent = {
			id: content.id,
			content: {
				contentType: 'contentHTML',
				id: content.id,
				contentHTML: value,
			},
			key: variantResource,
			section_id: sectionId,
		}
		changeContent(newContent)
	}

	return (
		<div className={s.wrap}>
			<ReactQuill
				theme="snow"
				className={s.quill}
				value={contentHTML}
				onChange={(e) => {
					handleChangeText({ value: e })
				}}
				formats={formats}
			/>
		</div>
	)
}

export default ContentHTML
