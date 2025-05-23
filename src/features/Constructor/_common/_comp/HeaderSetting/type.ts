import { ReactNode } from 'react'

type THeaderSetting = {
	title: string
	rightComp?: ReactNode | null
	goBack?: boolean
	pathBack?: string
	refetch?: (() => void) | null
}
export type { THeaderSetting }
