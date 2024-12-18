import { ErrorMessageProps } from '@/types/types'

const ErrorMessage = ({ onBack }: ErrorMessageProps) => (
	<div className='text-center'>
		<p className='text-2xl text-red-500'>Ошибка или продукт не найден!</p>
		<button
			onClick={onBack}
			className='mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md'
		>
			Вернуться назад
		</button>
	</div>
)

export default ErrorMessage
