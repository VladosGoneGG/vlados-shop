interface PaginationProps {
	currentPage: number
	totalPages: number
	onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onPageChange,
}) => {
	if (totalPages <= 1) return null

	const pageNumbers = Array.from(
		{ length: totalPages },
		(_, index) => index + 1
	)

	return (
		<div className='flex justify-center items-center space-x-2 mt-4 mb-4'>
			<button
				onClick={() => onPageChange(1)}
				disabled={currentPage === 1}
				className='px-4 py-2 bg-black text-yellow-500 rounded-lg disabled:hidden'
			>
				❮❮
			</button>
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className='px-4 py-2 bg-black text-yellow-500 rounded-lg disabled:hidden'
			>
				❮
			</button>
			{pageNumbers.map(pageNumber => (
				<button
					key={pageNumber}
					onClick={() => onPageChange(pageNumber)}
					className={`px-4 py-2 rounded-lg ${
						pageNumber === currentPage ? 'bg-black text-yellow-500' : 'bg-white'
					}`}
				>
					{pageNumber}
				</button>
			))}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className='px-4 py-2 bg-black text-yellow-500 rounded-lg disabled:hidden'
			>
				❯
			</button>
			<button
				onClick={() => onPageChange(totalPages)}
				disabled={currentPage === totalPages}
				className='px-4 py-2 bg-black text-yellow-500 rounded-lg disabled:hidden'
			>
				❯❯
			</button>
		</div>
	)
}

export default Pagination
