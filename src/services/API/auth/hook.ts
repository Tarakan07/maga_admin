import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery } from 'react-query'
import { getMe, loginRequest } from './auth'

export const useGetMe = (isAuthenticated: boolean) => {
	return useQuery({
		queryKey: ['getMe'],
		queryFn: () => getMe(),
		enabled: isAuthenticated,
		retry: false,
	})
}

interface IFormInputs {
	username: string
	password: string
}

type TLoginProps = {
	setLogin: (token: string) => void
}

export const useLogin = ({ setLogin }: TLoginProps) => {
	const navigate = useNavigate()

	return useMutation({
		mutationKey: ['useLogin'],
		mutationFn: async (data: IFormInputs) => {
			const response = await loginRequest(data)
			return response.data
		},
		onSuccess: (data: { access_token: string }) => {
			setLogin(data.access_token)
			navigate('/dashboard')
		},
		onError: (err: any) => {
			toast.error('Ошибка входа')
		},
	})
}
