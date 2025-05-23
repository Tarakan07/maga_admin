import { useCallback, useState } from 'react'
export type TReturnJSON = {
	json: string
	errorJson: string | null
	formatJSON: () => void
	changeJSON: (value: string) => void
}
export const useJSON = (): TReturnJSON => {
	const [json, setJSON] = useState('{}')
	const [error, setError] = useState<string | null>(null)
	//
	const changeJSON = useCallback((value: string) => {
		setJSON(value)
		setError(null)
	}, [])
	const formatJSON = useCallback(() => {
		try {
			const jsonObject = JSON.parse(json)
			const formattedJSON = JSON.stringify(jsonObject, null, 4)
			setJSON(formattedJSON)
			setError('')
		} catch (err: any) {
			setError('Invalid JSON: ' + err.message)
		}
	}, [json])

	return {
		json,
		errorJson: error,
		formatJSON,
		changeJSON,
	}
}
