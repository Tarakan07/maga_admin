import useNewsStore from '../news'
import useCasinoStore from '../casino'
import useArticleStore from '../article'
import { TVariantResource } from '../type'
import { useCategoriesStore } from './categories/categoriesStore'

type TProps = {
	variantResource: TVariantResource
}

const useLoadJSON = ({ variantResource }: TProps) => {
	const { bindActionData: bindCasino } = useCasinoStore()
	const { bindActionData: bindArticles } = useArticleStore()
	const { bindActionData: bindNews } = useNewsStore()
	const { loadCategoryData } = useCategoriesStore()

	switch (variantResource) {
		case 'casino':
			return { bindResource: bindCasino.loadCasinoData }
		case 'articles':
			return { bindResource: bindArticles.loadArticleData }
		case 'news':
			return { bindResource: bindNews.loadNewsData }

		case 'category':
			return { bindResource: loadCategoryData }
	}
}

export default useLoadJSON
