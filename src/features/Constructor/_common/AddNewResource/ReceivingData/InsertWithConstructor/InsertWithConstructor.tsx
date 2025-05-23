import { useCallback, useContext } from 'react'
import useDragAndDrop from '@/libs/hooks/use-dragAndDrop/use-dragAndDrop'
import { useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import {
	IConstructorContentSectionWithId,
	IConstructorSectionId,
} from '@/store/newResourceStore/_common/constructor/types/IConstructorContent'
import { TDataTransfer } from '../../types'
import NewSection from './NewSection/NewSection'
import s from './InsertWithConstructor.module.scss'
import EmptySection from './EmptySection/EmptySection'
import { VariantNewResourceContext } from '../_context/VariantNewResourceContext'

const InsertWithConstructor = () => {
	const { variantResource } = useContext(VariantNewResourceContext)
	const { bindStore, bindActionSection } = useConstructorStore()
	const sections = bindStore[variantResource] || []
	const { addSection, setStore, removeSection } = bindActionSection
	const drag = useDragAndDrop({
		state: sections,
		setNewState: handleSetSection,
		type: 'section',
	})
	const handleAddSection = useCallback(
		(element?: TDataTransfer) => {
			addSection({
				key: variantResource,
				defaultContent: element?.defaultContent,
			})
		},
		[variantResource]
	)

	function handleSetSection(content: IConstructorContentSectionWithId[]) {
		setStore({
			key: variantResource,
			content: content,
		})
	}

	const handleRemoveSection = useCallback(
		(id: IConstructorSectionId) => {
			removeSection({ id, key: variantResource })
		},
		[variantResource]
	)
	return (
		<div className={s.wrap}>
			{sections.length > 0 && (
				<div className={s.wrapSections}>
					{sections.map((e) => (
						<NewSection
							key={e.id}
							{...{
								section: e,
								handleRemoveSection,
								drag,
							}}
						/>
					))}
				</div>
			)}

			<EmptySection {...{ handleAddSection }} />
		</div>
	)
}

export default InsertWithConstructor
