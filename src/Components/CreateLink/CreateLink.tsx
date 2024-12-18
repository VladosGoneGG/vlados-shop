import { Link } from 'react-router'

const CreateLink = () => {
	return (
		<div className='text-yellow-500 text-2xl pt-1'>
			<Link to={'/create-product'}>Добавить продукт ➕</Link>
		</div>
	)
}

export default CreateLink
