interface SearchBarProps {
	value: string
	onChange: (value: string) => void
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
	return (
		<input
			type='text'
			value={value}
			onChange={e => onChange(e.target.value)}
			placeholder='Поиск...'
			className='p-2 border border-gray-300 rounded-md w-full md:w-auto'
		/>
	)
}

export default SearchBar
