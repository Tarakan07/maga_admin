import { FC, memo } from 'react'
import { P } from '@/libs/UI/CustomTags'
import s from './DuplicatePartContent.module.scss'
type TProps = {
	label: string
	callback: () => void
}
const DuplicatePartContent: FC<TProps> = memo(({ callback, label }) => {
	return (
		<div className={s.addIndent} onClick={callback}>
			<P size="xs">{label}</P>
			<P size="xs">+</P>
		</div>
	)
})

export default DuplicatePartContent
