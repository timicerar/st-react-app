import React from "react"
import styled from "styled-components"
import { Colors } from "../Colors"
import { getSpacing } from "../CommonStyles"
import { getSize, Size } from "../Size"

interface IDialogProps {
    children?: React.ReactNode
    background?: Colors
    size?: Size
}

const DialogStyle = styled.div<IDialogProps>`
    background: ${(props) => (props.background ? props.background : Colors.WHITE)};
    display: flex;
    flex-direction: column;
    flex: 1;
    border-radius: 0.25rem;
`

const DialogContainerStyle = styled.div<IDialogProps>`
    margin: auto;
    padding: ${(props) => props.size !== "fullScreen" && getSpacing("16")};
    max-width: ${(props) => getSize(props.size || "mobile")};
    width: 100%;
    max-height: 100%;
    display: flex;
`

export const Dialog = (props: IDialogProps) => {
    return (
        <DialogContainerStyle {...props}>
            <DialogStyle {...props} />
        </DialogContainerStyle>
    )
}
