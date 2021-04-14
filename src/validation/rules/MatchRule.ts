import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export interface IMatchRuleValidationConfig extends IValidationConfig {
    inverse?: boolean
}

export class MatchRule<T> extends ValidationRuleBase<T> {
    constructor(private readonly compareProperty: keyof T, validationConfig?: IMatchRuleValidationConfig) {
        super(ValidationRuleType.MatchRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        let value: T[keyof T] | string = item[property]
        let compareValue: T[keyof T] | string = item[this.compareProperty]

        const valueType = typeof value
        let isValid = false

        if (valueType === typeof compareValue) {
            if (valueType === "string") {
                value = ((value as unknown) as string).trim()
                compareValue = ((compareValue as unknown) as string).trim()
            }
            isValid = value === compareValue
        }

        if (this.validationConfig && (this.validationConfig as IMatchRuleValidationConfig).inverse) {
            return !isValid
        }

        return isValid
    }
}
