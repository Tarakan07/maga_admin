interface ITitleConstructorSection {
	contentType: 'title'
	text: string
}

interface IDefaultTextContent {
	contentType: 'defaultText'
	textArray: string[]
}
interface IDefaultTextWithSubtitleContent {
	contentType: 'defaultTextWithSubtitle'
	textArray: {
		subtitle: string
		textArray: string[]
	}[]
}
interface IQuoteContent {
	contentType: 'quote'
	text: string
}

interface ITableContent {
	contentType: 'table'
	header: {
		base: string
		secondary: string
	}
	data: {
		id: number
		base: string
		secondary: string
	}[]
}

interface ITableContentMultiple {
	contentType: 'tableMultiple'
	contentTable: {
		id: number
		header: string
		data: {
			id: number
			text: string
		}[]
	}[]
}

interface IRowImagesContent {
	contentType: 'rowImages'
	images: {
		id: number
		src: string
		description: string
	}[]
}

interface IBigImageContent {
	contentType: 'bigImage'
	image: {
		description: string
		src: string
	}
}

interface IListWithDotContent {
	contentType: 'listWithDot'
	listText: string[]
}
interface IListWithNumberContent {
	contentType: 'listWithNumber'
	listText: string[]
}
interface IList {
	contentType: 'list'
	listText: string[]
}

interface IRowImageText {
	contentType: 'rowImageText'
	data: {
		image: {
			description: string
			src: string
		}
		textArray: string[]
		reverse: boolean
	}
}

interface IContentHTML {
	contentType: 'contentHTML'
	contentHTML: string
}
interface IFaq {
	contentType: 'faq'
	data: TBlockFaqItem[]
}

//
export type TBlockProsAndConsKeys = 'pros' | 'cons'
export type TBlockProsAndConsKeysText = 'base' | 'secondary'
export type TBlockProsAndConsKeysTextValue = string
export type TBlockProsAndConsItem = {
	id: number
	text: {
		[K in TBlockProsAndConsKeysText]: TBlockProsAndConsKeysTextValue
	}
}

export type TBlockFaqKeys = 'question' | 'answer'
export type TBlockFaqItem = {
	id: number
	text: {
		[K in TBlockFaqKeys]: string
	}	
}

interface IBlockProsAndCons {
	contentType: 'prosAndCons'
	data: {
		[K in TBlockProsAndConsKeys]: TBlockProsAndConsItem[]
	}
}
////
interface IContentTypeMapping {
	//
	defaultText: IDefaultTextContent
	defaultTextWithSubtitle: IDefaultTextWithSubtitleContent
	quote: IQuoteContent
	table: ITableContent
	tableMultiple: ITableContentMultiple
	rowImages: IRowImagesContent
	bigImage: IBigImageContent
	list: IList
	listWithDot: IListWithDotContent
	listWithNumber: IListWithNumberContent
	prosAndCons: IBlockProsAndCons
	rowImageText: IRowImageText
	contentHTML: IContentHTML
	faq: IFaq
}

export type TContentTypeKey = keyof IContentTypeMapping

export type TContentTypeWithId<T extends TContentTypeKey> =
	IContentTypeMapping[T] & {
		id: IConstructorSectionId
	}
// type TContentType<T extends TContentTypeKey> = IContentTypeMapping[T]& {
// 	id: IConstructorSectionId;
// };

// export interface IConstructorContentSection {
// 	title: ITitleConstructorSection;
// 	content: TContentType<TContentTypeKey>[];
// }
///
// export type TContentTypeWithId = TContentType<TContentTypeKey>
export type IConstructorSectionId = number
export interface IConstructorContentSectionWithId {
	id: IConstructorSectionId
	title: string
	content: TContentTypeWithId<TContentTypeKey>[]
}
