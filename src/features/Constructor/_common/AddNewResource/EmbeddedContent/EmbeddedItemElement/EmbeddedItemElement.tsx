import { FC } from 'react'
import { P } from '@/libs/UI/CustomTags'
import EmbeddedVariantSvg from '@/_assets/svg/EmbeddedVariantSvg'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { TEmbeddedContent } from '@/store/newResourceStore/_common/constructor/types/constructorStore.type'
import {
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import { TDataTransfer } from '../../types'
import s from './EmbeddedItemElement.module.scss'
type TProps = {
	defaultContent: TContentTypeWithId<TContentTypeKey>
	item: TEmbeddedContent
}
const EmbeddedItemElement: FC<TProps> = ({ item, defaultContent }) => {
	const { _key, label } = item

	const defaultContentWithId: TContentTypeWithId<TContentTypeKey> = {
		...defaultContent,
		id: Number(new Date()),
	}

	const { emdeddedStore } = useConstructorStore()
	const handleDragStart = (e: React.DragEvent) => {
		emdeddedStore.setEmdeddedMovingElement(item)
		e.dataTransfer.setData(
			'application/json',
			JSON.stringify({
				item,
				defaultContent: defaultContentWithId,
			} as TDataTransfer)
		)
	}
	return (
		<div className={s.item} draggable={true} onDragStart={handleDragStart}>
			<EmbeddedVariantSvg {...{ _key }} />
			<P size="xss">{label}</P>
		</div>
	)
}
export default EmbeddedItemElement
