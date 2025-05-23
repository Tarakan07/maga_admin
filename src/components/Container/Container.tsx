import { FC } from 'react'
import { IChildren } from '@/types/IChildren'
import s from './Container.module.scss'
const Container: FC<IChildren> = ({ children }) => {
	return <div className={s.container}>{children}</div>
}
export default Container
