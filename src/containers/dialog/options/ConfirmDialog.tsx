import React from "react"
import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors } from "../../../components"
import { Dialog } from "../../../components/dialog"

interface IConfirmDialogPropsStyleProps {
    background: Colors.WHITE | Colors.BLUE
}

const DialogDescriptionWrapper = styled.div`
    padding: 2rem 1.5rem;
`

const DialogTitleStyle = styled.div`
    width: 100%;
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 1rem;
    color: ${Colors.BLACK};
    margin-bottom: 0.5rem;
`

const DialogMessageStyle = styled.div`
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    color: ${Colors.BLACK};
`

const DialogActionWrapper = styled.div`
    display: flex;
    border-top: 1px solid ${Colors.LIGHT_GRAY};
    & > button:first-child {
        border-bottom-left-radius: 0.25rem;
    }
    & > button:last-child {
        border-bottom-right-radius: 0.25rem;
    }
`

const ActionButton = styled.button<IConfirmDialogPropsStyleProps>`
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 1rem;
    width: 100%;
    max-width: 50%;
    background: ${(props: IConfirmDialogPropsStyleProps) => props.background && props.background};
    color: ${(props: IConfirmDialogPropsStyleProps) => (props.background === Colors.WHITE ? Colors.BLACK : Colors.WHITE)};
    border: none;
    outline: none;
    text-align: left;
    text-transform: uppercase;
    cursor: pointer;
`

interface IConfirmDialogProps {
    onConfirm: React.MouseEventHandler<HTMLButtonElement>
    onCancel: React.MouseEventHandler<HTMLButtonElement>
    text: string
}

export const ConfirmDialog = observer(({ text, onConfirm, onCancel }: IConfirmDialogProps) => {
    const { t } = useTranslation()
    return (
        <Dialog size="mobile">
            <DialogDescriptionWrapper>
                <DialogTitleStyle>{t("common.confirm")}</DialogTitleStyle>
                <DialogMessageStyle>{text}</DialogMessageStyle>
            </DialogDescriptionWrapper>
            <DialogActionWrapper>
                <ActionButton type="button" background={Colors.WHITE} onClick={onCancel}>
                    {t("common.cancel")}
                </ActionButton>
                <ActionButton type="button" background={Colors.BLUE} onClick={onConfirm}>
                    {t("common.yes")}
                </ActionButton>
            </DialogActionWrapper>
        </Dialog>
    )
})
