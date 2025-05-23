import { TVariantResource } from '@/store/newResourceStore/type'
import { FilterProvider } from '@/libs/context/FilterContext/FilterContext'
import WrapperNews from '../News'
import WrapperSlots from '../Slots'
import WrapperCasino from '../Casino'
import WrapperArticle from '../Article'
import WrapperHistory from '../History'
import WrapperProviders from '../Providers'
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
		case 'history':
			Component = <WrapperHistory />
			break
		case 'casino':
			Component = <WrapperCasino />
			break
		case 'slots':
			Component = <WrapperSlots />
			break
		case 'providers':
			Component = <WrapperProviders />
			break
	}
	return <FilterProvider>{Component}</FilterProvider>
}

export default WrapperResourse
