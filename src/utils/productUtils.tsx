export const filterProducts = (
	products: any[],
	searchQuery: string,
	selectedCategory: string,
	showFavorites: boolean,
	likedProducts: number[]
) => {
	return products.filter(product => {
		const matchesSearch =
			product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			product.description.toLowerCase().includes(searchQuery.toLowerCase())
		const matchesCategory =
			selectedCategory === 'all' || product.category === selectedCategory
		const matchesFavorites =
			!showFavorites || likedProducts.includes(product.id)
		return matchesSearch && matchesCategory && matchesFavorites
	})
}

export const removeProductById = (id: number, products: any[]) => {
	return products.filter(product => product.id !== id)
}

export const renderLoadingState = () => (
	<div className='flex justify-center items-center'>
		<div className='animate-spin rounded-full border-t-4 border-blue-500 w-16 h-16'></div>
		<p className='text-5xl text-yellow-500 mx-5'>Загружаем...</p>
	</div>
)

export const renderErrorState = () => (
	<p className='text-5xl text-yellow-500 mx-5'>Ошибка :(</p>
)
