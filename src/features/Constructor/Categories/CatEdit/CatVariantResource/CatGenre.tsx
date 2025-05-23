import { useCreateGenre, useDeleteGenreById, useGetAllGenres, useUpdateGenreById } from '@/services/API/genres/hook'
import { FC } from 'react'
import { TCatEditProps } from '../../WrapperCat.type'
import { WrapperCatItemEdit } from '../_comp'
import ListEditGenres from '../_comp/ListEditProviders/ListEditProviders'
import { useEditCat } from '../_hooks/use-edit-provider'

const CatGenre: FC<TCatEditProps> = (props) => {
    const { data: genres, isLoading, refetch } = useGetAllGenres()
    const { mutateAsync: createItem, data } = useCreateGenre()
    const { mutateAsync: updateItem } = useUpdateGenreById()
    const { mutateAsync: deleteItem } = useDeleteGenreById()
    const { handleEdit } = useEditCat({
        bindActions: {
            createItem,
            deleteItem,
            updateItem,
        },
    })
    return (
        <WrapperCatItemEdit
			editActivity={props}
			handleEdit={handleEdit}
			count={genres?.items.length || 0}
		>
			<ListEditGenres {...{ handleEdit }} genres={genres?.items || []}/>
		</WrapperCatItemEdit>
    )
}

export default CatGenre