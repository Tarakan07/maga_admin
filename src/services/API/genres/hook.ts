import { useMutation, useQuery, useQueryClient } from "react-query"
import { toast } from "react-toastify"
import { createGenre, deleteGenreById, getAllGenres, getGenresById, updateGenreById } from "./genres"
import { TGenresCreateReq, TGenresDeleteReq, TGenresGetReq, TGenresPatchReq } from "./genres.type"

export const useGetAllGenres = () => {
    return useQuery('allGenres', getAllGenres, {
        onSuccess: (data) => {
		},
        onError: (error) => {
            console.log('fetch genres error', error)
        },
    })
}

export const useCreateGenre = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (genre: TGenresCreateReq) => {
			return await createGenre(genre)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allGenres')
				toast.success('Жанр добавлен')
			},
			onError: (error) => {
				toast.error('Ошибка добавления жанра')
				console.log('create genres error', error)
			},
		}
	)
}

export const useUpdateGenreById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TGenresPatchReq) => {
			return await updateGenreById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allGenres')
				toast.success('Жанр обновлен')
			},
			onError: (error) => {
				toast.error('Ошибка обновления жанра')
				console.log('update genres error', error)
			},
		}
	)
}

export const useGetGenreById = () => {
	return useMutation(
		async (params: TGenresGetReq) => {
			const data = await getGenresById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get genre by id error', error)
			},
		}
	)
}

export const useDeleteGenreById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TGenresDeleteReq) => {
			return await deleteGenreById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allGenres')
				toast.success('Жанр удален')
			},
			onError: (error) => {
				toast.error('Ошибка удаления жанра')
				console.log('delete genres error', error)
			},
		}
	)
}