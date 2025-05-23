export const PXtoVW = ({
	width,
	size,
	defConfig = false,
}: {
	width: number
	size: number
	defConfig?: boolean
}): string => {
	const baseWidth = !defConfig ? width : width < 520 ? 375 : 1440
	return `${(size / baseWidth) * 100}vw`
}
