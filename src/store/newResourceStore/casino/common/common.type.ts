type TTypeTagCasinoCommon = string
type TTypeTagCasinoCommonWallets = {
	id: number
	title: string
	icon: string
}
type TCommonData = {
	ratings: {
		reliability: string
		withdrawal: string
		speed: string
		playerRating: string
	}
	selects: {
		blockedCountries: TTypeTagCasinoCommon[]

		languageInterfaces: TTypeTagCasinoCommon[]
	}
	wallets: TTypeTagCasinoCommonWallets[]
	promos: {
		promoTitle: string
		promoDescription: string
	}
	referral: {
		refUrl: string
		refBtnTitle: string
	}
	// providers: TProvidersBody[],
	// slots: TSlotBody[],
}
///
type TSetWalletsParams = {
	field: keyof TCommonData
	value: TTypeTagCasinoCommonWallets
}
type TSetRatingsParams = {
	field: keyof TCommonData['ratings']
	value: string
}

//

type TCommonState = {
	commonData: TCommonData
	setRatings: (params: TSetRatingsParams) => void
	setSelects: (
		field: keyof TCommonData['selects'],
		value: TTypeTagCasinoCommon
	) => void

	setWallets: (params: TSetWalletsParams) => void

	setPromos: (field: keyof TCommonData['promos'], value: string) => void
	setReferral: (field: keyof TCommonData['referral'], value: string) => void

	// setProviders: (params: TSetProvidersParams) => void
	// setSlots: (params: TSetSlotsParams) => void
}

export type {
	TCommonData,
	TCommonState,
	TTypeTagCasinoCommon,
	TTypeTagCasinoCommonWallets,
	TSetRatingsParams,
}
