import { useState } from 'react'

export const usePagination = (itemsPerPage: number) => {
	const [currentPage, setCurrentPage] = useState(1)

	const paginate = (items: any[]) => {
		const start = (currentPage - 1) * itemsPerPage
		const end = start + itemsPerPage
		return items.slice(start, end)
	}

	return { currentPage, setCurrentPage, paginate }
}
