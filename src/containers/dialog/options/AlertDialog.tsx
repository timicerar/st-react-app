import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import styled from "styled-components"
import { Colors } from "../../../components"
import { Dialog } from "../../../components/dialog"

interface IAlertPropsStyleProps {
    background?: Colors.WHITE | Colors.BLUE
}

const DialogDescriptionWrapper = styled.div`
    padding: 2rem 1.5rem;
`

const DialogTextStyle = styled.div`
    width: 100%;
    font-family: "Roboto", sans-serif;
    font-size: 0.875rem;
    color: ${Colors.BLACK};
`

const DialogActionWrapper = styled.div`
    display: flex;
    border-top: 1px solid ${Colors.LIGHT_GRAY};
`

const ActionButton = styled.button`
    font-family: Roboto, sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    padding: 1rem;
    width: 100%;
    background: ${(props: IAlertPropsStyleProps) => props.background && props.background};
    color: ${(props: IAlertPropsStyleProps) => (props.background === Colors.WHITE ? Colors.BLACK : Colors.WHITE)};
    border: none;
    outline: none;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    margin: 0 !important;
    border-bottom-left-radius: 0.25rem;
    border-bottom-right-radius: 0.25rem;
`

interface IAlertProps {
    text: string
    onClose: React.MouseEventHandler<HTMLButtonElement>
}

export const AlertDialog = observer(({ text, onClose }: IAlertProps) => {
    const { t } = useTranslation()
    return (
        <Dialog size="mobile">
            <DialogDescriptionWrapper>
                <DialogTextStyle>{text}</DialogTextStyle>
            </DialogDescriptionWrapper>
            <DialogActionWrapper>
                <ActionButton type="button" background={Colors.BLUE} onClick={onClose}>
                    {t("common.ok")}
                </ActionButton>
            </DialogActionWrapper>
        </Dialog>
    )
})
