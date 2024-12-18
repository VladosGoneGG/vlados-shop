import { Product } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type ProductsState = {
	products: Record<number, Product>
}

const initialState: ProductsState = {
	products: {},
}

const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {
		addProduct: (state, action: PayloadAction<Product>) => {
			state.products[action.payload.id] = action.payload
		},
		updProduct: (state, action: PayloadAction<Product>) => {
			state.products[action.payload.id] = action.payload
		},
		setProducts: (state, action: PayloadAction<Product[]>) => {
			action.payload.forEach(product => {
				state.products[product.id] = product
			})
		},
	},
})

export const { addProduct, updProduct, setProducts } = productsSlice.actions

export const selectProductById = (
	state: { products: ProductsState },
	id: number
) => state.products.products[id]

export default productsSlice.reducer
