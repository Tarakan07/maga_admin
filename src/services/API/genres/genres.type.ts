import { TLangKey } from "@/libs/context/LanguageProvider"
import { IConstructorContentSectionWithId } from '@/store/newResourceStore/_common/constructor/types/IConstructorContent';

type TGenresRes = {
    items: TGenresBody[]
    total: number
    page: number
    size: number
    pages: number
}

type TGenresBody = {
    hidden: boolean
    id: number
    title: string
    link: string
    translations: TGenresTranslations
}
type TGenresTranslations = Record<TLangKey, TGenresJSONData>

type TGenresJSONData = {
    cat_name: string
    title_h1: string
    meta_title: string
    meta_description: string
    content: IConstructorContentSectionWithId[]
}
type TGenresBodyEdit = TGenresBody
type TGenresGetReq = Pick<TGenresBody, 'id'>
//

type TGenresCreateReq = Omit<TGenresBody, 'id'>

type TGenresCreateRes = TGenresBody

//

type TGenresPatchReq = {
    _body: Omit<TGenresBody, 'id'>
} & Pick<TGenresBody, 'id'>

type TGenresPatchRes = TGenresBody

//

type TGenresDeleteReq = Pick<TGenresBody, 'id'>


export type { 
    TGenresRes, 
    TGenresCreateReq, 
    TGenresCreateRes, 
    TGenresGetReq, 
    TGenresPatchReq, 
    TGenresPatchRes, 
    TGenresDeleteReq, 
    TGenresBody, 
    TGenresBodyEdit,
    TGenresJSONData
}