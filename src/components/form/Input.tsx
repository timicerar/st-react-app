import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import { MobxValidatorRuleInfo } from "../../validation/mobx"
import { Colors } from "../Colors"
import { CommonStyle, getSpacing, ICommonStyleProps, SpacingType } from "../CommonStyles"
import { ValidationMessage } from "../validation"

interface IInputStyleProps extends ICommonStyleProps {
    showError?: boolean
    isIcon?: boolean
    borderColor?: Colors
    fontSize?: SpacingType
    type?: InputType
    colorVariant?: "small" | "big"
    disableFullWidth?: boolean
}

const InputContainer = styled.div`
    margin-bottom: 0.5rem;
`

const InputStyleWrapper = styled.div<IInputStyleProps>`
    ${CommonStyle};
    position: relative;
`

const InputStyle = styled.input<IInputStyleProps>`
    font-family: "Roboto", sans-serif;
    font-size: ${(props) => (props.fontSize ? getSpacing(props.fontSize) : `0.875rem`)};
    padding: ${(props) => (props.isIcon ? `0.75rem 3rem 0.75rem 0.75rem` : props.padding ? getSpacing(props.padding) : `0.75rem`)};
    color: ${Colors.BLACK};
    border: 1px solid ${(props) => (props.showError ? Colors.RED : props.borderColor ? props.borderColor : Colors.BLACK)};
    outline: 0;
    border-radius: 0.2rem;
    box-sizing: border-box;
    text-overflow: ellipsis;
    width: ${(props) => !props.disableFullWidth && `100%`};
    height: ${(props) => props.type === "color" && (props.colorVariant === "big" ? "2.8rem" : "2.5rem")};
    &:focus {
        border: 1px solid ${(props) => (props.showError ? Colors.RED : Colors.DARK_GRAY)};
    }
`

const IconWrapper = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    align-items: center;
    padding-right: 1rem;
`

const LabelStyle = styled.label`
    display: flex;
    margin-bottom: 0.125rem;
`

const LabelTextStyle = styled.div`
    font-weight: bold;
    font-size: 0.75rem;
    text-transform: uppercase;
`

const RequiredStyle = styled.span`
    width: 0.25rem;
    height: 0.25rem;
    border-radius: 50%;
    transition: all 0.15s;
    background-color: ${Colors.RED};
    margin-top: 0.125rem;
`

const BelowMessageWrapperStyle = styled.div`
    margin-top: 0.25rem;
`

type InputType = "text" | "number" | "password" | "date" | "time" | "color"

interface IInputProps extends ICommonStyleProps {
    label?: string
    name: string
    mandatory?: boolean
    type?: InputType
    colorVariant?: "small" | "big"
    placeholder?: string
    disabled?: boolean
    autocomplete?: "off" | "on" | "new-password" | "current-password" | "username"
    validatorRuleInfo?: MobxValidatorRuleInfo
    icon?: React.ReactNode
    noTrim?: boolean
    fontSize?: SpacingType
    value: string | number | null
    borderColor?: Colors
    onChange: (value: string) => void
    onFocus?: () => void
    onBlur?: () => void
    onKeyDown?: (event: React.KeyboardEvent<HTMLElement>) => void
    validationMessageBelow?: boolean
    disableFullWidth?: boolean
}

export const Input = observer(({ ...props }: IInputProps) => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onChange) {
            props.onChange(e.target.value)
        }
    }

    const onBlur = (e: React.FocusEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.validatorRuleInfo) {
            props.validatorRuleInfo.setShowError(true)
        }

        if (props.onChange) {
            if (props.noTrim) {
                props.onChange(e.target.value.trim())
            }
        }

        if (props.onBlur) {
            props.onBlur()
        }
    }

    return (
        <InputContainer>
            <LabelStyle htmlFor={props.name}>
                <LabelTextStyle>{props.label}&nbsp;</LabelTextStyle>
                {props.mandatory && <RequiredStyle />}
                {!props.validationMessageBelow && props.validatorRuleInfo && (
                    <ValidationMessage validationRuleInfo={props.validatorRuleInfo} marginLeft={true} />
                )}
            </LabelStyle>
            <InputStyleWrapper>
                <InputStyle
                    {...props}
                    disableFullWidth={props.disableFullWidth}
                    autoComplete={props.autocomplete || "off"}
                    fontSize={props.fontSize}
                    borderColor={props.borderColor}
                    type={props.type || "text"}
                    name={props.name}
                    value={props.value || ""}
                    onChange={(e) => onChange(e)}
                    onBlur={(e) => onBlur(e)}
                    onFocus={props.onFocus}
                    onKeyDown={props.onKeyDown}
                    placeholder={props.placeholder}
                    disabled={props.disabled}
                    isIcon={!!props.icon}
                    showError={props.validatorRuleInfo && props.validatorRuleInfo.showError && props.validatorRuleInfo.failedRules.length > 0}
                />
                {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
            </InputStyleWrapper>
            {props.validationMessageBelow && props.validatorRuleInfo && (
                <BelowMessageWrapperStyle>
                    <ValidationMessage validationRuleInfo={props.validatorRuleInfo} />
                </BelowMessageWrapperStyle>
            )}
        </InputContainer>
    )
})
