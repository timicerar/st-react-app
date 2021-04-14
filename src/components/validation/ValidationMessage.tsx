import React from "react"
import { useTranslation } from "react-i18next"
import { TFunction } from "i18next"
import { observer } from "mobx-react"
import styled from "styled-components"
import { IValidationRule } from "../../validation"
import { MobxValidatorRuleInfo } from "../../validation/mobx"
import { Colors } from "../Colors"

const ValidationMessageContainerStyle = styled.div<IValidationMessageProps>`
    min-height: ${(props) =>
        props.validationRuleInfo &&
        props.validationRuleInfo.showError &&
        props.validationRuleInfo.failedRules &&
        props.validationRuleInfo.failedRules.length > 0 &&
        "0.5rem"};
    margin-left: ${(props) => props.marginLeft && `0.25rem`};
`

const ValidationMessageStyle = styled.div`
    color: ${Colors.RED};
    font-size: 0.75rem;
    text-align: left;
`

interface IValidationMessageProps {
    validationRuleInfo?: MobxValidatorRuleInfo
    marginLeft?: boolean
}

const renderValidationMessage = (rule: IValidationRule, t: TFunction): React.ReactNode | null => {
    const translationKey =
        rule.validationConfig && rule.validationConfig.translationKey ? rule.validationConfig.translationKey : `validation.${rule.ruleType}`
    const translationData = rule.validationConfig && rule.validationConfig.translationData

    return <ValidationMessageStyle>{t(translationKey, translationData)}</ValidationMessageStyle>
}

export const ValidationMessage = observer(({ validationRuleInfo, marginLeft }: IValidationMessageProps) => {
    const { t } = useTranslation()
    return (
        <ValidationMessageContainerStyle marginLeft={marginLeft}>
            {validationRuleInfo &&
                validationRuleInfo.showError &&
                validationRuleInfo.failedRules &&
                validationRuleInfo.failedRules.length > 0 &&
                renderValidationMessage(validationRuleInfo.failedRules[0], t)}
        </ValidationMessageContainerStyle>
    )
})
