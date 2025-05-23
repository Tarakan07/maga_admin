import { FC, useCallback, useState } from 'react'
import s from './ReceivingData.module.scss'
import InsertJson from './InsertJson/InsertJson'
import InsertWithConstructor from './InsertWithConstructor'
import TabVariantAdded from './TabVariantAdded/TabVariantAdded'
import {
	TItemVariantAddedContent,
	TVariantAddedContent,
} from './ReceivingData.type'
const VARIANT_EDITOR: TItemVariantAddedContent[] = [
	{
		_key: 'json',
		label: 'JSON',
	},
	{
		_key: 'constructor',
		label: 'Новый обзор',
	},
]

const ReceivingData: FC = () => {
	const [activeEditor, setActiveEditor] = useState<TVariantAddedContent>('json')

	const handleChangeVariantEditor = useCallback(
		(_key: TVariantAddedContent) => setActiveEditor(_key),
		[]
	)
	return (
		<div className={s.wrap}>
			<div className={s.editor}>
				<TabVariantAdded
					{...{
						handleChangeVariantEditor,
						variantEditor: VARIANT_EDITOR,
						activeEditor,
					}}
				/>
				{activeEditor === 'json' && (
					<InsertJson {...{ handleChangeVariantEditor }} />
				)}
				{activeEditor === 'constructor' && <InsertWithConstructor />}
			</div>
		</div>
	)
}
export default ReceivingData
