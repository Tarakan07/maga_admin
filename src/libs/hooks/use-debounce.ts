import { useState, useEffect } from 'react'

type TDebounceProps = {
	value: string
	delay: number
}

export const useDebounce = ({ value, delay }: TDebounceProps): string => {
	const [debouncedValue, setDebouncedValue] = useState(value)

	useEffect(() => {
		const t = setTimeout(() => {
			setDebouncedValue(value)
		}, delay)

		return () => {
			clearTimeout(t)
		}
	}, [value, delay])
	return debouncedValue
}
