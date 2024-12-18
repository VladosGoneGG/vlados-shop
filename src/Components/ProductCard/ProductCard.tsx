import { ProductCardProps } from '@/types/types'
import { Link } from 'react-router'
import CloseSvg from '../CloseSvg/CloseSvg'
import LikeSvg from '../LikeSvg/LikeSvg'
import RatingSvg from '../RatingSvg/RatingSvg'

const ProductCard = ({
	product,
	isLiked,
	onLike,
	onRemove,
}: ProductCardProps) => (
	<article className='relative bg-white border border-gray-200 rounded-lg shadow-lg p-5 flex flex-col items-center hover:shadow-2xl transition-shadow'>
		<Link
			to={`/products/${product.id}`}
			aria-label={`Перейти к продукту ${product.title}`}
		>
			<figure className='mb-4'>
				<img
					src={product.image}
					alt={product.title}
					className='w-40 h-40 object-contain mb-4 rounded-md'
				/>
				<figcaption className='text-lg font-semibold text-center mb-2 line-clamp-1 max-w-[250px]'>
					{product.title}
				</figcaption>
			</figure>
			<p className='text-xl font-bold text-green-600 mb-2'>${product.price}</p>
			<p className='text-sm text-gray-600 mb-4 text-left line-clamp-2 max-w-[300px]'>
				{product.description}
			</p>
			<div className='flex items-center space-x-1 mb-4'>
				<div className='flex text-yellow-500'>
					{product.rating?.rate
						? Array.from({ length: Math.round(product.rating.rate) }).map(
								(_, i) => <RatingSvg key={i} i={i} />
						  )
						: null}
				</div>

				<span className='text-sm text-gray-500'>
					{product.rating?.count > 0
						? `(${product.rating.count} отзывов)`
						: 'Нет оценок'}
				</span>
			</div>
		</Link>
		<div className='absolute top-3 right-3 flex space-x-2'>
			<button
				onClick={e => {
					e.preventDefault()
					onLike(product.id)
				}}
				className={`p-2 rounded-full transition-colors ${
					isLiked ? 'text-red-500' : 'text-gray-400'
				} hover:text-red-500`}
				title='Нравится'
				aria-label={`Поставить лайк продукту ${product.title}`}
			>
				<LikeSvg />
			</button>
			<button
				onClick={e => {
					e.preventDefault()
					onRemove(product.id)
				}}
				className='p-2 text-gray-400 hover:text-red-500 transition-colors'
				title='Удалить'
				aria-label={`Удалить продукт ${product.title}`}
			>
				<CloseSvg />
			</button>
		</div>
	</article>
)

export default ProductCard
