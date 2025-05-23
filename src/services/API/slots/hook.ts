import { toast } from 'react-toastify'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toastGetItemLang } from '@/libs/utils/toastGetAllLang'
import { TParamsAddCasinosToSlotReq, TParamsAddGenresToSlotReq, TParamsAddProvidersToSlotReq, TParamsSingleSlotReq, TParamsSlotsListReq, TParamsSlotUpdateReq, TSlotCreateReq, TSlotDeleteRes } from './slots.type'
import { createSlotById, deleteSlotById, getAllSlots, getCasinosForSlotById, getGenresForSlotById, getProvidersForSlotById, getSlotById, updatCasinosForSlotById, updateGenresForSlotById, updateProvidersForSlotById, updateSlotById } from './slots'


export const useGetAllSlots = (params: TParamsSlotsListReq) => {
    return useQuery(['allSlots', params.lang], () => getAllSlots(params), {
        onSuccess: (data) => {},
        onError: (error) => {
            console.log('get all slots', error)
        },
    })
}

export const useCreateSlot = () => {
    return useMutation(
        async ({ slot }: TSlotCreateReq) => {
            return await createSlotById({ slot })
        },
        {
            onSuccess: (data) => {
                toast.success('Слот добавлен')
            },
            onError: (error) => {
                toast.error('Ошибка добавления')
                console.log('create slot', error)
            },
        }
    )
}

export const useGetSlotById = () => {
    return useMutation(
        async (params: TParamsSingleSlotReq) => {
            const [data] = await Promise.allSettled([getSlotById(params)])
            toastGetItemLang({
                lang: params.lang,
                status: data.status,
            })

            return {
                dataRes: data.status === 'fulfilled' ? data.value : null,
                error: data.status === 'rejected' ? data.reason : null,
            }
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                console.log('get all langs news', error)
            },
        }
    )
}

export const useUpdateSlotById = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async (params: TParamsSlotUpdateReq) => {
            return await updateSlotById(params)
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['allSlots'])
                toast.success('Слот обновлен')
            },
            onError: (error) => {
                toast.error('Ошибка обновления')
                console.log('update slot', error)
            },
        }
    )
}

export const useDeleteSlotById = () => {
    const queryClient = useQueryClient()
    return useMutation(
        async ({ lang, id }: TSlotDeleteRes) => {
            return await deleteSlotById({ lang, id })
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['allSlots'])
                toast.success('Слот удален')
            },
            onError: (error) => {
                toast.error('Ошибка удаления')
                console.log('delete slot', error)
            },
        }
    )
}

///
export const useGetProvidersForSlotById = () => {
    return useMutation(
        async (params: Pick<TParamsAddProvidersToSlotReq, 'slot_id'>) => {
            const data = await getProvidersForSlotById(params)
            return data
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                console.log('get provider for slot error:', error)
            },
        }
    )
}

export const useUpdateProvidersForSlotById = () => {
    return useMutation(
        async (params: TParamsAddProvidersToSlotReq) => {
            return await updateProvidersForSlotById(params)
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                toast.error('Ошибка добавления провайдеров')
                console.log('add providers', error)
            },
        }
    )
}

export const useGetGenresForSlotById = () => {
    return useMutation(
        async (params: Pick<TParamsAddGenresToSlotReq, 'slot_id'>) => {
            const data = await getGenresForSlotById(params)
            return data
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                console.log('get genre for slot error:', error)
            },
        }
    )
}

export const useUpdateGenresForSlotById = () => {
    return useMutation(
        async (params: TParamsAddGenresToSlotReq) => {
            return await updateGenresForSlotById(params)
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                toast.error('Ошибка добавления жанров')
                console.log('add genres', error)
            },
        }
    )
}

export const useGetCasinosForSlotById = () => {
    return useMutation(
        async (params: Pick<TParamsAddCasinosToSlotReq, 'slot_id'>) => {
            const data = await getCasinosForSlotById(params)
            return data
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                console.log('get casinos for slot error:', error)
            },
        }
    )
}

export const useUpdateCasinosForSlotById = () => {
    return useMutation(
        async (params: TParamsAddCasinosToSlotReq) => {
            return await updatCasinosForSlotById(params)
        },
        {
            onSuccess: (data) => {},
            onError: (error) => {
                toast.error('Ошибка добавления казино')
                console.log('add casinos', error)
            },
        }
    )
}