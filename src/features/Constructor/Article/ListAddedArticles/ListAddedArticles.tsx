import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '@/constants/routes'
import { TLocationState } from '@/screens/update/type'
import { TVariantResource } from '@/store/newResourceStore/type'
import {
	TArticlesItemRes,
	TUpdateArticle,
} from '@/services/API/articles/articles.type'
import {
	useDeleteArticleById,
	useUpdateArticleById,
} from '@/services/API/articles/hook'
import s from './ListAddedArticles.module.scss'
import { ItemAddedContent } from '../../_common/_comp'

type TProps = {
	variantContent: TVariantResource
	data: TArticlesItemRes[]
}

const ListAddedArticles: FC<TProps> = ({ variantContent, data }) => {
	const navigate = useNavigate()
	const { mutateAsync: updateItem } = useUpdateArticleById()
	const { mutateAsync: deleteItem } = useDeleteArticleById()

	const fetchUpdate = async (params: TUpdateArticle) => {
		await updateItem({
			id: params.id,
			body: {
				article: { ...params, hidden: !params.hidden },
			},
		})
	}

	return (
		<div className={s.list}>
			{data.map((article) => {
				return (
					<ItemAddedContent
						key={article.id}
						id={article.id}
						isHidden={article.hidden}
						title={article.title}
						variantContent={variantContent}
						date={article.publish_at}
						callbackDelete={() => {
							deleteItem({
								id: article.id,
								lang: article.language,
							})
						}}
						callbackVisible={() => {
							fetchUpdate(article)
						}}
						callbackEdit={() => {
							navigate(
								`${routes.UPDATE_ARTICLE}/${article.bind_id}/${article.language}`,
								{
									state: {
										itemId: article.id,
										bind_id: article.bind_id,
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
export default ListAddedArticles
