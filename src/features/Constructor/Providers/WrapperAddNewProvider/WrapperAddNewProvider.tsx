import Tabs from '@/components/Tabs/Tabs'
import { routes } from '@/constants/routes'
import { TLangKey } from '@/libs/context/LanguageProvider'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import useTabs from '@/libs/hooks/use-tabs'
import { generateLink } from '@/libs/utils/generateLink'
import { useCreateProvider, useDeleteProviderById, useGetProviderById, useUpdateProviderById } from '@/services/API/providers/hook'
import { TProvidersBodyEdit, TProvidersCreateRes } from '@/services/API/providers/providers.type'
import { TCategoriesKeysTabs } from '@/store/newResourceStore/_common/categories/categoriesStore'
import { INIT_CONSTRUCTOR_DATA, useConstructorStore } from '@/store/newResourceStore/_common/constructor/constructorStore'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HeaderActions } from '../../_common/_comp'
import WrapperAddNewResource from '../../_common/_comp/WrapperAddNewResource'
import EmbeddedContent from '../../_common/AddNewResource/EmbeddedContent/EmbeddedContent'
import { VariantNewResourceContext } from '../../_common/AddNewResource/ReceivingData/_context/VariantNewResourceContext'
import ReceivingData from '../../_common/AddNewResource/ReceivingData/ReceivingData'
import SettingWidget from '../../_common/AddNewResource/SettingWidget/SettingWidget'
import { TVariantOpenPage } from '../../Constructor.type'
import { useFetchConfigCasinos } from '../_hooks/use-casino'
import { useFetchConfigSlots } from '../_hooks/use-slots'
import { INIT_DATA, INIT_TABS } from './const'
import ProviderResource from './ProviderResource/ProviderResource'
import SeoResource from './SeoResource/SeoResource'
import { THandleChangeFromParams, TProvidersJsonObj } from './type'
import s from './WrapperAddNewSlot.module.scss'

const WrapperAddNewProvider: FC<TVariantOpenPage> = ({
    editFor,
    labelPage,
    id = -1,
}) => {
	const { activeTab, changeTabs, tabs } =
    useTabs<TCategoriesKeysTabs>(INIT_TABS)

    const { lang, handleChangeLang } = useLang()

    const [formData, setFormData] = useState<TProvidersBodyEdit>(INIT_DATA)
    const [interceptionProps, setInterceptionProps] = useState<
        Required<Pick<TVariantOpenPage, 'editFor' | 'id'>>
    >({
        editFor,
        id: id || -1,
    })

    const { mutateAsync: createItem, data } = useCreateProvider()
    const { mutateAsync: deleteItem } = useDeleteProviderById()
    const { mutateAsync: getItem } = useGetProviderById()
    const { mutateAsync: updateItem } = useUpdateProviderById()
    const { selectedSlots, bindActionsSlots } = useFetchConfigSlots()
    const { selectedCasinos, bindActionsCasino } = useFetchConfigCasinos()
    // const { handleEdit } = useEditCat({
    // 	bindActions: {
    // 		createItem,
    // 		deleteItem,
    // 		updateItem,
    // 	},
    // })

    const navigate = useNavigate()

    const handleCopyStore = async () => {
        const copyArray: TProvidersJsonObj = {
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
                        content: useConstructorStore.getState().bindStore.providers,
                    },
                },
            }
        })
    }

    const fetchChain = async (id: number) => {
        await bindActionsCasino.handleUpdateCasinos({ provider_id: id })
        await bindActionsSlots.handleUpdateSlots({ provider_id: id })
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
                return e
            }).then((e) => fetchChain(e.id))
        } else if (interceptionProps.editFor === 'UPDATE') {
            await updateItem({ id: interceptionProps.id, _body: formData })
            .then(() => fetchChain(interceptionProps.id))
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
                    console.log('success remove provider')
                })
        } else if (interceptionProps.editFor === 'ADD') {
            setFormData(INIT_DATA)
            ///Переделать на useManipulationProps
            useConstructorStore.setState((state) => ({
                ...state,
                bindStore: {
                    ...state.bindStore,
                    providers: INIT_CONSTRUCTOR_DATA.providers,
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
                    const transformData: TProvidersCreateRes = {
                        ...e,
                        translations: {
                            ...INIT_DATA.translations,
                            ...e.translations,
                        }
                    }
                    setFormData(transformData)
                    return e
                })
                .then((e) => {
                    useConstructorStore.setState((state) => ({
                        ...state,
                        bindStore: {
                            ...state.bindStore,
                            providers: e.translations[lang]?.content || [],
                        },
                    }))
                })
                .then(() => {
                    bindActionsSlots.getSelectedSlots({provider_id: interceptionProps.id})
                    .then((e) => bindActionsSlots.handleSetSelectedSlots(e))
                })
                .then(() => {
                    bindActionsCasino.getSelectedCasinos({provider_id: interceptionProps.id})
                    .then((e) => bindActionsCasino.handleSetSelectedCasinos(e))
                })
        }
        ///Переделать на useManipulationProps
        else {
            useConstructorStore.setState((state) => ({
                ...state,
                bindStore: {
                    ...state.bindStore,
                    providers: formData.translations[lang].content,
                },
            }))
        }
    }, [interceptionProps.id, lang])

    return (
        <VariantNewResourceContext.Provider value={{ variantResource: 'providers' }}>
            <WrapperAddNewResource
                title={labelPage}
                goBack={true}
                pathBack={`/${routes.ADMIN_PAGE}/${routes.PROVIDERS}/`}
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
                        {activeTab.key === 'relations' && 
                            <ProviderResource 
                                {...{ selectedSlots, selectedCasinos }} 
                                handleChangeSlots={bindActionsSlots.handleChangeSelectedSlots}
                                handleChangeCasinos={bindActionsCasino.handleChangeSelectedCasinos}
                            />
                        }
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

export default WrapperAddNewProvider
