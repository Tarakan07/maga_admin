import { ReactNode } from 'react'
import { IChildren } from '@/types/IChildren'

export interface IButton extends IChildren {
	icon?: ReactNode | null
	type:
		| 'primary'
		| 'primary_row'
		| 'copy'
		| 'add'
		| 'secondary'
		| 'remove'
		| 'empty'
	size?: 'm' | 's'
	disabled?: boolean
	onClick?: () => void
}
