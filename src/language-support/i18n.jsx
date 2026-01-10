import i18next from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import en from "./english.json"
import hin from "./hindi.json"
import ben from "./bengali.json"

i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        fallbackLng: "en",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: {
                translation: en},
            hi: {
                translation: hin},
            ben: {
                translation: ben}
        }
    })

export default i18next