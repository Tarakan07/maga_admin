import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import {
	createCategory,
	deleteCategoryById,
	getAllCategories,
	getCategoriesByResourceId,
	getCategoryById,
	setCategoriesByResourceId,
	updateCategoryById,
} from './categories'
import {
	TCategoriesBindingResourceReq,
	TCategoriesCreateReq,
	TCategoriesDeleteReq,
	TCategoriesGetReq,
	TCategoriesGetResourceReq,
	TCategoriesPatchReq,
} from './categories.type'

export const useGetAllCategories = () => {
	return useQuery('allCategories', getAllCategories, {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('fetch categories error', error)
		},
	})
}
export const useCategoriesByResourceId = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TCategoriesGetResourceReq) => {
			return await getCategoriesByResourceId(params)
		},
		{
			onSuccess: () => {
				// queryClient.invalidateQueries('allCategories')
			},
			onError: (error) => {
				console.log('create category error', error)
			},
		}
	)
}
export const useSetCategoriesByResourceId = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TCategoriesBindingResourceReq) => {
			return await setCategoriesByResourceId(params)
		},
		{
			onSuccess: () => {
				// queryClient.invalidateQueries('allCategories')
			},
			onError: (error) => {
				console.log('create category error', error)
			},
		}
	)
}

export const useGetCategoryById = () => {
	return useMutation(
		async (params: TCategoriesGetReq) => {
			const data = await getCategoryById(params)
			return data
		},
		{
			onSuccess: (data) => {},
			onError: (error) => {
				console.log('get category by id error', error)
			},
		}
	)
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (category: TCategoriesCreateReq) => {
			return await createCategory(category)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allCategories')
				toast.success('Категория добавлена')
			},
			onError: (error) => {
				toast.error('Ошибка добавления категории')
				console.log('create category error', error)
			},
		}
	)
}

export const useUpdateCategoryById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TCategoriesPatchReq) => {
			return await updateCategoryById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allCategories')
				toast.success('Категория обновлена')
			},
			onError: (error) => {
				toast.error('Ошибка обновления категории')
				console.log('update category error', error)
			},
		}
	)
}

export const useDeleteCategoryById = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TCategoriesDeleteReq) => {
			return await deleteCategoryById(params)
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries('allCategories')
				toast.success('Категория удалена')
			},
			onError: (error) => {
				toast.error('Ошибка удаления категории')
				console.log('delete category error', error)
			},
		}
	)
}
