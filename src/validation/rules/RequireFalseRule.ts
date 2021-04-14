import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class RequireFalseRule<T> extends ValidationRuleBase<T> {
    constructor(validationConfig?: IValidationConfig) {
        super(ValidationRuleType.RequireRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const value = (item[property] as {}) as boolean

        return !value
    }
}
