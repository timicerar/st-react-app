import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class PatternRule<T> extends ValidationRuleBase<T> {
    private readonly rx: RegExp

    constructor(pattern: string, validationConfig?: IValidationConfig) {
        super(ValidationRuleType.PatternRule, validationConfig)
        this.rx = new RegExp(pattern)
    }

    public validateItem(item: T, property: keyof T): boolean {
        let value: T[keyof T] | string | undefined | null = item[property]

        const valueType = typeof value
        if ((value as unknown) === null || valueType === "undefined") {
            value = ""
        } else if (valueType !== "string") {
            return false
        }

        value = ((value as unknown) as string).trim()

        if (value || (this.validationConfig && this.validationConfig.validateEmptyValue)) {
            return this.rx.test(value)
        }

        return true
    }
}
