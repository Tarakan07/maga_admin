import { toast } from 'react-toastify'
import { FC, useContext } from 'react'
import CopySvg from '@/_assets/svg/CopySvg'
import { Button } from '@/libs/UI/CustomTags'
import { useSettingStore } from '@/store/newResourceStore/_common/setting/settingStore'
import s from './HeaderActions.module.scss'
import { VariantNewResourceContext } from '../../AddNewResource/ReceivingData/_context/VariantNewResourceContext'
type TProps = {
	disabled: boolean
	handleUpdateStore: () => void
	handleCopyStore?: () => void
}
const HeaderActions: FC<TProps> = ({
	disabled,
	handleUpdateStore,
	handleCopyStore,
}) => {
	const { updateSetting } = useSettingStore()
	const { variantResource } = useContext(VariantNewResourceContext)
	return (
		<div className={s.wrap}>
			{handleCopyStore && (
				<Button
					type="copy"
					onClick={() => {
						handleUpdateStore()
						handleCopyStore()
						toast.success('JSON скопирован')
					}}
					icon={<CopySvg />}
				>
					JSON
				</Button>
			)}

			<Button
				type="primary"
				disabled={disabled}
				onClick={() => {
					handleUpdateStore()
					updateSetting({
						_key: 'isCanSent',
						value: true,
						resource: variantResource,
					})
					toast.success('Сохранено')
				}}
			>
				<p>Cохранить</p>
			</Button>
		</div>
	)
}

export default HeaderActions
