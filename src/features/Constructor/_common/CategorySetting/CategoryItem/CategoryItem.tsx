import cn from 'classnames'
import { P } from '@/libs/UI/CustomTags'
import CheckBox from '@/components/CheckBox'
import { useCascade } from '@/libs/hooks/use-cascade'
import { ArrowDropDownSvg } from '@/_assets/svg/arrows'
import { TCategoriesRes } from '@/services/API/categories/categories.type'
import s from './CategoryItem.module.scss'
import { TGetSizeAddedParams, TToggleCategory } from '../CategorySetting.type'

type TProps = {
	selectedCategoryIds: number[]
	category: TCategoriesRes
	color?: string
	getSizeAdded: (params: TGetSizeAddedParams) => number
	toggleCategorySelection: (params: TToggleCategory) => void
}
const CategoryItem = ({
	category,
	toggleCategorySelection,
	selectedCategoryIds,
	getSizeAdded,
	color,
}: TProps) => {
	const { activeCascade, toggleActiveCascade } = useCascade()

	return (
		<div
			className={cn(s.wrap, {
				[s.isOpen]: activeCascade.has(category.id),
			})}
		>
			<div className={s.main}>
				<div
					className={s.arrow}
					onClick={() => toggleActiveCascade(category.id)}
				>
					{!!category.children.length && <ArrowDropDownSvg />}
				</div>

				<div
					className={s.right}
					onClick={() => {
						selectedCategoryIds.findIndex((e) => e === category.id) > -1
							? toggleCategorySelection({
									category,
									type: 'delete',
								})
							: toggleCategorySelection({
									category,
									type: 'add',
								})
					}}
				>
					<CheckBox
						isActive={
							selectedCategoryIds.findIndex((e) => e === category.id) > -1
						}
					/>
					<div className={s.infoTitle}>
						<P className={s.title} customColor={color}>
							{category.title}
						</P>

						<P customColor={color}>
							{getSizeAdded({ category }) > 0 && getSizeAdded({ category })}
						</P>
					</div>
				</div>
			</div>

			{activeCascade.has(category.id) && !!category.children.length && (
				<div className={s.child}>
					{category.children.map((child) => {
						return (
							<CategoryItem
								key={child.id}
								category={child}
								color={color}
								toggleCategorySelection={toggleCategorySelection}
								selectedCategoryIds={selectedCategoryIds}
								getSizeAdded={getSizeAdded}
							/>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default CategoryItem
