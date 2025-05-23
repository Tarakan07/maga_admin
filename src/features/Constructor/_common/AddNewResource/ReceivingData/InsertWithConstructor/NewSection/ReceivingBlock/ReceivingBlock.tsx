import { FC, useContext } from 'react'
import { TReturnDrag } from '@/libs/hooks/use-dragAndDrop/type'
import useDragAndDrop from '@/libs/hooks/use-dragAndDrop/use-dragAndDrop'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
	TContentTypeKey,
	TContentTypeWithId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import s from './ReceivingBlock.module.scss'
import ReceivingItem from './ReceivingItem/ReceivingItem'
import { VariantNewResourceContext } from '../../../_context/VariantNewResourceContext'
type TProps = {
	fillingContent: TContentTypeWithId<TContentTypeKey>[]
	sectionId: IConstructorSectionId
	drag: TReturnDrag<IConstructorContentSectionWithId>
}

const ReceivingBlock: FC<TProps> = ({ fillingContent, sectionId }) => {
	const { variantResource } = useContext(VariantNewResourceContext)
	const { bindActionContent } = useConstructorStore()
	const { setContent } = bindActionContent
	const drag = useDragAndDrop({
		state: fillingContent,
		setNewState: handleSetContent,
		type: 'content',
	})

	function handleSetContent(content: TContentTypeWithId<TContentTypeKey>[]) {
		setContent({
			key: variantResource,
			content,
			section_id: sectionId,
		})
	}
	return (
		<div className={s.wrap}>
			{fillingContent.map((content, index) => {
				return (
					<ReceivingItem key={content.id} {...{ content, sectionId, drag }} />
				)
			})}
		</div>
	)
}

export default ReceivingBlock
