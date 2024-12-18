import EditProductForm from '@/Components/EditProductForm/EditProductForm'
import { toggleLike } from '@/store/features/products/likesSlice'
import { selectProductById } from '@/store/features/products/productsSlice'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router'
import CloseSvg from '../CloseSvg/CloseSvg'
import LikeSvg from '../LikeSvg/LikeSvg'
import RatingSvg from '../RatingSvg/RatingSvg'
import ErrorMessage from '../ui/ErrorMessage'

const ProductDetails = () => {
	const { id } = useParams()
	const navigate = useNavigate()
	const [isEditing, setIsEditing] = useState(false)
	const dispatch = useDispatch()
	const product = useSelector((state: RootState) =>
		selectProductById(state, Number(id))
	)
	const likedProducts = useSelector(
		(state: RootState) => state.likes.likedProducts
	)
	const toggleLikeHandler = (id: number) => {
		dispatch(toggleLike(id))
	}
	const toggleEdit = () => setIsEditing(prev => !prev)

	if (!product) {
		return <ErrorMessage onBack={() => navigate(-1)} />
	}

	return (
		<div className='max-w-4xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
			{isEditing ? (
				<EditProductForm
					product={product}
					onSave={() => {
						toggleEdit()
					}}
					onCancel={toggleEdit}
				/>
			) : (
				<>
					<div className='flex flex-col md:flex-row items-center space-x-6'>
						<figure>
							<img
								src={product.image}
								alt={product.title}
								className='w-64 h-64 object-contain rounded-md border'
							/>
							<figcaption className='sr-only'>
								Изображение продукта {product.title}
							</figcaption>
						</figure>
						<article className='flex flex-col w-80  gap-3'>
							<h1 className='text-2xl font-bold'>{product.title}</h1>
							<p className='text-lg'>Category: {product.category}</p>
							<p className='text-lg'>{product.description}</p>
							<p className='text-xl font-semibold text-green-600'>
								${product.price}
							</p>
							<div className='flex items-center space-x-1 mb-4'>
								<div className='flex text-yellow-500'>
									{product.rating?.rate
										? Array.from({
												length: Math.round(product.rating.rate),
										  }).map((_, i) => <RatingSvg key={i} i={i} />)
										: null}
								</div>

								<span className='text-sm text-gray-500'>
									{product.rating?.count > 0
										? `(${product.rating.count} отзывов)`
										: 'Нет оценок'}
								</span>
							</div>
						</article>
					</div>

					<div className='flex space-x-4 mt-6'>
						<button
							onClick={() => toggleLikeHandler(product.id)}
							className={`flex items-center px-4 py-2 rounded-md transition-colors ${
								likedProducts.includes(product.id)
									? 'bg-red-100 text-red-500'
									: 'bg-gray-100 text-gray-500'
							} hover:bg-red-200`}
						>
							<LikeSvg />
							{likedProducts.includes(product.id)
								? 'В избранном'
								: 'Добавить в избранное'}
						</button>
						<button
							onClick={toggleEdit}
							className='bg-yellow-500 text-black px-4 py-2 rounded-md'
						>
							Редактировать
						</button>
						<button
							onClick={() => navigate(-1)}
							className='bg-gray-800 text-white px-4 items-center flex py-2 rounded-md'
						>
							<CloseSvg /> Назад
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default ProductDetails
