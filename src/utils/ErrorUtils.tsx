import { HandledError } from "../error"
import i18n from "../i18n"

export default {
    getErrorMessage(error: Error): string {
        let text
        if (error instanceof HandledError) {
            const errorKey = `error.${error.code}`

            if (i18n.exists(errorKey)) {
                if (error.data) {
                    text = i18n.t(errorKey, error.data)
                } else {
                    text = i18n.t(errorKey)
                }
            }
        }

        if (!text) {
            text = i18n.t("error.default")
        }

        return text
    },
}
