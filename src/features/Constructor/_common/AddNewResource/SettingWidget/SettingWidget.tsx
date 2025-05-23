import { FC, useContext, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DeleteSvg from '@/_assets/svg/DeleteSvg'
import Switch from '@/components/Switch/Switch'
import { Button, P } from '@/libs/UI/CustomTags'
import { ModalConfirm } from '@/components/Modal'
import { useModal } from '@/libs/HOC/ModalHOC/ModalHOC'
import { TVariantRequest } from '@/store/newResourceStore/type'
import LangSelector from '@/components/LangSelector/LangSelector'
import { TLangKey, useLanguage } from '@/libs/context/LanguageProvider'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './SettingWidget.module.scss'
import PublishCalendar from '../../_comp/PublishCalendar/PublishCalendar'
import { VariantNewResourceContext } from '../ReceivingData/_context/VariantNewResourceContext'

type TProps = {
	editFor: TVariantRequest
	handleRemove: () => void
	handleSent?: () => void
	handleLocalLoadData?: () => void
	linkResource?: string
	callbackLang?: (value: TLangKey) => void | null
}
const SettingWidget: FC<TProps> = ({
	handleRemove,
	handleSent = () => {},
	editFor,
	handleLocalLoadData,
	linkResource = '',
	callbackLang,
}) => {
	const { settingObj, updateSetting } = useSettingStore()
	const { openModal, closeModal } = useModal()
	const { getLocalization } = useLanguage()
	const { variantResource } = useContext(VariantNewResourceContext)
	const removeText = useMemo(() => {
		if (variantResource === 'articles') return 'статью'
		else if (variantResource === 'casino') return 'казино'
		else if (variantResource === 'history') return 'историю'
		else if (variantResource === 'news') return 'новость'
		else if (variantResource === 'slots') return 'слот'
		else if (variantResource === 'category') return 'категорию'
		else if (variantResource === 'providers') return 'провайдер'
	}, [variantResource, editFor])
	const navigate = useNavigate()
	const location = useLocation()
	const handleLangChange = (newLang: string) => {
		const currentPath = location.pathname
		// Пример: /admin/casino/update-casino/3d4bd7e9-3658-439b-aa46-078aa0def1fe/ru
		const pathParts = currentPath.split('/')
		pathParts[pathParts.length - 1] = newLang
		const newPath = pathParts.join('/')
		navigate(newPath)
	}
	return (
		<>
			<div className={s.setting}>
				<div className={s.setting_main}>
					<P size="m" weight={600}>
						{getLocalization('Настройки')}
					</P>
					<div className={s.wrap}>
						<Button
							type="primary_row"
							onClick={() => {
								if (linkResource && linkResource.includes('/en/'))
									linkResource = linkResource.replace('/en/', 'en')

								if (linkResource && linkResource.includes('/ru/'))
									linkResource = linkResource.replace('/ru/', 'ru/')
								linkResource &&
									window.open(`https://leva-ndar.ru/${linkResource}`, '_blank')
								// if (handleLocalLoadData) {
								// 	console.log('click')
								// 	console.log(handleLocalLoadData())
								// 	handleLocalLoadData()
								// }
							}}
						>
							Посмотреть на сайте
						</Button>
						<Button
							type="primary_row"
							onClick={() => {
								handleSent()
							}}
							disabled={!settingObj[variantResource].isCanSent}
						>
							Опубликовать на сайте
						</Button>
						<div className={s.body}>
							{editFor === 'UPDATE' && variantResource !== 'category' && (
								<div className={s.row}>
									<P size="s">
										{!settingObj[variantResource].isHidden
											? getLocalization('Показать на сайте')
											: getLocalization('Cкрыть на сайте')}
									</P>
									<Switch
										isActive={!settingObj[variantResource].isHidden}
										toggle={() => {
											if (!settingObj[variantResource].isHidden) {
												return openModal({
													component: (
														<ModalConfirm
															type="hide"
															nameResource={''}
															variantContent={variantResource}
															actions={{
																callbackSuccess: () => {
																	updateSetting({
																		_key: 'isHidden',
																		value:
																			!settingObj[variantResource].isHidden,
																		resource: variantResource,
																	})
																},
																callbackCancel: () =>
																	closeModal({ _key: 'visible' }),
															}}
														/>
													),
													settingModal: {
														fullScreen: false,
														isOuterClose: true,
													},
													_key: 'visible',
												})
											}

											updateSetting({
												_key: 'isHidden',
												value: !settingObj[variantResource].isHidden,
												resource: variantResource,
											})
										}}
									/>
								</div>
							)}

							<div className={s.row}>
								<P size="s">{getLocalization('Язык страницы')}</P>
								<div className={s.langSelector}>
									<LangSelector
										activeLang={settingObj[variantResource].currentLang}
										callback={(e) => {
											updateSetting({
												_key: 'currentLang',
												resource: variantResource,
												value: e,
											})
											// handleLangChange(e)
											callbackLang && callbackLang(e)
										}}
										isActiveSelector={
											(editFor === 'ADD' || editFor === 'UPDATE') &&
											(variantResource === 'casino' ||
												variantResource === 'news' ||
												variantResource === 'slots' ||
												variantResource === 'category' ||
												variantResource === 'articles' ||
												variantResource === 'providers')
										}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div
					className={s.setting_footer}
					onClick={() => {
						if (editFor === 'ADD') {
							return handleRemove()
						}

						openModal({
							component: (
								<ModalConfirm
									type="remove"
									nameResource={''}
									variantContent={variantResource}
									actions={{
										callbackSuccess: handleRemove,
										callbackCancel: closeModal,
									}}
								/>
							),
							settingModal: {
								fullScreen: false,
								isOuterClose: true,
							},
						})
					}}
				>
					<DeleteSvg />
					<P size="s" color="red">
						{editFor === 'ADD' &&
							`${getLocalization('Очистить')} ${removeText}`}
						{editFor === 'UPDATE' &&
							`${getLocalization('Удалить')} ${removeText}`}
					</P>
				</div>
			</div>
			{variantResource !== 'casino' &&
				variantResource !== 'slots' &&
				variantResource !== 'category' &&
				variantResource !== 'providers' && (
					<div className={s.setting}>
						<P size="m" weight={600}>
							{getLocalization('Дата и время публикации')}
						</P>
						<PublishCalendar
							value={settingObj[variantResource].publish_at}
							onChange={(e) =>
								updateSetting({
									_key: 'publish_at',
									value: e,
									resource: variantResource,
								})
							}
						/>
					</div>
				)}
		</>
	)
}
export default SettingWidget
