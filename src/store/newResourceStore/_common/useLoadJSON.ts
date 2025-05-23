import useNewsStore from '../news'
import useCasinoStore from '../casino'
import useArticleStore from '../article'
import useHistoryStore from '../history'
import { TVariantResource } from '../type'
import { useConstructorStore } from './constructor/constructorStore'
import { useCategoriesStore } from './categories/categoriesStore'
import useSlotsStore from '../slots'

type TProps = {
	variantResource: TVariantResource
}

const useLoadJSON = ({ variantResource }: TProps) => {
	const { bindActionData: bindCasino } = useCasinoStore()
	const { bindActionData: bindArticles } = useArticleStore()
	const { bindActionData: bindNews } = useNewsStore()
	const { bindActionData: bindHistory } = useHistoryStore()
	const { bindActionData: bindSlots } = useSlotsStore()
	const { loadCategoryData } = useCategoriesStore()

	switch (variantResource) {
		case 'casino':
			return { bindResource: bindCasino.loadCasinoData }
		case 'articles':
			return { bindResource: bindArticles.loadArticleData }
		case 'news':
			return { bindResource: bindNews.loadNewsData }
		case 'history':
			return { bindResource: bindHistory.loadHistoryData }
		case 'slots':
			return { bindResource: bindSlots.loadSlotData }
		case 'providers': 
			return { bindResource: () => {} }
		case 'category': 
			return { bindResource: loadCategoryData}
	}
}

export default useLoadJSON
