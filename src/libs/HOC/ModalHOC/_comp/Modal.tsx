import React, { useEffect } from 'react'
import cn from 'classnames'
import s from './Modal.module.scss'
import { TModalConfig } from '../ModalHOC.type'
type TIndividualPropsModal = {
	closeModal?: () => void
	children?: React.ReactElement | string
}
const Modal: React.FC<TModalConfig & TIndividualPropsModal> = ({
	closeModal = () => {},
	children,
	...modal
}) => {
	const {
		fullScreen,
		isOuterClose = true,
		isShowBgc = true,
		position = 'center',
	} = modal
	useEffect(() => {
		if (fullScreen) {
			document.body.style.overflow = 'hidden'
		}
		return () => {
			document.body.style.overflow = 'auto'
		}
	}, [fullScreen])

	return (
		<div className={cn(s.container)}>
			<div
				className={cn({ [s.darkBackground]: isShowBgc })}
				onClick={() => {
					if (isOuterClose) {
						closeModal()
					}
				}}
			></div>

			<div
				className={cn(s.ModalWindow, s[position], {
					[s.ModalWindow__fullScreen]: fullScreen,
				})}
			>
				{children}
			</div>
		</div>
	)
}

export default Modal
