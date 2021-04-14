import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class LengthRule<T> extends ValidationRuleBase<T> {
    constructor(private minLength: number, private maxLength: number, validationConfig?: IValidationConfig) {
        super(ValidationRuleType.LengthRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const value = ((item[property] as {}) as string) || ""

        if (!value && this.validationConfig && this.validationConfig.validateEmptyValue === false) {
            return true
        }

        return !(value.length < this.minLength || value.length > this.maxLength)
    }
}
