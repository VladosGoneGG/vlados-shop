import { useUpdateProductMutation } from '@/services/product'
import { updProduct } from '@/store/features/products/productsSlice'
import { EditProductFormProps } from '@/types/types'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'

const EditProductForm = ({
	product,
	onSave,
	onCancel,
}: EditProductFormProps) => {
	const { register, handleSubmit } = useForm({
		defaultValues: {
			title: product.title,
			price: product.price.toString(),
			description: product.description,
			image: product.image,
			category: product.category,
		},
	})

	const [updateProduct, { isLoading, isError }] = useUpdateProductMutation()

	const dispatch = useDispatch()

	const onSubmit = async (data: any) => {
		try {
			const updatedProduct = {
				...product,
				...data,
				price: Number(data.price),
			}

			await updateProduct(updatedProduct).unwrap()

			console.log('Обновленный продукт:', updatedProduct)

			dispatch(updProduct(updatedProduct))

			onSave()
		} catch (error) {
			console.error('Ошибка при обновлении продукта:', error)
		}
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
			<div>
				<label htmlFor='title'>Название</label>
				<input
					id='title'
					type='text'
					{...register('title', { required: 'Название обязательно' })}
					className='w-full border px-4 py-2 rounded-md'
				/>
			</div>
			<div>
				<label htmlFor='price'>Цена</label>
				<input
					id='price'
					type='text'
					{...register('price', { required: 'Цена обязательна' })}
					className='w-full border px-4 py-2 rounded-md'
				/>
			</div>
			<div>
				<label htmlFor='description'>Описание</label>
				<textarea
					id='description'
					{...register('description', { required: 'Описание обязательно' })}
					className='w-full border px-4 py-2 rounded-md'
				></textarea>
			</div>
			<div>
				<label htmlFor='image'>URL изображения</label>
				<input
					id='image'
					type='text'
					{...register('image')}
					className='w-full border px-4 py-2 rounded-md'
				/>
			</div>
			<div>
				<label htmlFor='category'>Категория</label>
				<input
					id='category'
					type='text'
					{...register('category', { required: 'Категория обязательна' })}
					className='w-full border px-4 py-2 rounded-md'
				/>
			</div>
			<div className='flex space-x-4'>
				<button
					type='submit'
					className='bg-yellow-500 text-black px-4 py-2 rounded-md'
					disabled={isLoading}
				>
					{isLoading ? 'Сохранение...' : 'Сохранить'}
				</button>
				<button
					type='button'
					onClick={onCancel}
					className='bg-gray-800 text-white px-4 py-2 rounded-md'
				>
					Отмена
				</button>
			</div>
			{isError && (
				<p className='text-red-500'>Ошибка при обновлении продукта</p>
			)}
		</form>
	)
}

export default EditProductForm
