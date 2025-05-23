import React, { FC } from 'react'
import cn from 'classnames'
import s from './H1.module.scss'
import { IH_Tag } from '../type'

const H1: FC<IH_Tag> = ({ size, children }) => {
	return <h1 className={cn(s.title, s[size])}>{children}</h1>
}

export default H1
