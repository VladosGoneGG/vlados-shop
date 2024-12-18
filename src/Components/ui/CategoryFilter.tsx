interface CategoryFilterProps {
	selectedCategory: string
	onChange: (value: string) => void
}

const CategoryFilter = ({
	selectedCategory,
	onChange,
}: CategoryFilterProps) => {
	const categories = ['all', 'electronics', "men's clothing", 'jewelery']
	return (
		<select
			value={selectedCategory}
			onChange={e => onChange(e.target.value)}
			className='p-2 border border-gray-300 rounded-md'
		>
			{categories.map(category => (
				<option key={category} value={category}>
					{category === 'all' ? 'Все категории' : category}
				</option>
			))}
		</select>
	)
}

export default CategoryFilter
