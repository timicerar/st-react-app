import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class RequireRule<T> extends ValidationRuleBase<T> {
    constructor(validationConfig?: IValidationConfig) {
        super(ValidationRuleType.RequireRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const value = item[property]

        if (Array.isArray(value)) {
            return value.length > 0
        }

        if (typeof ((value as {}) as number | string) === "number") {
            return !isNaN((value as {}) as number)
        }

        if (!value) {
            return false
        }

        return !!((value as unknown) as string).toString().trim()
    }
}
