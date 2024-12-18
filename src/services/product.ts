import type { Product } from '@/types/types'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productApi = createApi({
	reducerPath: 'productsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
	endpoints: builder => ({
		getProducts: builder.query<Product[], void>({
			query: () => 'products',
		}),

		getProductById: builder.query<Product, string>({
			query: id => `products/${id}`,
		}),

		createProduct: builder.mutation<Product, Partial<Product>>({
			query: newProduct => ({
				url: 'products',
				method: 'POST',
				body: newProduct,
			}),
		}),

		updateProduct: builder.mutation<
			Product,
			{ id: string; data: Partial<Product> }
		>({
			query: ({ id, data }) => ({
				url: `products/${id}`,
				method: 'PUT',
				body: data,
			}),
		}),

		deleteProduct: builder.mutation<{ success: boolean }, string>({
			query: id => ({
				url: `products/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
})

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi
