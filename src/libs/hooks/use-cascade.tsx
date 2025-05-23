import { useCallback, useState } from 'react'

export const useCascade = () => {
	const [activeCascade, setActiveCascade] = useState<Set<number>>(new Set())

	const toggleActiveCascade = useCallback((id: number) => {
		setActiveCascade((prev) => {
			const newActiveCascade = new Set(prev)
			if (newActiveCascade.has(id)) {
				newActiveCascade.delete(id)
			} else {
				newActiveCascade.add(id)
			}
			return newActiveCascade
		})
	}, [])

	return {
		activeCascade,
		toggleActiveCascade,
	}
}
