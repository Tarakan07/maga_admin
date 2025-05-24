import React, { useContext, useRef } from 'react'
import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import { useCascade } from '@/libs/hooks/use-cascade'
import { ArrowDropDownSvg } from '@/_assets/svg/arrows'
import { TVariantResource } from '@/store/newResourceStore/type'
import { useCategoriesStore } from '@/store/newResourceStore/_common/categories/categoriesStore'
import s from './CategorySetting.module.scss'
import CategoryItem from './CategoryItem/CategoryItem'
import { TGetSizeAddedParams, TToggleCategory } from './CategorySetting.type'
import { VariantNewResourceContext } from '../AddNewResource/ReceivingData/_context/VariantNewResourceContext'

type TProps = {
	selectedProviders: any[] | null
	handleChangeProviders: ({ value }: { value: any }) => void
	selectedSlots: any[] | null
	handleChangeSlots: ({ value }: { value: any }) => void
}

const CategorySetting: React.FC<TProps> = ({
	selectedProviders,
	selectedSlots,
	handleChangeProviders,
	handleChangeSlots,
}) => {
	//Оставить этот компонент в _comp, в casino создать отдельную страницу (внутри папки казино) для категорий, провайдеров и слотов
	const { variantResource } = useContext(VariantNewResourceContext)
	const label = useRef<Record<TVariantResource, string>>({
		articles: 'Статьи',
		casino: 'Казино',
		news: 'Новости',
		category: 'Категории',
	}).current

	const {
		categoriesObj,
		setCategories,
		deleteCategories,
		getConcatArrayCategories,
	} = useCategoriesStore()
	const categoriesCasino = categoriesObj[variantResource]
	const { activeCascade, toggleActiveCascade } = useCascade()
	const colors = useRef(
		['#2CDD82', '#CC345D', '#00CFF2', '#FFEC38', '#FF9159'].sort(
			() => Math.random() - 0.5
		)
	).current
	///

	const toggleCategorySelection = ({ type, category }: TToggleCategory) => {
		if (type === 'add') {
			setCategories({
				resource: variantResource,
				category,
			})
		}
		if (type === 'delete') {
			deleteCategories({
				category,
				resource: variantResource,
			})
		}
	}

	const getSizeAdded = ({ category }: TGetSizeAddedParams): number => {
		if (!Array.isArray(category)) {
			return getConcatArrayCategories({
				value: category.children,
			}).filter((e) =>
				categoriesCasino.bindingCategories.map((e) => e.id).includes(e.id)
			).length
		} else {
			return getConcatArrayCategories({
				value: category,
			}).filter((e) =>
				categoriesCasino.bindingCategories.map((e) => e.id).includes(e.id)
			).length
		}
	}

	const AddedIconArray = ({ title }: { title: string }) => {
		return <P>{title}</P>
	}
	const FeatureIconArray = ({ title }: { title: string }) => {
		return <P>{title}</P>
	}

	return (
		<div className={s.container}>
			<div className={s.wrap}>
				<div className={cn(s.header, { [s.isOpen]: activeCascade.has(-1) })}>
					<div className={s.arrow} onClick={() => toggleActiveCascade(-1)}>
						<ArrowDropDownSvg />
					</div>

					<div className={s.right}>
						<P size="l"> Статьи</P>
						<P size="l">
							{getSizeAdded({
								category: categoriesCasino.allCategories,
							})}
						</P>
					</div>
				</div>
				{activeCascade.has(-1) && (
					<div className={s.child}>
						{categoriesObj[variantResource].allCategories.map(
							(category, index) => {
								return (
									<CategoryItem
										key={category.id}
										category={category}
										toggleCategorySelection={toggleCategorySelection}
										getSizeAdded={getSizeAdded}
										color={colors[index] ?? colors[0]}
										selectedCategoryIds={categoriesObj[
											variantResource
										].bindingCategories.map((e) => e.id)}
									/>
								)
							}
						)}
					</div>
				)}
			</div>
			<div className={s.selects}>
				{/* <Select
					label="Провайдеры"
					dataAdded={selectedProviders}
					value={allProviders}
					DataComponent={(e) => <AddedIconArray title={e.item.title} />}
					ValueComponent={(e) => <FeatureIconArray title={e.item.title} />}
					placeholder="Провайдеры"
					onGetTextForSearch={(e) => e.title}
					onChange={(e) => handleChangeProviders({ value: e })}
					isWithSearch={true}
				/> */}
				{/* <Select
					label="Слоты"
					dataAdded={selectedSlots}
					value={allSlots}
					DataComponent={(e) => <AddedIconArray title={e.item.name} />}
					ValueComponent={(e) => <FeatureIconArray title={e.item.name} />}
					placeholder="Слоты"
					onGetTextForSearch={(e) => e.name}
					onChange={(e) => handleChangeSlots({ value: e })}
					isWithSearch={true}
				/> */}
			</div>
		</div>
	)
}

export default CategorySetting
