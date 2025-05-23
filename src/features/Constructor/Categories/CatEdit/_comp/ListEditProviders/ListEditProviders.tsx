import PlusSvg from '@/_assets/svg/PlusSvg'
import { routes } from '@/constants/routes'
import { P } from '@/libs/UI/CustomTags'
import { FC, useRef } from 'react'
import { Link } from 'react-router-dom'
import { THandleEditParams } from '../../CatVariantResource/CatVariantResource.type'
import ItemEditCat from './ItemEditCat/ItemEditCat'
import s from './ListEditProviders.module.scss'
import { TGenresBody } from '@/services/API/genres/genres.type'

type TProps = {
	genres: TGenresBody[]
	handleEdit: (params: THandleEditParams) => void
}

const ListEditGenres: FC<TProps> = ({ genres, handleEdit }) => {
    const colors = useRef(
            ['#2CDD82', '#CC345D', '#00CFF2', '#FFEC38', '#FF9159'].sort(
                () => Math.random() - 0.5
            )
    ).current
    return (
        <div className={s.container}>
			{!!!genres.length && (
				<Link
					to={routes.ADD_PROVIDER}
					className={s.empty}
				>
					<PlusSvg />
					<P weight={500} color="green">
						Добавить
					</P>
				</Link>
			)}
			{genres.map((genre, index) => (
				<ItemEditCat
					key={genre.id}
					isUpLevel={true}
					color={colors[index] ?? colors[0]}
					{...{ genre, handleEdit }}
				/>
			))}
		</div>
    )
}

export default ListEditGenres