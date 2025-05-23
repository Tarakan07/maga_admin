import React, { useMemo } from 'react'

type TParams = {
	date: Date | string
	defaultValue?: string
	type?: 'dot'
}

export const VisibleDate = ({
	date,
	defaultValue = '',
	type = 'dot',
}: TParams) => {
	const formattedDate = useMemo(() => {
		if (!date) return defaultValue

		let formatDate: Date = date as Date
		if (typeof date === 'string') formatDate = new Date(date)

		const day = formatDate.getDate().toString().padStart(2, '0')
		const month = (formatDate.getMonth() + 1).toString().padStart(2, '0')
		const year = formatDate.getFullYear()
		if (type === 'dot') return `${day}.${month}.${year}`
		else return `${day}.${month}.${year}`
	}, [date, defaultValue, type])

	return <>{formattedDate}</>
}
