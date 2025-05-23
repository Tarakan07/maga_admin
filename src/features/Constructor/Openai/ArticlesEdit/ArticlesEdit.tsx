import React, { useEffect, useState } from 'react'
import { TextArea } from '@/libs/UI'
import { Button, P } from '@/libs/UI/CustomTags'
import SelectPlsBtnSvg from '@/_assets/svg/SelectPlsBtnSvg'
import { TTopicItem, TTopicStatus } from '@/services/API/openai/openai.type'
import { useUpdateTopicsForArticle } from '@/services/API/openai/variantGenerate/articles/hook'
import { useGenerateArticleWithOpenai } from '@/services/API/openai/variantGenerate/articles/hook'
import s from './ArticlesEdit.module.scss'

type TProps = {
	topicsData: TTopicItem[]
}

const ArticlesEdit = ({ topicsData }: TProps) => {
	const [value, setValue] = useState<string>('')
	const { mutateAsync: generateArticle } = useGenerateArticleWithOpenai()
	const { mutateAsync: updateTopics } = useUpdateTopicsForArticle()

	useEffect(() => {
		const formattedTopics = topicsData
			.map((item) => item.topic)
			.join('\n')
			.trimStart()
		setValue(formattedTopics)
	}, [topicsData])

	const handleGenerateArticle = () => {
		generateArticle()
	}

	const handleChangeTextarea = (e: string) => {
		setValue(e)
	}

	const handleSubmit = () => {
		const valueArray: TTopicItem[] = value
			?.split('\n')
			.map((item) => {
				return {
					topic: item,
					status: 'NOT_USED' as TTopicStatus,
				}
			})
			.filter((item) => item.topic !== '')

		updateTopics({ topics: valueArray })
	}

	return (
		<div className={s.wrapper}>
			<Button
				onClick={handleGenerateArticle}
				type="add"
				icon={<SelectPlsBtnSvg />}
			>
				Сгенерировать статью
			</Button>
			<div className={s.topics}>
				<div className={s.textarea}>
					<TextArea
						value={value}
						onChange={(e) => handleChangeTextarea(e)}
						placeholder="Топики отсутствуют"
					></TextArea>
					<Button onClick={handleSubmit} type="primary">
						Обновить топики
					</Button>
				</div>
				{topicsData.length > 0 ? (
					<>
						<P size="m">Топиков осталось - {topicsData.length}</P>
					</>
				) : (
					<P size="m">Топики отсутствуют</P>
				)}
			</div>
		</div>
	)
}

export default ArticlesEdit
