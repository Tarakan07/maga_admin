import { TVariantResource } from '@/store/newResourceStore/type'
import { FilterProvider } from '@/libs/context/FilterContext/FilterContext'
import WrapperNews from '../News'
import WrapperCasino from '../Casino'
import WrapperArticle from '../Article'
type TProps = {
	variantContent: TVariantResource
}
const WrapperResourse = ({ variantContent }: TProps) => {
	let Component

	switch (variantContent) {
		case 'news':
			Component = <WrapperNews />
			break
		case 'articles':
			Component = <WrapperArticle />
			break

		case 'casino':
			Component = <WrapperCasino />
			break
	}
	return <FilterProvider>{Component}</FilterProvider>
}

export default WrapperResourse
