type TParamsPagination = {
	totalPages: number
	currentPage: number
}
type TGetPages = {
	left: number[]
	right: number[] | null
	center: number[] | null
}
type TReturnPagination = {
	newPage: number
	getPages: TGetPages
	bind: {
		handleNextClick: () => void
		handlePageClick: (params: number) => void
		handlePrevClick: () => void
	}
}

export type { TParamsPagination, TReturnPagination, TGetPages }
