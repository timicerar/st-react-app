import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export interface IDateRuleValidationConfig extends IValidationConfig {
    canBeEqual?: boolean
}

export class DateRule<T> extends ValidationRuleBase<T> {
    constructor(
        private readonly compareProperty: keyof T,
        private operator: (date1: Date, date2: Date) => boolean,
        validationConfig?: IDateRuleValidationConfig,
    ) {
        super(ValidationRuleType.DateRule, validationConfig)
    }

    public validateItem(item: T, property: keyof T): boolean {
        const value: string = ((item[property] as {}) as string) || ""
        const compareValue: string = ((item[this.compareProperty] as {}) as string) || ""

        let isValid: boolean
        const dateValue = new Date(value)
        const dateCompareValue = new Date(compareValue)

        if (isNaN(dateValue.getTime()) || isNaN(dateCompareValue.getTime())) {
            isValid = false
        }

        if (this.validationConfig && (this.validationConfig as IDateRuleValidationConfig).canBeEqual) {
            isValid = this.operator(dateValue, dateCompareValue)
        } else {
            isValid = this.operator(dateValue, dateCompareValue)
        }

        return isValid
    }
}
