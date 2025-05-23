import { FC } from 'react'
import cn from 'classnames'
import { VisibleDate } from '@/libs/UI'
import { P } from '@/libs/UI/CustomTags'
import EyeSvg from '@/_assets/svg/EyeSvg'
import EditSvg from '@/_assets/svg/EditSvg'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import { ModalConfirm } from '@/components/Modal'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import s from './ItemAddedContent.module.scss'
type TProps = {
	id: number
	title: string
	position?: number
	isHidden?: boolean
	date?: string
	callbackEdit: () => void
	callbackVisible: () => void
	callbackDelete?: () => void
	variantContent: TVariantResource
}
const ItemAddedContent: FC<TProps> = (props) => {
	const {
		id,
		title,
		isHidden,
		date = '',
		callbackEdit,
		variantContent,
		callbackVisible,
		callbackDelete,
	} = props
	const { getLocalization } = useLanguage()
	const { openModal, closeModal } = useModal()
	return (
		<div className={s.item}>
			<div className={s.itemLeft}>
				<div className={s.mainInfo}>
					<div className={s.title}>
						{/* <div className={s.position}>
						<P size="m" weight={500}>{`#${position}`}</P>
					</div> */}
						<P size="l" weight={700}>
							{title}
						</P>
					</div>
					<div className={s.wrapStatus}>
						<div className={cn(s.status, isHidden ? s.inactive : s.active)}>
							<div />
							<P size="s">
								{isHidden
									? getLocalization('Не активный')
									: getLocalization('Активный')}
							</P>
						</div>
					</div>
				</div>
				<div>
					{!!date.length && (
						<P size="xss">
							<VisibleDate date={date} />
						</P>
					)}
				</div>
			</div>
			<div className={s.setting}>
				<div
					onClick={() => {
						openModal({
							component: (
								<ModalConfirm
									type="remove"
									nameResource={title}
									variantContent={variantContent}
									actions={{
										callbackSuccess: () => {
											callbackDelete && callbackDelete()
										},
										callbackCancel: closeModal,
									}}
								/>
							),
							settingModal: {
								fullScreen: false,
								isOuterClose: true,
							},
						})
					}}
				>
					<DeleteSvg />
				</div>
				<div onClick={callbackEdit}>
					<EditSvg />
				</div>
				<div
					onClick={() => {
						!isHidden
							? openModal({
									component: (
										<ModalConfirm
											type="hide"
											nameResource={title}
											variantContent={variantContent}
											actions={{
												callbackSuccess: callbackVisible,
												callbackCancel: closeModal,
											}}
										/>
									),
									settingModal: {
										fullScreen: false,
										isOuterClose: true,
									},
								})
							: callbackVisible()
					}}
				>
					<EyeSvg isOpen={!isHidden} />
				</div>
			</div>
		</div>
	)
}
export default ItemAddedContent
