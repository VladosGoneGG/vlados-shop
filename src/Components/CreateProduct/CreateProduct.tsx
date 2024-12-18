import { useCreateProductMutation } from '@/services/product'
import { addProduct } from '@/store/features/products/productsSlice'
import { ProductFormValues } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

const CreateProduct = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ProductFormValues>()

	const [createProduct, { isLoading }] = useCreateProductMutation()
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const onSubmit = async (data: ProductFormValues) => {
		if (!data.image) {
			data.image = 'https://via.placeholder.com/150'
		}

		try {
			const newProduct = await createProduct(data).unwrap()

			console.log('Продукт успешно создан:', newProduct)

			dispatch(addProduct(newProduct))

			reset()

			navigate('/products')
		} catch (error) {
			console.error('Ошибка при создании продукта:', error)
		}
	}

	return (
		<div className='flex items-center gap-20'>
			<section className='max-w-xl mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-lg'>
				<h1 className='text-2xl font-bold mb-6'>Добавить продукт</h1>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<fieldset>
						<legend className='sr-only'>Форма для добавления продукта</legend>
						<div>
							<label className='block font-medium mb-2' htmlFor='title'>
								Название
							</label>
							<input
								id='title'
								type='text'
								{...register('title', { required: 'Название обязательно' })}
								className={`w-full px-4 py-2 border rounded-md ${
									errors.title ? 'border-red-500' : 'border-gray-300'
								}`}
								aria-describedby={errors.title ? 'title-error' : undefined}
							/>
							{errors.title && (
								<span id='title-error' className='text-red-500 text-sm mt-1'>
									{errors.title.message}
								</span>
							)}
						</div>
						<div>
							<label className='block font-medium mb-2' htmlFor='price'>
								Цена
							</label>
							<input
								id='price'
								type='number'
								step='0.01'
								{...register('price', { required: 'Цена обязательна' })}
								className={`w-full px-4 py-2 border rounded-md ${
									errors.price ? 'border-red-500' : 'border-gray-300'
								}`}
								aria-describedby={errors.price ? 'price-error' : undefined}
							/>
							{errors.price && (
								<span id='price-error' className='text-red-500 text-sm mt-1'>
									{errors.price.message}
								</span>
							)}
						</div>
						<div>
							<label className='block font-medium mb-2' htmlFor='description'>
								Описание
							</label>
							<textarea
								id='description'
								{...register('description', {
									required: 'Описание обязательно',
								})}
								rows={4}
								className={`w-full px-4 py-2 border rounded-md ${
									errors.description ? 'border-red-500' : 'border-gray-300'
								}`}
								aria-describedby={
									errors.description ? 'description-error' : undefined
								}
							></textarea>
							{errors.description && (
								<span
									id='description-error'
									className='text-red-500 text-sm mt-1'
								>
									{errors.description.message}
								</span>
							)}
						</div>
						<div>
							<label className='block font-medium mb-2' htmlFor='image'>
								URL изображения (необязательно)
							</label>
							<input
								id='image'
								type='url'
								{...register('image', {
									pattern: {
										value: /^https?:\/\/.+/,
										message: 'Введите корректный URL',
									},
								})}
								className={`w-full px-4 py-2 border rounded-md ${
									errors.image ? 'border-red-500' : 'border-gray-300'
								}`}
								aria-describedby={errors.image ? 'image-error' : undefined}
							/>
							{errors.image && (
								<span id='image-error' className='text-red-500 text-sm mt-1'>
									{errors.image.message}
								</span>
							)}
						</div>
						<div>
							<label className='block font-medium mb-2' htmlFor='category'>
								Категория
							</label>
							<input
								id='category'
								type='text'
								{...register('category', {
									required: 'Категория обязательна',
								})}
								className={`w-full px-4 py-2 border rounded-md ${
									errors.category ? 'border-red-500' : 'border-gray-300'
								}`}
								aria-describedby={
									errors.category ? 'category-error' : undefined
								}
							/>
							{errors.category && (
								<span id='category-error' className='text-red-500 text-sm mt-1'>
									{errors.category.message}
								</span>
							)}
						</div>
						<div className='flex gap-5 justify-center items-center'>
							<button
								type='submit'
								disabled={isLoading}
								className='w-auto px-4 py-2 my-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors'
							>
								{isLoading ? 'Добавление...' : 'Добавить продукт'}
							</button>
							<Link
								to={'/products'}
								className='w-28 px-4 py-2 my-2 bg-gray-800 text-white rounded-md'
							>
								Назад
							</Link>
						</div>
					</fieldset>
				</form>
			</section>
		</div>
	)
}

export default CreateProduct
