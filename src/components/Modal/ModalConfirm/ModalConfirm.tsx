import { FC, useMemo } from 'react'
import { Button, P } from '@/libs/UI/CustomTags'
import { CloseWithBgcSvg } from '@/_assets/svg/close'
import s from './ModalConfirm.module.scss'
import { TDefaultData, TProps } from './ModalConfirm.type'
import { generateNameResource } from './_utils/generateNameResource'

const ModalConfirm: FC<TProps> = ({
	nameResource,
	type,
	variantContent,
	actions,
}) => {
	const generateData = useMemo(() => {
		const nameTypeContent = `${generateNameResource({
			lang: 'ru',
			variantResource: variantContent,
		})}`
		const titleResource = variantContent !== 'casino' ? '' : nameResource
		const DEFAULT_DATA: TDefaultData = {
			hide: {
				title: `Скрыть ${nameTypeContent} ${titleResource}`,
				description: `После скрытия ${nameTypeContent} не будет отображаться на сайте и будет иметь статус “Не активен”`,
				success: 'Скрыть',
				cancel: 'Отмена',
			},
			remove: {
				title: `Удалить ${nameTypeContent}`,
				description: 'После удаления отменить действие будет невозможно',
				success: 'Удалить',
				cancel: 'Отмена',
			},
		}
		return DEFAULT_DATA[type]
	}, [nameResource, type, variantContent])
	return (
		<div className={s.container}>
			<div className={s.close} onClick={actions?.callbackCancel}>
				<CloseWithBgcSvg />
			</div>
			<div className={s.main}>
				<div className={s.info}>
					<P size="xl" weight={600}>
						{generateData.title}
					</P>
					<P color="grey">{generateData.description}</P>
				</div>
				<div className={s.actions}>
					<Button
						type="primary"
						onClick={() => {
							actions?.callbackSuccess && actions?.callbackSuccess()
							actions?.callbackCancel && actions?.callbackCancel()
						}}
					>
						{generateData.success}
					</Button>
					<Button type="remove" onClick={actions?.callbackCancel}>
						{generateData.cancel}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default ModalConfirm
