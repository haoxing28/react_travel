import {ADD_LANGUAGE, CHANGE_LANGUAGE} from '../constant'

interface ChangeLanguage {
    type: typeof CHANGE_LANGUAGE,
    payload: 'en' | 'zh'
}

interface AddLanguage {
    type: typeof ADD_LANGUAGE,
    payload: {code: string, name: string}
}

export type LanguageActionTypes = ChangeLanguage | AddLanguage

export const changeLanguage = (languageCode: 'en' | 'zh') : ChangeLanguage=> ({
    type: CHANGE_LANGUAGE,
    payload: languageCode
})

export const addLanguage = (code: string, name: string) : AddLanguage => ({
    type: ADD_LANGUAGE,
    payload: {code, name}
})