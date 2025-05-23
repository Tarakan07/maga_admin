import { P } from '@/libs/UI/CustomTags'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './EmbeddedContent.module.scss'
import EmbeddedItemElement from './EmbeddedItemElement/EmbeddedItemElement'

const EmbeddedContent = () => {
	const { getLocalization } = useLanguage()
	const { emdeddedStore } = useConstructorStore()
	const data: TContentTypeWithId<TContentTypeKey>[] = [
		{
			contentType: 'bigImage',
			id: 1,
			image: {
				src: '',
				description: '',
			},
		},
		{
			contentType: 'defaultText',
			id: 2,
			textArray: [''],
		},
		{
			contentType: 'prosAndCons',
			id: 3,
			data: {
				pros: [
					{
						id: 1,
						text: {
							base: '',
							secondary: '',
						},
					},
				],
				cons: [
					{
						id: 1,
						text: {
							base: '',
							secondary: '',
						},
					},
				],
			},
		},
		{
			contentType: 'list',
			id: 4,
			listText: [''],
		},
		{
			contentType: 'quote',
			id: 5,
			text: '',
		},
		{
			contentType: 'table',
			id: 6,
			header: {
				base: '',
				secondary: '',
			},
			data: [
				{
					id: 1,
					base: '',
					secondary: '',
				},
			],
		},
		{
			contentType: 'tableMultiple',
			id: 8,
			contentTable: [
				{
					id: 1,
					header: '',
					data: [
						{
							id: 1,
							text: '',
						},
					],
				},
			],
		},
		{
			contentType: 'rowImages',
			id: 7,
			images: [
				{
					id: 1,
					src: '',
					description: '',
				},
				{
					id: 2,
					src: '',
					description: '',
				},
			],
		},
		{
			contentType: 'rowImageText',
			id: 8,
			data: {
				image: {
					src: '',
					description: '',
				},
				textArray: [''],
				reverse: false,
			},
		},
		{
			contentType: 'contentHTML',
			id: 9,
			contentHTML: '',
		},
		{
			contentType: 'faq',
			id: 9,
			data: [{
				id: 1,
				text: {
					question: '',
					answer: '',
				}
			}]
		},
	]

	return (
		<div className={s.receiving}>
			<P size="m" weight={600}>
				{getLocalization('Контент')}
			</P>
			<div className={s.elements}>
				{emdeddedStore.emdeddedContent.map((element) => {
					return (
						<EmbeddedItemElement
							key={element._key}
							item={element}
							defaultContent={data.find((e) => e.contentType === element._key)!}
						/>
					)
				})}
			</div>
		</div>
	)
}
export default EmbeddedContent
