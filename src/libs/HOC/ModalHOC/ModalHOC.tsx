import React, { createContext, useContext, useState } from 'react'
import Modal from './_comp/Modal'
import {
	TModalState,
	TModalContextType,
	TModalOpenParams,
	TModalRemoveParams,
} from './ModalHOC.type'

const ModalContext = createContext<TModalContextType | undefined>(undefined)

export const ModalProvider: React.FC<{ children: React.ReactElement }> = ({
	children,
}) => {
	const [modal, setModal] = useState<Map<string, TModalState>>(new Map())

	const openModal = ({
		component,
		settingModal,
		_key = 'default',
	}: TModalOpenParams) => {
		setModal((prev) => {
			const newMap = new Map(prev)
			newMap.set(_key, { component, settingModal })
			return newMap
		})
	}
	const closeModal = ({ _key = 'default' }: TModalRemoveParams = {}) => {
		setModal((prev) => {
			const newMap = new Map(prev)
			newMap.delete(_key)
			return newMap
		})
	}
	//

	return (
		<ModalContext.Provider
			value={{
				openModal,
				closeModal,
			}}
		>
			{Array.from(modal.values()).map((modalItem, index) => {
				return (
					<React.Fragment key={index}>
						{modalItem?.component && (
							<Modal
								key={index}
								{...modalItem.settingModal}
								closeModal={() => {
									closeModal({ _key: Array.from(modal.keys())[index] })
								}}
							>
								{modalItem.component}
							</Modal>
						)}
					</React.Fragment>
				)
			})}
			{children}
		</ModalContext.Provider>
	)
}

export const useModal = () => {
	const context = useContext(ModalContext)

	if (context === undefined) {
		throw new Error('Context is missing')
	}
	return context
}
