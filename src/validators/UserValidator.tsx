import { IUser } from "../interfaces"
import { ValidationRules } from "../validation"
import { LengthRule, PatternRule, RequireRule } from "../validation/rules"

export const UserValidator = {
    rules: (): ValidationRules<IUser> => {
        const rules = new ValidationRules<IUser>()

        rules.set("name", [new RequireRule(), new LengthRule(2, 75, { translationData: { min: 2, max: 75 } })])

        rules.set("lastName", [new RequireRule(), new LengthRule(2, 75, { translationData: { min: 2, max: 75 } })])

        rules.set("dateOfBirth", [new RequireRule()])

        rules.set("email", [
            new RequireRule(),
            new PatternRule("^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$", {
                translationKey: "validation.email",
            }),
            new LengthRule(2, 75, { translationData: { min: 2, max: 125 } }),
        ])

        rules.set("password", [
            new RequireRule(),
            new PatternRule("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*:;/<>?~_-])(?=.{10,})", {
                translationKey: "validation.password.pattern",
            }),
            new LengthRule(10, 75, { translationData: { min: 10, max: 75 } }),
        ])

        return rules
    },
}
