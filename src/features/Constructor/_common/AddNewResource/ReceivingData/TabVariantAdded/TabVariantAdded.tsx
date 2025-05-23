import React, { FC } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import s from './TabVariantAdded.module.scss'
import {
	TItemVariantAddedContent,
	TVariantAddedContent,
} from '../ReceivingData.type'

type TProps = {
	activeEditor: TVariantAddedContent
	handleChangeVariantEditor: (params: TVariantAddedContent) => void
	variantEditor: TItemVariantAddedContent[]
}
const TabVariantAdded: FC<TProps> = ({
	variantEditor,
	handleChangeVariantEditor,
	activeEditor,
}) => {
	return (
		<div className={s.wrap}>
			<div
				className={cn(s.border, { [s.right]: activeEditor === 'constructor' })}
			/>
			{variantEditor.map((item) => {
				return (
					<div
						key={item._key}
						className={s.item}
						onClick={() => {
							handleChangeVariantEditor(item._key)
						}}
					>
						<P size="s">{item.label}</P>
					</div>
				)
			})}
		</div>
	)
}

export default TabVariantAdded
