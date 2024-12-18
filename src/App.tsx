import { Button } from '@/Components/ui/button'
import { Link } from 'react-router'

function App() {
	return (
		<div>
			<Link to={'/products'}>
				<Button
					variant={'secondary'}
					className='w-auto h-52 bg-black text-yellow-500  text-5xl hover:bg-yellow-500 hover:text-black'
				>
					Каталог товаров
				</Button>
			</Link>
		</div>
	)
}

export default App
