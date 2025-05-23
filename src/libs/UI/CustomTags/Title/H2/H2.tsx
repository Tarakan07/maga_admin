import React, { FC } from 'react'
import cn from 'classnames'
import s from './H2.module.scss'
import { IH_Tag } from '../type'

const H2: FC<IH_Tag> = ({ size, children }) => {
	return <h2 className={cn(s.title, s[size])}>{children}</h2>
}

export default H2
