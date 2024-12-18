import { productApi } from '@/services/product'
import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import likesReducer from './features/products/likesSlice'
import productsReducer from './features/products/productsSlice'

export const store = configureStore({
	reducer: {
		products: productsReducer,
		likes: likesReducer,
		[productApi.reducerPath]: productApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(productApi.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
