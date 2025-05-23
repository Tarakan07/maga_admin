import { TGenresBody } from '@/services/API/genres/genres.type'
import { useGetAllGenres } from '@/services/API/genres/hook'
import { useGetGenresForSlotById, useUpdateGenresForSlotById } from '@/services/API/slots/hook'
import { TParamsAddGenresToSlotReq } from '@/services/API/slots/slots.type'
import { useCommonStore } from '@/store/newResourceStore/slots'
import { useEffect, useState } from 'react'

export const useFetchConfigGenres = () => {
	const { commonData } = useCommonStore()
	
	const [allGenres, setAllGenres] = useState<TGenresBody[]>([])
	const { data: allGenresData } = useGetAllGenres()
	
	const { mutateAsync: updateGenres } = useUpdateGenresForSlotById()
	const { mutateAsync: getSelectedGenres } = useGetGenresForSlotById()
	
	///
	const handleUpdateGenres = async ({
		slot_id,
	}: Pick<TParamsAddGenresToSlotReq, 'slot_id'>) => {
		const data = await updateGenres({
			slot_id,
			ids: [...commonData.genres.map((genre) => genre.id)],
		})
		return data
	}
	///

	useEffect(() => {
		if (allGenresData && allGenresData?.items?.length > 0) {
			setAllGenres(allGenresData?.items)
		}
	}, [allGenresData])

	return { 
		allGenres, 
		bindActionsGenres: {
			handleUpdateGenres,
			getSelectedGenres,
		}
	}
}
