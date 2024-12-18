import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Routes } from 'react-router'
import App from './App.tsx'
import CreateProduct from './Components/CreateProduct/CreateProduct.tsx'
import Footer from './Components/Footer/Footer.tsx'
import { Header } from './Components/Header/Header.tsx'
import ProductDetails from './Components/ProductDetails/ProductDetails.tsx'
import ProductList from './Components/ProductsList/ProductList.tsx'
import './index.css'
import { store } from './store/store.ts'

createRoot(document.getElementById('root')!).render(
	<Provider store={store}>
		<BrowserRouter basename='/vlados-shop'>
			<div className='w-full min-h-screen flex flex-col'>
				<Header />
				<div className='flex-grow flex items-center justify-center bg-gray-800'>
					<Routes>
						<Route path='/' element={<App />} />
						<Route path='/products' element={<ProductList />} />
						<Route path='/products/:id' element={<ProductDetails />} />
						<Route path='/create-product' element={<CreateProduct />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</BrowserRouter>
	</Provider>
)
