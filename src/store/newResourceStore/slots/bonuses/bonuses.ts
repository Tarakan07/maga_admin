import { create } from 'zustand'
import { TInputState } from './bonuses.type'

export const useBonusStore = create<TInputState>((set) => ({
	inputBonusValue: '',
	setInputBonusValue: (value: string) => set({ inputBonusValue: value }),
}))
