import { useCallback, useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { TRobots } from '@/services/API/robots/robots.type'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { useRobotsStore } from '@/store/robotsStore/robotsStore'
import { useCreateRobots, useGetRobots } from '@/services/API/robots/hook'
import { ActionRightBlock } from './_comp'
import s from './WrapperRobots.module.scss'
import RobotsEdit from './RobotsEdit/RobotsEdit'
import WrapperAddNewResource from '../_common/_comp/WrapperAddNewResource'

const WrapperRobots = () => {
	const [isActiveEdit, setActiveEdit] = useState(false)
	const [saveOld, setSaveOld] = useState<TRobots[]>([])
	const { data, isLoading, isError, isSuccess } = useGetRobots()
	const { getForReq, setStore } = useRobotsStore()
	const { mutateAsync: updateRobots } = useCreateRobots()
	const { getLocalization } = useLanguage()
	//
	const save = useCallback(() => {
		updateRobots(getForReq())
	}, [])
	const reset = useCallback(() => {
		setStore(saveOld)
	}, [saveOld])
	const changeActive = useCallback(() => {
		setActiveEdit((prev) => !prev)
	}, [])
	///
	useEffect(() => {
		if (isSuccess && data) {
			setStore(data.items)
			setSaveOld(data.items)
		}
	}, [data, isSuccess])

	///
	if (isLoading) {
		return <Loader params={{ visible: isLoading }} />
	}
	return (
		<WrapperAddNewResource
			title={getLocalization('Robots')}
			goBack={true}
			rightComp={
				<ActionRightBlock {...{ isActiveEdit, save, reset, changeActive }} />
			}
		>
			<div className={s.wrap}>
				<div className={s.main_block}>
					{isLoading ? (
						<Loader params={{ visible: isLoading }} />
					) : (
						<RobotsEdit {...{ isActiveEdit }} />
					)}
				</div>
			</div>
		</WrapperAddNewResource>
	)
}

export default WrapperRobots
