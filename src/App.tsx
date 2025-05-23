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
import Slots from './screens/Slots'
import Casino from './screens/Casino'
import Robots from './screens/Robots'
import Openai from './screens/Openai'
import History from './screens/History'
import Articles from './screens/Articles'
import Provider from './screens/Provider'
import { ModalProvider } from './libs/HOC'
import Categories from './screens/Categories'
import Header from './components/Header/Header'
import AddNewNews from './screens/add/AddNewNews'
import AddNewSlot from './screens/add/AddNewSlot'
import AddNewGenre from './screens/add/AddNewGenre'
import WrapperResourse from './features/Constructor'
import UpdateNews from './screens/update/UpdateNews'
import UpdateSlot from './screens/update/UpdateSlot'
import AddNewCasino from './screens/add/AddNewCasino'
import WrapperConfig from './components/WrapperConfig'
import UpdateGenre from './screens/update/UpdateGenre'
import AddNewArticle from './screens/add/AddNewArticle'
import AddNewHistory from './screens/add/AddNewHistory'
import Container from './components/Container/Container'
import UpdateCasino from './screens/update/UpdateCasino'
import AddNewCategory from './screens/add/AddNewCategory'
import AddNewProvider from './screens/add/AddNewProvider'
import UpdateArticle from './screens/update/UpdateArticle'
import UpdateHistory from './screens/update/UpdateHistory'
import { useAuthStore } from './store/authStore/authStore'
import UpdateCategory from './screens/update/UpdateCategory'
import UpdateProvider from './screens/update/UpdateProvider'
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
													<Route path={routes.SLOTS} element={<Slots />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="slots" />
															}
														/>
														<Route
															path={`${routes.ADD_SLOTS}`}
															element={<AddNewSlot />}
														/>
														<Route
															path={`${routes.UPDATE_SLOTS}/:bind_id/:lang`}
															element={<UpdateSlot />}
														/>
													</Route>
													<Route path={routes.PROVIDERS} element={<Provider />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="providers" />
															}
														/>
														<Route
															path={`${routes.ADD_PROVIDER}`}
															element={<AddNewProvider />}
														/>
														<Route
															path={`${routes.UPDATE_PROVIDER}/:itemId`}
															element={<UpdateProvider />}
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
													<Route path={routes.HISTORY} element={<History />}>
														<Route
															path={``}
															element={
																<WrapperResourse variantContent="history" />
															}
														/>
														<Route
															path={routes.ADD_HISTORY}
															element={<AddNewHistory />}
														/>
														<Route
															path={routes.UPDATE_HISTORY}
															element={<UpdateHistory />}
														/>
													</Route>
													<Route
														path={routes.SETTING_ROBOTS}
														element={<Robots />}
													/>
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
														<Route
															path={`${routes.ADD_GENRE}`}
															element={<AddNewGenre />}
														/>
														<Route
															path={`${routes.UPDATE_GENRE}/:itemId`}
															element={<UpdateGenre />}
														/>
													</Route>
													<Route path={routes.OPENAI} element={<Openai />} />
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
