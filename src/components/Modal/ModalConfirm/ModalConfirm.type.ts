import { TVariantResource } from '@/store/newResourceStore/type'

type TTypeConfirm = 'hide' | 'remove'

type TDefaultContent = {
	title: string
	description: string
	success: string
	cancel: string
}

type TDefaultData = Record<TTypeConfirm, TDefaultContent>

type TProps = {
	type: TTypeConfirm
	nameResource: string
	variantContent: TVariantResource
	actions?: {
		callbackSuccess?: () => void
		callbackCancel?: () => void
	}
}

export type { TTypeConfirm, TDefaultContent, TProps, TDefaultData }
