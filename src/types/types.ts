export type Product = {
	id: number
	title: string
	price: number
	description: string
	category: string
	image: string
	rating: {
		rate: number
		count: number
	}
}

export type ProductFormValues = {
	title: string
	price: number
	description: string
	image: string
	category: string
	rating: {
		rate: number
		count: number
	}
}

export type ErrorMessageProps = {
	onBack: () => void
}

export type EditProductFormProps = {
	product: {
		id: number
		title: string
		price: number
		description: string
		image: string
		category: string
	}
	onSave: () => void
	onCancel: () => void
}

export interface ProductCardProps {
	product: any
	isLiked: boolean
	onLike: (id: number) => void
	onRemove: (id: number) => void
}
