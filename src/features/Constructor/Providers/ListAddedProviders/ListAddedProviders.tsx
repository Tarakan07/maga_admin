import { routes } from '@/constants/routes'
import { useLang } from '@/libs/context/LocalLangContext/LocalLangContext'
import { TLocationState } from '@/screens/update/type'
import { useDeleteProviderById, useUpdateProviderById } from '@/services/API/providers/hook'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { TVariantResource } from '@/store/newResourceStore/type'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ItemAddedContent } from '../../_common/_comp'
import s from './ListAddedProviders.module.scss'
type TProps = {
	variantContent: TVariantResource
	data: TProvidersBody[]
}
const ListAddedProviders: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem } = useUpdateProviderById()
	const { mutateAsync: deleteItem } = useDeleteProviderById()
	const { lang } = useLang()
	const fetchUpdate = async (params: TProvidersBody) => {
		await updateItem({
			id: params.id,
			_body: {
				...params,
				hidden: !params.hidden,
			}
		})
	}
	return (
		<div className={s.list}>
			{data.map((provider) => {
				return (
					<ItemAddedContent
						key={provider.id}
						id={provider.id}
						title={provider.title}
						isHidden={provider.hidden}
						variantContent={variantContent}
						callbackDelete={() => {
							deleteItem({
								id: provider.id,
							})
						}}
						callbackVisible={() => {
							fetchUpdate(provider)
						}}
						callbackEdit={() => {
							navigate(
								`${routes.UPDATE_PROVIDER}/${provider.id}`,
								{
									state: {
										itemId: provider.id,
									},
								} as TLocationState
							)
						}}
					/>
				)
			})}
		</div>
	)
}
export default ListAddedProviders
