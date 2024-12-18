import { Link } from 'react-router'

export const Header = () => {
	return (
		<header className='bg-black h-20 flex gap-5 items-center px-5'>
			<Link to={'/'}>
				<p className='text-4xl text-yellow-500'>Vlados.shop</p>
			</Link>
		</header>
	)
}
