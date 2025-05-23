type TParamsSetData = {
	field: keyof THistoryData
	value: string
}
type TParamsSetBonuses = {
	field: keyof TBonus
	value: TPromoCode | TReferral
}
//
type TPromoCode = {
	code: string
}
type TReferral = {
	url: string
}
type TBonus = {
	promo_code: TPromoCode
	referral: TReferral
}
type THistoryData = {
	name: string
	text: string
	image: string
	bonuses: TBonus
	link: string
	color: string
	preview_image: string
}

type TSeoState = {
	seoData: THistoryData
	setSeoData: (params: TParamsSetData) => void
	setSeoBonuses: (params: TParamsSetBonuses) => void
}

export type { THistoryData, TSeoState }
