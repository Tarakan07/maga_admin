import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { TLocationState } from '@/screens/update/type'
import { TVariantResource } from '@/store/newResourceStore/type'
import { TNewsItemRes, TUpdateNews } from '@/services/API/news/news.type'
import { useDeleteNewsById, useUpdateNewsById } from '@/services/API/news/hook'
import s from './ListAddedNews.module.scss'
import { ItemAddedContent } from '../../_common/_comp'

type TProps = {
	variantContent: TVariantResource
	data: TNewsItemRes[]
}
const ListAddedNews: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem } = useUpdateNewsById()
	const { mutateAsync: deleteItem } = useDeleteNewsById()
	//
	const fetchUpdate = async (params: TUpdateNews) => {
		await updateItem({
			id: params.id,
			body: {
				news: { ...params, hidden: !params.hidden },
			},
		})
	}

	return (
		<div className={s.list}>
			{data.map((news) => {
				return (
					<ItemAddedContent
						key={news.id}
						id={news.id}
						isHidden={news.hidden}
						title={news.title}
						variantContent={variantContent}
						date={news.publish_at}
						callbackDelete={() => {
							deleteItem({
								id: news.id,
								lang: news.language,
							})
						}}
						callbackVisible={() => {
							fetchUpdate(news)
						}}
						callbackEdit={() => {
							navigate(
								`${routes.UPDATE_NEWS}/${news.bind_id}/${news.language}`,
								{
									state: {
										itemId: news.id,
										bind_id: news.bind_id,
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
export default ListAddedNews
