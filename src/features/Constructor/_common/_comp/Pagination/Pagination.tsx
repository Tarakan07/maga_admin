import { FC, useEffect } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { ArrowPaginationSvg } from '@/_assets/svg/arrows'
import s from './Pagination.module.scss'
import { usePagination } from './_hooks/use-pagination'

type TProps = {
	totalPages: number
	currentPage: number
	step: (params: number) => void
}

const Pagination: FC<TProps> = ({ totalPages, currentPage, step }) => {
	const { newPage, getPages, bind } = usePagination({ totalPages, currentPage })

	useEffect(() => {
		step(newPage)
	}, [newPage])

	return (
		<div className={s.pagination}>
			<div
				className={cn(s.circle, s.arrow, s.arrowLeft, {
					[s.inactive]: currentPage === 1,
				})}
				onClick={bind.handlePrevClick}
			>
				<ArrowPaginationSvg isInactive={currentPage === 1} />
			</div>
			<div className={s.wrapNumbers}>
				{getPages.left.map((page) => (
					<div
						key={page}
						className={cn(s.circle, s.number, {
							[s.active]: page === currentPage,
						})}
						onClick={() => bind.handlePageClick(page)}
					>
						<P size="s">{page}</P>
					</div>
				))}
				{getPages.center && (
					<>
						<div>....</div>
						{getPages.center.map((page) => (
							<div
								key={page}
								className={cn(s.circle, s.number, {
									[s.active]: page === currentPage,
								})}
								onClick={() => bind.handlePageClick(page)}
							>
								<P size="s">{page}</P>
							</div>
						))}
					</>
				)}
				{getPages.right && (
					<>
						<div>....</div>
						{getPages.right.map((page) => (
							<div
								key={page}
								className={cn(s.circle, s.number, {
									[s.active]: page === currentPage,
								})}
								onClick={() => bind.handlePageClick(page)}
							>
								<P size="s">{page}</P>
							</div>
						))}
					</>
				)}
			</div>
			<div
				className={cn(s.circle, s.arrow, s.arrowRight, {
					[s.inactive]: currentPage === totalPages,
				})}
				onClick={bind.handleNextClick}
			>
				<ArrowPaginationSvg isInactive={currentPage === totalPages} />
			</div>
		</div>
	)
}

export default Pagination
