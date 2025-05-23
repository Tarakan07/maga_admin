import { SERVICES } from '@/constants/api'
import { API } from '../../helpers/conf-axios'
import { TUploadImageReq, TUploadImageRes } from './upload-image.type'

export const uploadFile = async ({
	image,
}: TUploadImageReq): Promise<TUploadImageRes> => {
	try {
		const formData = new FormData()
		formData.append('image', image)

		const response = await API.post(`${SERVICES.image_cdn}`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
		return response.data
	} catch {
		throw new Error('upload error')
	}
}

export const deleteFile = async ({ id }: { id: string }) => {
	try {
		const response = await API.delete(`${SERVICES.image_cdn}/${id}`)
		return response.data
	} catch {
		throw new Error('delete error')
	}
}

export const getFile = async (uuid: string) => {
	try {
		const response = await API.get(`${SERVICES.image_cdn}/${uuid}`, {
			responseType: 'blob',
		})
		return response.data
	} catch {
		throw new Error('get file error')
	}
}
