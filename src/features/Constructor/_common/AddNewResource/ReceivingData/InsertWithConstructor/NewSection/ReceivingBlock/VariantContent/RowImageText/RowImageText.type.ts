type TTransformImageBlockParams = {
	key: 'description' | 'src'
	value: string
}
type TTransformTextBlockParams = {
	action: 'change' | 'addRow' | 'removeRow'
	value?: string
	index: number
}

export type { TTransformImageBlockParams, TTransformTextBlockParams }
