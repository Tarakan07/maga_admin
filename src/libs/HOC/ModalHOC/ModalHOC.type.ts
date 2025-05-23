type TComponent = React.ReactElement | null
type TModalConfig = {
	fullScreen?: boolean
	isOuterClose?: boolean
	isShowBgc?: boolean
	position?: 'center' | 'right_bottom'
	actions?: {
		callbackOpen: () => void
	}
}

type TModalOpenParams = {
	component: TComponent
	settingModal: TModalConfig
	_key?: string
}

type TModalState = {
	component: TComponent
	settingModal: TModalConfig
}

type TModalRemoveParams = { _key?: string }

type TModalContextType = {
	openModal: (params: TModalOpenParams) => void
	closeModal: (params?: TModalRemoveParams) => void
}

export type {
	TComponent,
	TModalOpenParams,
	TModalContextType,
	TModalRemoveParams,
	TModalState,
	TModalConfig,
}
