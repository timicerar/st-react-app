import { IValidationConfig, ValidationRuleBase, ValidationRuleType } from ".."

export class SumRule<T> extends ValidationRuleBase<T> {
    constructor(private sum: number, private fields: (keyof T)[], validationConfig?: IValidationConfig) {
        super(ValidationRuleType.SumRule, validationConfig)
    }

    public validateItem(item: T): boolean {
        const values: number[] = []

        this.fields.forEach((field) => {
            const stringVal = (item[field] as {}) as string
            const numVal = parseFloat(stringVal) * 100

            if (!isNaN(numVal)) {
                values.push(numVal)
            }
        })

        let sum = values.reduce((a, b) => a + b, 0)

        sum = sum / 100

        return !(sum < this.sum || sum > this.sum)
    }
}
