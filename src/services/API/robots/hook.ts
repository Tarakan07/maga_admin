import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { TRobotsUpdateReq } from './robots.type'
import { getRobots, createRobots } from './robots'

export const useGetRobots = () => {
	return useQuery(['robots'], () => getRobots(), {
		onSuccess: (data) => {},
		onError: (error) => {
			console.log('get robots', error)
		},
	})
}

export const useCreateRobots = () => {
	const queryClient = useQueryClient()
	return useMutation(
		async (params: TRobotsUpdateReq[]) => {
			return await createRobots(params)
		},
		{
			onSuccess: (data) => {
				toast.success('Robots.txt изменен')
				queryClient.invalidateQueries('robots')
			},
			onError: (error) => {
				toast.error('Ошибка изменения')
				console.log('update Robots.txt', error)
			},
		}
	)
}
