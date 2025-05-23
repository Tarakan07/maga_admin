import { FC } from 'react'
import { Input } from '@/libs/UI'
import { Button } from '@/libs/UI/CustomTags'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useRobotsStore } from '@/store/robotsStore/robotsStore'
import {
	TContentRobots,
	TContentRobotsPrimitive,
} from '@/services/API/robots/robots.type'
import s from './RobotsEdit.module.scss'
import InputArray from './InputArray/InputArray'
const RobotsEdit: FC<{ isActiveEdit: boolean }> = ({ isActiveEdit }) => {
	const { robots, bindActions } = useRobotsStore()
	const { getLocalization } = useLanguage()

	return (
		<div className={s.wrap}>
			<div className={s.list}>
				{robots.map((section, index) => {
					return (
						<div key={section.id} className={s.wrapSection}>
							<div className={s.section}>
								<Input
									label="User agent"
									disabled={!isActiveEdit}
									placeholder="user agent"
									value={section.user_agent}
									onChange={(e) => {
										bindActions.updateField({
											id: section.id,
											value: e.target.value,
											user_agent: true,
										})
									}}
								/>
								{Object.entries(section.content).map(([key, value]) => {
									if (Array.isArray(value))
										return (
											<InputArray
												isActiveEdit={isActiveEdit}
												key={key}
												data={value}
												field={key as keyof TContentRobotsPrimitive}
												id={section.id}
											/>
										)
									else
										return (
											<Input
												label={key}
												disabled={!isActiveEdit}
												key={key}
												placeholder={key}
												value={value}
												onChange={(e) => {
													bindActions.updateField({
														id: section.id,
														value: e.target.value,
														field: key as keyof TContentRobots,
													})
												}}
											/>
										)
								})}
							</div>
							{isActiveEdit && (
								<div
									className={s.delete}
									onClick={() => {
										bindActions.removeSection({ id: section.id })
									}}
								>
									{index !== 0 && <DeleteSvg />}
								</div>
							)}
						</div>
					)
				})}
			</div>
			{isActiveEdit && (
				<Button type="primary" onClick={bindActions.addSection}>
					{getLocalization(`Добавить секцию`)}
				</Button>
			)}
		</div>
	)
}

export default RobotsEdit
