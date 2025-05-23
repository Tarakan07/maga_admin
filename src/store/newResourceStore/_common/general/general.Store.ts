import { create } from 'zustand'
// import { TInputState } from "./info.type"

export const useGeneralStore = create((set) => ({
	inputInfoValue: '',
	setInputInfoValue: (value: string) => set({ inputInfoValue: value }),
}))
