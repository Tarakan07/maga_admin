import { createContext } from 'react'
import { TVariantResource } from '@/store/newResourceStore/type'
type TContext = {
	variantResource: TVariantResource
}
export const VariantNewResourceContext = createContext<TContext>({
	variantResource: 'casino',
})
