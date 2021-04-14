import { ValidationRuleType } from "."

export interface IValidationRule {
    ruleType: ValidationRuleType
    validationConfig?: IValidationConfig
    ignore?: boolean
}

export interface IValidationConfig {
    translationKey?: string
    translationData?: {}
    validateEmptyValue?: boolean
}

export abstract class ValidationRuleBase<T> implements IValidationRule {
    public ignore?: boolean

    protected constructor(public readonly ruleType: ValidationRuleType, public readonly validationConfig?: IValidationConfig) {}

    public validate(item: T, property: keyof T): boolean {
        return this.validateItem(item, property)
    }

    protected abstract validateItem(item: T, property: keyof T): boolean
}
