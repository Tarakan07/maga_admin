import { useNavigate } from 'react-router-dom'
import React, { FC, useEffect, useState } from 'react'
import Tabs from '@/components/Tabs/Tabs'
import { routes } from '@/constants/routes'
import useTabs from '@/libs/hooks/use-tabs'
import { generateLink } from '@/libs/utils/generateLink'
import { TLangKey } from '@/libs/context/LanguageProvider'
import { HeaderActions } from '@/features/Constructor/_common/_comp'
import { TVariantOpenPage } from '@/features/Constructor/Constructor.type'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import {
	TGenresBodyEdit,
	TGenresCreateRes,
} from '@/services/API/genres/genres.type'
import WrapperAddNewResource from '@/features/Constructor/_common/_comp/WrapperAddNewResource'
import { TCategoriesKeysTabs } from '@/store/newResourceStore/_common/categories/categoriesStore'
import ReceivingData from '@/features/Constructor/_common/AddNewResource/ReceivingData/ReceivingData'
import SettingWidget from '@/features/Constructor/_common/AddNewResource/SettingWidget/SettingWidget'
import EmbeddedContent from '@/features/Constructor/_common/AddNewResource/EmbeddedContent/EmbeddedContent'
import {
	useCreateGenre,
	useDeleteGenreById,
	useGetGenreById,
	useUpdateGenreById,
} from '@/services/API/genres/hook'
import {
	INIT_CONSTRUCTOR_DATA,
	useConstructorStore,
} from '@/store/newResourceStore/_common/constructor/constructorStore'
import { VariantNewResourceContext } from '@/features/Constructor/_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'
import { INIT_DATA, INIT_TABS } from './const'
import s from './WrapperAddNewGenre.module.scss'
import SeoResource from './SeoResource/SeoResource'
import { TGenresJsonObj, THandleChangeFromParams } from './type'

const WrapperAddNewGenre: FC<TVariantOpenPage> = ({
	editFor,
	labelPage,
	id = -1,
}) => {
	const { activeTab, changeTabs, tabs } =
		useTabs<TCategoriesKeysTabs>(INIT_TABS)

	const { lang, handleChangeLang } = useLang()

	const [formData, setFormData] = useState<TGenresBodyEdit>(INIT_DATA)
	const [interceptionProps, setInterceptionProps] = useState<
		Required<Pick<TVariantOpenPage, 'editFor' | 'id'>>
	>({
		editFor,
		id: id || -1,
	})

	const { mutateAsync: createItem, data } = useCreateGenre()
	const { mutateAsync: deleteItem } = useDeleteGenreById()
	const { mutateAsync: getItem } = useGetGenreById()
	const { mutateAsync: updateItem } = useUpdateGenreById()
	// const { handleEdit } = useEditCat({
	// 	bindActions: {
	// 		createItem,
	// 		deleteItem,
	// 		updateItem,
	// 	},
	// })

	const navigate = useNavigate()

	const handleCopyStore = async () => {
		const copyArray: TGenresJsonObj = {
			...formData,
			translations: {
				...formData.translations[lang],
			},
		}
		if (!!JSON.stringify({ ...copyArray }).length)
			await navigator.clipboard.writeText(JSON.stringify({ ...copyArray }))
	}

	const handleChangeForm = ({ key, value, lang }: THandleChangeFromParams) => {
		setFormData((prev) => {
			if (lang) {
				return {
					...prev,
					translations: {
						...prev.translations,
						[lang]: {
							...prev.translations[lang],
							[key]: value,
						},
					},
				}
			}
			return {
				...prev,

				link: key === 'title' ? generateLink(value) : prev.link,
				[key]: value,
			}
		})
	}

	const handleChangeConstructor = () => {
		setFormData((prev) => {
			return {
				...prev,
				translations: {
					...prev.translations,
					[lang]: {
						...prev.translations[lang],
						content: useConstructorStore.getState().bindStore.category || [],
					},
				},
			}
		})
	}
	///ПЕРЕДЕЛАТЬ НА handleEdit, добавить return'ы
	const handleSentData = async () => {
		// handleEdit({
		//   data: formData,
		//   variantEdit: editFor === 'ADD' ? 'create' : 'update',
		// })
		if (interceptionProps.editFor === 'ADD') {
			await createItem(formData).then((e) => {
				setInterceptionProps((prev) => {
					return {
						...prev,
						id: !e?.id ? -1 : e?.id,
						editFor: 'UPDATE',
					}
				})
			})
		} else if (interceptionProps.editFor === 'UPDATE') {
			await updateItem({ id: interceptionProps.id, _body: formData })
		}
	}

	const handleChangeLangWithSaveConstructor = (value: TLangKey) => {
		handleChangeConstructor()
		handleChangeLang(value)
	}

	const fetchDeleteData = async () => {
		const _id = interceptionProps?.id || -1
		if (interceptionProps.editFor === 'UPDATE') {
			await deleteItem({
				id: _id,
			})
				.then(() => {
					navigate(-1)
				})
				.then(() => {
					console.log('success remove genre')
				})
		} else if (interceptionProps.editFor === 'ADD') {
			setFormData(INIT_DATA)
			///Переделать на useManipulationProps
			useConstructorStore.setState((state) => ({
				...state,
				bindStore: {
					...state.bindStore,
					category: INIT_CONSTRUCTOR_DATA.category,
				},
			}))
			///Вынести handleChangeConstructor в useEffect, убрать двустороннюю связь
			handleChangeConstructor()
		}
	}

	useEffect(() => {
		if (interceptionProps.id > -1) {
			getItem({ id: interceptionProps.id })
				.then((e) => {
					const transformData: TGenresCreateRes = {
						...e,
						translations: {
							...INIT_DATA.translations,
							...e.translations,
						},
					}
					setFormData(transformData)
					return e
				})
				.then((e) => {
					useConstructorStore.setState((state) => ({
						...state,
						bindStore: {
							...state.bindStore,
							category: e.translations[lang]?.content || [],
						},
					}))
				})
		}
		///Переделать на useManipulationProps
		else {
			useConstructorStore.setState((state) => ({
				...state,
				bindStore: {
					...state.bindStore,
					category: formData.translations[lang].content,
				},
			}))
		}
	}, [interceptionProps.id, lang])

	return (
		<VariantNewResourceContext.Provider value={{ variantResource: 'category' }}>
			<WrapperAddNewResource
				title={labelPage}
				goBack={true}
				pathBack={`/${routes.ADMIN_PAGE}/${routes.CATEGORIES}/`}
				rightComp={
					<HeaderActions
						disabled={false}
						handleUpdateStore={handleChangeConstructor}
						handleCopyStore={handleCopyStore}
					/>
				}
			>
				<div className={s.wrap}>
					<div className={s.main_block}>
						<Tabs data={tabs} callback={changeTabs} saveData={() => {}} />
						{activeTab.key === 'seo' && (
							<SeoResource {...{ formData, handleChangeForm }} />
						)}
						{activeTab.key === 'review' && <ReceivingData />}
					</div>
					<div className={s.widgets_block}>
						{activeTab.key === 'review' && <EmbeddedContent />}
						<SettingWidget
							handleSent={handleSentData}
							handleRemove={fetchDeleteData}
							editFor={interceptionProps.editFor}
							callbackLang={handleChangeLangWithSaveConstructor}
						/>
					</div>
				</div>
			</WrapperAddNewResource>
		</VariantNewResourceContext.Provider>
	)
}

export default WrapperAddNewGenre
