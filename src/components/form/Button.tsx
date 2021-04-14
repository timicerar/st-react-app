import React from "react"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors } from "../Colors"
import { CommonStyle, ICommonStyleProps } from "../CommonStyles"
import { JustifyContentType } from "../CssTypes"

interface IButtonProps extends ICommonStyleProps {
    noUppercase?: boolean
    color?: Colors
    background?: Colors
    borderColor?: Colors
    justifyContent?: JustifyContentType
    icon?: React.ReactNode
    text?: string
    onClick?: () => void
    height?: number
    disable?: boolean
    type: "button" | "submit"
    fontStyle?: "normal" | "medium"
}

const ButtonStyle = styled.button<IButtonProps>`
    ${CommonStyle};
    font-family: ${(props) => (props.fontStyle === "medium" ? "Roboto Medium" : "Roboto")}, sans-serif;
    font-size: 0.875rem;
    text-transform: ${(props) => !props.noUppercase && "uppercase"};
    color: ${(props) => (props.color ? props.color : Colors.WHITE)};
    background: ${(props) => (props.background ? props.background : Colors.BLACK)};
    border: 1px solid ${(props) => (props.borderColor ? props.borderColor : Colors.BLACK)};
    border-radius: 0.2rem;
    outline: 0;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    padding: ${(props) => !props.padding && "0 1rem"};
    height: ${(props) => (props.height ? `${props.height}rem` : `3rem`)};
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.icon ? "space-between" : props.justifyContent && props.justifyContent)};
    &:disabled {
        cursor: default;
        opacity: 0.5;
    }
`

export const Button = observer((props: IButtonProps) => {
    return (
        <ButtonStyle {...props} type={props.type} disabled={props.disable}>
            {props.text}
            {props.icon ?? null}
        </ButtonStyle>
    )
})
