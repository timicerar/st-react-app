import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class ArrayIncludesRule<T> extends ValidationRuleBase<T> {
    constructor(private value: string, validationConfig?: IValidationConfig) {
        super(ValidationRuleType.RequireRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const array = item[property]

        if (!array) {
            return false
        }

        if (!Array.isArray(array)) {
            return false
        }

        return array.includes(this.value)
    }
}
