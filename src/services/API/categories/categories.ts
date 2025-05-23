import { API } from '@/services/helpers/conf-axios'
import {
	TCategoriesBindingResourceReq,
	TCategoriesBodyEdit,
	TCategoriesCreateReq,
	TCategoriesCreateRes,
	TCategoriesDeleteReq,
	TCategoriesGetReq,
	TCategoriesGetResourceReq,
	TCategoriesPatchReq,
	TCategoriesPatchRes,
	TCategoriesRes,
} from './categories.type'

const BASE_URL = '/v1/casinos/categories'

export const getAllCategories = async (): Promise<TCategoriesRes[]> => {
	try {
		const response = await API.get<any, { data: TCategoriesRes[] }>(BASE_URL)
		return response.data
	} catch (error) {
		throw new Error('fetch categories error')
	}
}

export const getCategoriesByResourceId = async (
	params: TCategoriesGetResourceReq
): Promise<TCategoriesRes[]> => {
	try {
		const response = await API.get<any, { data: TCategoriesRes[] }>(
			`/v1/casinos/${params.id}/categories`
		)
		return response.data
	} catch (error) {
		throw new Error('fetch categories by resource error')
	}
}

export const setCategoriesByResourceId = async (
	params: TCategoriesBindingResourceReq
): Promise<TCategoriesRes[]> => {
	try {
		const response = await API.patch<any, { data: TCategoriesRes[] }>(
			`/v1/casinos/${params._query.id}/categories`,
			params._body
		)
		return response.data
	} catch (error) {
		throw new Error('fetch categories by resource error')
	}
}

export const createCategory = async (
	category: TCategoriesCreateReq
): Promise<TCategoriesCreateRes> => {
	try {
		const response = await API.post<
			TCategoriesCreateReq,
			{ data: TCategoriesCreateRes }
		>(BASE_URL, category)
		return response.data
	} catch (error) {
		throw new Error('create category error')
	}
}

export const getCategoryById = async ({
	id,
}: TCategoriesGetReq): Promise<TCategoriesPatchRes> => {
	try {
		const response = await API.get<TCategoriesBodyEdit>(`${BASE_URL}/${id}`)
		return response.data
	} catch (error) {
		throw new Error('get category by id error')
	}
}

export const updateCategoryById = async ({
	id,
	_body: body,
}: TCategoriesPatchReq): Promise<TCategoriesPatchRes> => {
	try {
		const response = await API.patch<TCategoriesPatchRes>(
			`${BASE_URL}/${id}`,
			body
		)
		return response.data
	} catch (error) {
		throw new Error('update category by id error')
	}
}

export const deleteCategoryById = async ({
	id,
}: TCategoriesDeleteReq): Promise<void> => {
	try {
		await API.delete(`${BASE_URL}/${id}`)
	} catch (error) {
		throw new Error('delete category by id error')
	}
}
