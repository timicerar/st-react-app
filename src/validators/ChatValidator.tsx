import { IChat } from "../interfaces/Chat"
import { ValidationRules } from "../validation"
import { LengthRule, RequireRule } from "../validation/rules"

export const ChatValidator = {
    rules: (): ValidationRules<IChat> => {
        const rules = new ValidationRules<IChat>()

        rules.set("name", [new RequireRule(), new LengthRule(2, 75, { translationData: { min: 2, max: 75 } })])

        return rules
    },
}
