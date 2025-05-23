import { API } from "@/services/helpers"
import { TGenresBodyEdit, TGenresCreateReq, TGenresCreateRes, TGenresDeleteReq, TGenresGetReq, TGenresPatchReq, TGenresPatchRes, TGenresRes } from "./genres.type"

const BASE_URL = '/v1/slots/genres'

export const getAllGenres = async (): Promise<TGenresRes> => {
	try {
		const response = await API.get<any, { data: TGenresRes }>(`${BASE_URL}?all=true&show=ALL`)
		return response.data
	} catch (error) {
		throw new Error('fetch genres error')
	}
}

export const getGenresById = async ({
	id,
}: TGenresGetReq): Promise<TGenresPatchRes> => {
	try {
		const response = await API.get<TGenresBodyEdit>(
			`${BASE_URL}/${id}`,
		)
		return response.data
	} catch (error) {
		throw new Error('get genre by id error')
	}
}

export const createGenre = async (
	provider: TGenresCreateReq
): Promise<TGenresCreateRes> => {
	try {
		const response = await API.post<
            TGenresCreateReq,
			{ data: TGenresCreateRes }
		>(BASE_URL, provider)
		return response.data
	} catch (error) {
		throw new Error('create genre error')
	}
}

export const updateGenreById = async ({
	id,
	_body: body,
}: TGenresPatchReq): Promise<TGenresPatchRes> => {
	try {
		const response = await API.patch<TGenresPatchRes>(
			`${BASE_URL}/${id}`,
			body
		)
		return response.data
	} catch (error) {
		throw new Error('update genre by id error')
	}
}

export const deleteGenreById = async ({
	id,
}: TGenresDeleteReq): Promise<void> => {
	try {
		await API.delete(`${BASE_URL}/${id}`)
	} catch (error) {
		throw new Error('delete genre by id error')
	}
}
