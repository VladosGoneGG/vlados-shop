import ProductCard from '@/Components/ProductCard/ProductCard'
import CategoryFilter from '@/Components/ui/CategoryFilter'
import FavoritesFilter from '@/Components/ui/FavoritesFilter'
import Pagination from '@/Components/ui/Pagination'
import SearchBar from '@/Components/ui/SearchBar'
import { usePagination } from '@/hooks/usePagination'
import { useGetProductsQuery } from '@/services/product'
import { toggleLike } from '@/store/features/products/likesSlice'
import { setProducts } from '@/store/features/products/productsSlice'
import { RootState } from '@/store/store'
import {
	filterProducts,
	removeProductById,
	renderErrorState,
	renderLoadingState,
} from '@/utils/productUtils'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CreateLink from '../CreateLink/CreateLink'

const ProductList = () => {
	const products = useSelector((state: RootState) => state.products.products)
	const likedProducts = useSelector(
		(state: RootState) => state.likes.likedProducts
	)

	const { currentPage, setCurrentPage, paginate } = usePagination(6)

	const [searchQuery, setSearchQuery] = useState('')
	const [selectedCategory, setSelectedCategory] = useState('all')
	const [showFavorites, setShowFavorites] = useState(false)
	const [filteredProducts, setFilteredProducts] = useState(
		Object.values(products)
	)

	const {
		data: fetchedProducts = [],
		isLoading,
		isError,
	} = useGetProductsQuery()

	const dispatch = useDispatch()

	useEffect(() => {
		if (Object.keys(products).length === 0 && fetchedProducts.length) {
			dispatch(setProducts(fetchedProducts))
		}
	}, [fetchedProducts, dispatch, products])

	useEffect(() => {
		const filtered = filterProducts(
			Object.values(products),
			searchQuery,
			selectedCategory,
			showFavorites,
			likedProducts
		)
		setFilteredProducts(filtered)
		setCurrentPage(1)
	}, [searchQuery, selectedCategory, showFavorites, products, setCurrentPage])

	const removeProduct = (id: number) => {
		setFilteredProducts(prevList => removeProductById(id, prevList))
	}

	if (isLoading || Object.keys(products).length === 0)
		return renderLoadingState()
	if (isError) return renderErrorState()

	const currentProducts = paginate(filteredProducts)

	return (
		<div className='p-6'>
			<div className='flex flex-col md:flex-row gap-4 mb-6'>
				<SearchBar value={searchQuery} onChange={setSearchQuery} />
				<CategoryFilter
					selectedCategory={selectedCategory}
					onChange={setSelectedCategory}
				/>
				<FavoritesFilter
					showFavorites={showFavorites}
					onChange={setShowFavorites}
				/>
				<CreateLink />
			</div>

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
				{currentProducts.map(product => (
					<ProductCard
						key={product.id}
						product={product}
						isLiked={likedProducts.includes(product.id)}
						onLike={id => dispatch(toggleLike(id))}
						onRemove={() => removeProduct(product.id)}
					/>
				))}
			</div>

			<Pagination
				currentPage={currentPage}
				totalPages={Math.ceil(filteredProducts.length / 6)}
				onPageChange={setCurrentPage}
			/>
		</div>
	)
}

export default ProductList
