import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class MinMaxRule<T> extends ValidationRuleBase<T> {
    constructor(private minValue: number, private maxValue: number, validationConfig?: IValidationConfig) {
        super(ValidationRuleType.MinMaxRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const value = (item[property] as {}) as string

        if ((value === undefined || value === null) && this.validationConfig && this.validationConfig.validateEmptyValue === false) {
            return true
        }

        const val = parseFloat(value)

        if (isNaN(val)) {
            return false
        }

        return !(val < this.minValue || val > this.maxValue)
    }
}
