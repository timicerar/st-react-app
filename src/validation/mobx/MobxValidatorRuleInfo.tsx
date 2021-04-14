import { action, makeAutoObservable } from "mobx"
import { IValidationRule } from "../ValidationRuleBase"

export class MobxValidatorRuleInfo {
    public validRules: IValidationRule[] = []
    public failedRules: IValidationRule[] = []
    public isValid = false
    public showError = false

    constructor(public readonly allRules: IValidationRule[]) {
        makeAutoObservable(this)
        this.isValid = allRules.length <= 0
    }

    @action
    public update(validRules: IValidationRule[], failedRules: IValidationRule[]): void {
        this.validRules = validRules
        this.failedRules = failedRules

        this.isValid = validRules.length === this.allRules.length
    }

    @action
    public setShowError(showError: boolean): void {
        this.showError = showError
    }
}
