import React from 'react'

export const useInput = (initialValue?: string) => {
	const [value, setValue] = React.useState<string>(initialValue || '')

	const onChangeText = React.useCallback((value: string) => {
		setValue(value)
	}, [])

	const reset = React.useCallback(() => {
		setValue('')
	}, [])

	return { value, reset, onChangeText }
}
