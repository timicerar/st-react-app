import { ValidationRuleBase } from "."

export class ValidationRules<T> extends Map<keyof T, ValidationRuleBase<T>[]> {}
