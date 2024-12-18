interface FavoritesFilterProps {
	showFavorites: boolean
	onChange: (value: boolean) => void
}

const FavoritesFilter = ({ showFavorites, onChange }: FavoritesFilterProps) => {
	return (
		<button
			onClick={() => onChange(!showFavorites)}
			className={`px-4 py-2 rounded-md ${
				showFavorites
					? 'bg-pink-200 text-black'
					: 'bg-gray-200 text-gray-700 hover:bg-pink-100'
			} transition-colors`}
		>
			{showFavorites ? 'Показывать все' : 'Только избранное'}
		</button>
	)
}

export default FavoritesFilter
