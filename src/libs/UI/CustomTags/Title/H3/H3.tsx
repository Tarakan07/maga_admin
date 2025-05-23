import React, { FC } from 'react'
import cn from 'classnames'
import s from './H3.module.scss'
import { IH_Tag } from '../type'

const H3: FC<IH_Tag> = ({ size, children }) => {
	return <h3 className={cn(s.title, s[size])}>{children}</h3>
}

export default H3
