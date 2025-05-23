import { useLayoutEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
	Navigate,
	Route,
	BrowserRouter as Router,
	Routes,
} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { routes } from '@/constants/routes'
import Auth from './screens/Auth'
import News from './screens/News'
import Casino from './screens/Casino'
import Articles from './screens/Articles'
import { ModalProvider } from './libs/HOC'
import Categories from './screens/Categories'
import Header from './components/Header/Header'
import AddNewNews from './screens/add/AddNewNews'
import WrapperResourse from './features/Constructor'
import UpdateNews from './screens/update/UpdateNews'
import AddNewCasino from './screens/add/AddNewCasino'
import WrapperConfig from './components/WrapperConfig'
import AddNewArticle from './screens/add/AddNewArticle'
import Container from './components/Container/Container'
import UpdateCasino from './screens/update/UpdateCasino'
import AddNewCategory from './screens/add/AddNewCategory'
import UpdateArticle from './screens/update/UpdateArticle'
import { useAuthStore } from './store/authStore/authStore'
import UpdateCategory from './screens/update/UpdateCategory'
import { LanguageProvider } from './libs/context/LanguageProvider'
import WrapperCategories from './features/Constructor/Categories/WrapperCat'

function App() {
	const { isAuthenticated, checkAuthentication } = useAuthStore()

	const queryClient = new QueryClient()

	useLayoutEffect(() => {
		checkAuthentication()
	}, [checkAuthentication])

	return (
		<QueryClientProvider client={queryClient}>
			<Router>
				<LanguageProvider>
					<ModalProvider>
						<>
							<ToastContainer
								autoClose={500}
								limit={2}
								pauseOnFocusLoss={false}
								position="bottom-right"
								theme="dark"
								pauseOnHover={false}
								closeOnClick
							/>
							<Container>
								<Header />
								{isAuthenticated !== null && (
									<Routes>
										<Route path="/" element={<Auth />} />
										{isAuthenticated ? (
											<>
												<Route
													path={routes.ADMIN_PAGE}
													element={<WrapperConfig />}
												>
													<Route path={routes.CASINO} element={<Casino />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="casino" />
															}
														/>
														<Route
															path={`${routes.ADD_CASINO}`}
															element={<AddNewCasino />}
														/>
														<Route
															path={`${routes.UPDATE_CASINO}/:bind_id/:lang`}
															element={<UpdateCasino />}
														/>
													</Route>

													<Route path={routes.NEWS} element={<News />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="news" />
															}
														/>
														<Route
															path={`${routes.ADD_NEWS}`}
															element={<AddNewNews />}
														/>
														<Route
															path={`${routes.UPDATE_NEWS}/:bind_id/:lang`}
															element={<UpdateNews />}
														/>
													</Route>
													<Route path={routes.ARTICLE} element={<Articles />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="articles" />
															}
														/>
														<Route
															path={`${routes.ADD_ARTICLE}`}
															element={<AddNewArticle />}
														/>
														<Route
															path={`${routes.UPDATE_ARTICLE}/:bind_id/:lang`}
															element={<UpdateArticle />}
														/>
													</Route>

													<Route
														path={routes.CATEGORIES}
														element={<Categories />}
													>
														<Route path={``} element={<WrapperCategories />} />
														<Route
															path={`${routes.ADD_CATEGORY}`}
															element={<AddNewCategory />}
														/>
														<Route
															path={`${routes.UPDATE_CATEGORY}/:itemId`}
															element={<UpdateCategory />}
														/>
													</Route>
												</Route>
												<Route
													path={routes.ACCOUNT}
													element={<div>Профиль пользователя</div>}
												/>
												<Route
													path="*"
													element={<Navigate to={routes.ADMIN_PAGE} />}
												/>
											</>
										) : (
											<Route path="*" element={<Navigate to="/" />} />
										)}
									</Routes>
								)}
							</Container>
						</>
					</ModalProvider>
				</LanguageProvider>
			</Router>
		</QueryClientProvider>
	)
}

export default App
