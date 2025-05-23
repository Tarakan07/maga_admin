import { IChildren } from '@/types/IChildren'

type TWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
export interface IP extends IChildren {
	size?: 'xss' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'
	color?: 'default' | 'grey' | 'red' | 'blue_grey' | 'green'
	customColor?: string
	weight?: 'bold' | 'normal' | TWeight
	className?: string
}
