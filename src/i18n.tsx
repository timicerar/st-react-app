import { initReactI18next } from "react-i18next"
import i18n from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import XHR from "i18next-xhr-backend"

i18n.use(XHR)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            loadPath: "/locales/{{lng}}.json",
        },
        debug: true,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
        react: {
            bindI18n: "languageChanged loaded",
            bindI18nStore: "added removed",
            nsMode: "default",
            wait: true,
        },
    })
    .catch((e) => console.log(e))

export default i18n
