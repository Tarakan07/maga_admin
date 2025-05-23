import Select from '@/features/Constructor/_common/_comp/Select/Select'
import { P } from '@/libs/UI/CustomTags'
import { TGenresBody } from '@/services/API/genres/genres.type'
import { TProvidersBody } from '@/services/API/providers/providers.type'
import { useCommonStore } from '@/store/newResourceStore/slots'
import { FC, useEffect } from 'react'
import s from './ProviderResource.module.scss'
import { useFetchConfigGenres } from '../../_hooks/use-genres'
import { useFetchConfigProviders } from '../../_hooks/use-providers'
import { TCasinoBody } from '@/services/API/casino/casino.type'
import { useFetchConfigCasinos } from '../../_hooks/use-casinos'

const AddedIconArray = ({ title }: { title: string }) => {
	return <P>{title}</P>
}
const FeatureIconArray = ({ title }: { title: string }) => {
	return <P>{title}</P>
}

type TProps = {}

const ProviderResource:FC<TProps> = ({}) => {

	const { allGenres } = useFetchConfigGenres()
	const { allProviders } = useFetchConfigProviders()
	const { allCasinos } = useFetchConfigCasinos()
	const { commonData, setProviders, setGenres, setCasinos } = useCommonStore()

	return (
		<div className={s.selects}>
			<Select
				label="Провайдеры"
				dataAdded={commonData.providers}
				value={allProviders}
				DataComponent={(e) => <AddedIconArray title={e.item.title} />}
				ValueComponent={(e) => <FeatureIconArray title={e.item.title} />}
				placeholder="Провайдеры"
				onGetTextForSearch={(e) => e.title}
				onChange={(e) => setProviders({value: e})}
				isWithSearch={true}
			/>
			<Select
				label="Казино"
				dataAdded={commonData.casinos}
				value={allCasinos}
				DataComponent={(e) => <AddedIconArray title={e.item.name} />}
				ValueComponent={(e) => <FeatureIconArray title={e.item.name} />}
				placeholder="Казино"
				onGetTextForSearch={(e) => e.name}
				onChange={(e) => setCasinos({value: e})}
				isWithSearch={true}
			/>
			<Select
				label="Жанры"
				dataAdded={commonData.genres}
				value={allGenres}
				DataComponent={(e) => <AddedIconArray title={e.item.title} />}
				ValueComponent={(e) => <FeatureIconArray title={e.item.title} />}
				placeholder="Жанры"
				onGetTextForSearch={(e) => e.title}
				onChange={(e) => setGenres({value: e})}
				isWithSearch={true}
			/>
		</div>
	)
}

export default ProviderResource