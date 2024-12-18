import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const loadFromLocalStorage = () => {
	try {
		const serializedState = localStorage.getItem('likedProducts')
		return serializedState ? JSON.parse(serializedState) : []
	} catch (e) {
		console.error('Could not load liked products from localStorage:', e)
		return []
	}
}

const saveToLocalStorage = (state: number[]) => {
	try {
		localStorage.setItem('likedProducts', JSON.stringify(state))
	} catch (e) {
		console.error('Could not save liked products to localStorage:', e)
	}
}

interface LikesState {
	likedProducts: number[]
}

const initialState: LikesState = {
	likedProducts: loadFromLocalStorage(),
}

const likesSlice = createSlice({
	name: 'likes',
	initialState,
	reducers: {
		toggleLike: (state, action: PayloadAction<number>) => {
			const productId = action.payload
			if (state.likedProducts.includes(productId)) {
				state.likedProducts = state.likedProducts.filter(id => id !== productId)
			} else {
				state.likedProducts.push(productId)
			}
			saveToLocalStorage(state.likedProducts)
		},
	},
})

export const { toggleLike } = likesSlice.actions

export default likesSlice.reducer
