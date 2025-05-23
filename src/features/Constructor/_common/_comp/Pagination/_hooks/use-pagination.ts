import { useMemo, useState } from 'react'
import { TGetPages, TParamsPagination, TReturnPagination } from './type'

const COUNT_VISIBLE_LEFT = 4
const COUNT_VISIBLE_RIGHT = 2
export const usePagination = (params: TParamsPagination): TReturnPagination => {
	const { currentPage, totalPages } = params
	const [newPage, setNewPage] = useState(currentPage)

	const handlePrevClick = () => {
		if (currentPage > 1) {
			setNewPage(currentPage - 1)
		}
	}

	const handleNextClick = () => {
		if (currentPage < totalPages) {
			setNewPage(currentPage + 1)
		}
	}

	const handlePageClick = (page: number) => {
		setNewPage(page)
	}

	const arrayNumbers: number[] = useMemo(
		() => Array.from({ length: totalPages }, (_, index) => index + 1),
		[totalPages]
	)

	const getPages: TGetPages = useMemo(() => {
		let pagesLeft: number[] = []
		let pagesCenter: number[] | null = null
		let pagesRight: number[] | null = null

		if (totalPages <= 7) {
			pagesLeft = [...arrayNumbers]
			pagesRight = null
			pagesCenter = null
		} else {
			if (currentPage < COUNT_VISIBLE_LEFT) {
				const indexCurrentPage = Math.max(currentPage - 2, 0)
				const indexRemainder = totalPages - currentPage - 1

				const start =
					indexRemainder >= COUNT_VISIBLE_LEFT
						? indexCurrentPage
						: indexCurrentPage - (COUNT_VISIBLE_LEFT - indexRemainder)
				const plus =
					indexRemainder >= COUNT_VISIBLE_LEFT
						? COUNT_VISIBLE_LEFT
						: indexRemainder

				pagesLeft = [...arrayNumbers.slice(start, indexCurrentPage + plus)]
				pagesRight = [...arrayNumbers.slice(-COUNT_VISIBLE_RIGHT)]
			} else if (
				currentPage >= COUNT_VISIBLE_LEFT &&
				currentPage < totalPages - COUNT_VISIBLE_RIGHT
			) {
				pagesLeft = [...arrayNumbers.slice(0, 1)]
				pagesCenter = [...arrayNumbers.slice(currentPage - 2, currentPage + 1)]
				pagesRight = [...arrayNumbers.slice(-1)]
			} else if (currentPage >= totalPages - COUNT_VISIBLE_RIGHT) {
				pagesLeft = [...arrayNumbers.slice(0, 1)]
				pagesRight = [...arrayNumbers.slice(-COUNT_VISIBLE_LEFT)]
			}
		}

		return { left: pagesLeft, right: pagesRight, center: pagesCenter }
	}, [arrayNumbers, currentPage, totalPages])

	return {
		newPage,
		getPages,
		bind: { handleNextClick, handlePageClick, handlePrevClick },
	}
}
