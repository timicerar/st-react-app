import { action, makeAutoObservable } from "mobx"
import { IValidationRule, ValidationRuleBase } from "../ValidationRuleBase"
import { ValidationRules } from "../ValidationRules"
import { MobxValidatorRuleInfo } from "./MobxValidatorRuleInfo"

export interface IMobxValidator<T> {
    validateAll(item: T): Map<keyof T, IValidationRule[]>
    validateProperty(item: T, property: keyof T): IValidationRule[]
}

export class MobxValidator<T> implements IMobxValidator<T> {
    public rules = new Map<keyof T, MobxValidatorRuleInfo>()
    public showError = false

    constructor(rules: ValidationRules<T>) {
        makeAutoObservable(this)
        rules.forEach((ruleList, property) => {
            this.rules.set(property, new MobxValidatorRuleInfo(ruleList))
        })
    }

    @action
    public validateProperty(item: T, property: keyof T): IValidationRule[] {
        const ruleInfo = this.rules.get(property)
        const failedRules: IValidationRule[] = []

        if (ruleInfo) {
            const validRules: IValidationRule[] = []

            ruleInfo.allRules.forEach((rule) => {
                if (rule.ignore || (rule as ValidationRuleBase<T>).validate(item, property)) {
                    validRules.push(rule)
                } else {
                    failedRules.push(rule)
                }
            })

            ruleInfo.update(validRules, failedRules)
        }

        return failedRules
    }

    @action
    public validateAll(item: T): Map<keyof T, IValidationRule[]> {
        const failedRules = new Map<keyof T, IValidationRule[]>()

        this.rules.forEach((rule, property) => {
            const failed = this.validateProperty(item, property)
            if (failed.length) {
                failedRules.set(property, failed)
            }
            rule.setShowError(true)
        })

        return failedRules
    }
}
