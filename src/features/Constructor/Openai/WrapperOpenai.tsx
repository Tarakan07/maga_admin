import React, { useEffect, useState } from 'react'
import { Loader } from '@/libs/UI/Jammer'
import { TTopicItem } from '@/services/API/openai/openai.type'
import { useGetTopicsForArticle } from '@/services/API/openai/variantGenerate/articles/hook'
import s from './WrapperOpenai.module.scss'
import ArticlesEdit from './ArticlesEdit/ArticlesEdit'
import WrapperAddNewResource from '../_common/_comp/WrapperAddNewResource'

const WrapperOpenai = () => {
	const [topicsData, setTopicsData] = useState<TTopicItem[]>([])
	const { data, isLoading } = useGetTopicsForArticle({
		page: 1,
		size: 1,
		topic_status: 'NOT_USED',
		all: true,
	})

	useEffect(() => {
		if (data) {
			setTopicsData(data.items)
		}
	}, [data])

	return (
		<WrapperAddNewResource title={'Генерация'} goBack={false} rightComp={null}>
			<div className={s.wrap}>
				<div className={s.main_block}>
					{isLoading ? (
						<Loader params={{ visible: isLoading }} />
					) : (
						<ArticlesEdit {...{ topicsData }} />
					)}
				</div>
			</div>
		</WrapperAddNewResource>
	)
}

export default WrapperOpenai
