import { FC } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import EyeSvg from '@/_assets/svg/EyeSvg'
import EditSvg from '@/_assets/svg/EditSvg'
import ImageCdn from '@/libs/UI/ImageCdn/ImageCdn'
import { useLanguage } from '@/libs/context/LanguageProvider'
import { TVariantResource } from '@/store/newResourceStore/type'
import s from './ItemHistory.module.scss'

type TProps = {
	id: number
	title: string
	image: string
	isHidden: boolean
	callbackEdit: () => void
	callbackVisible: () => void
	variantContent: TVariantResource
}

const ItemHistory: FC<TProps> = (props) => {
	const { id, title, image, isHidden, callbackEdit, callbackVisible } = props
	const { getLocalization } = useLanguage()

	return (
		<div className={s.item}>
			<ImageCdn src={image} alt={title} />
			<div className={s.wrapStatus}>
				<div className={cn(s.status, isHidden ? s.inactive : s.active)}>
					<div />
					<P size="s">
						{isHidden
							? getLocalization('Не активный')
							: getLocalization('Активный')}
					</P>
				</div>
			</div>
			<div className={s.title}>
				<P size="l" weight={700}>
					{title}
				</P>
			</div>
			<div className={s.setting}>
				<div onClick={callbackEdit}>
					<EditSvg />
				</div>
				<div onClick={callbackVisible}>
					<EyeSvg isOpen={!isHidden} />
				</div>
			</div>
		</div>
	)
}

export default ItemHistory
