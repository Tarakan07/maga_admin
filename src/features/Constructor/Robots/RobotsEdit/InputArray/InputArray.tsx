import { FC } from 'react'
import cn from 'classnames'
import { InputEmpty, Tag } from '@/libs/UI'
import { Button } from '@/libs/UI/CustomTags'
import { useInput } from '@/libs/hooks/use-input'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useRobotsStore } from '@/store/robotsStore/robotsStore'
import { TContentRobotsPrimitive } from '@/services/API/robots/robots.type'
import s from './InputArray.module.scss'
type TProps = {
	id: number
	data: string[]
	field: keyof TContentRobotsPrimitive
	isActiveEdit: boolean
}
const InputArray: FC<TProps> = ({ id, data, field, isActiveEdit }) => {
	const { value, onChangeText, reset } = useInput()
	const { bindActions } = useRobotsStore()
	const { getLocalization } = useLanguage()
	return (
		<div className={s.wrap}>
			<label>{field}</label>
			<div className={s.blockEdit}>
				<div className={cn(s.list, { [s.editable]: isActiveEdit })}>
					{!!data.length &&
						data.map((el, index) => {
							return (
								<Tag
									key={`${el}-${index}`}
									isRemove={isActiveEdit}
									onClick={() => {
										bindActions.removeItemContentRobots({
											field,
											id,
											value: el,
										})
									}}
								>
									{el}
								</Tag>
							)
						})}
				</div>
				{isActiveEdit && (
					<div className={s.rowAdd}>
						<InputEmpty
							value={value}
							onChangeText={onChangeText}
							placeholder={field}
							callback={() => {
								bindActions.updateField({ id, value, field })
								reset()
							}}
						/>

						<Button
							type="add"
							onClick={() => {
								if (!!value.length) {
									bindActions.updateField({ id, value, field })
									reset()
								}
							}}
						>
							{getLocalization('Добавить')}
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}

export default InputArray
