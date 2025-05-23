import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { H1 } from '@/libs/UI/CustomTags'
import ReloadSvg from '@/_assets/svg/ReloadSvg'
import { ArrowBackSvg } from '@/_assets/svg/arrows'
import { THeaderSetting } from './type'
import s from './HeaderSetting.module.scss'

const HeaderSetting: FC<THeaderSetting> = ({
	title,
	rightComp = null,
	goBack = false,
	pathBack,
	refetch,
}) => {
	const navigate = useNavigate()
	const handleBack = useCallback(() => {
		if (pathBack) return navigate(pathBack)
		navigate(-1)
	}, [])
	return (
		<div className={s.headerSetting}>
			<div className={s.title}>
				{goBack && (
					<div className={s.back} onClick={handleBack}>
						<ArrowBackSvg />
					</div>
				)}
				<H1 size="m">{title}</H1>

				{refetch && (
					<div
						className={s.reload}
						onClick={() => {
							refetch()
						}}
					>
						<ReloadSvg />
					</div>
				)}
			</div>
			{rightComp && rightComp}
		</div>
	)
}
export default HeaderSetting
