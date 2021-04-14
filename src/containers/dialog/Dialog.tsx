import React, { useEffect } from "react"
import "./Dialog.css"
import { observer } from "mobx-react"
import styled from "styled-components"
import { ScreenSize } from "../../components"
import { Loader } from "../../components/loader"
import DialogStore from "../../stores/dialog/DialogStore"

const DialogContainerWrapper = styled.div`
    background: rgba(0, 0, 0, 0.85);
    position: fixed;
    left: 0;
    overflow: auto;
    top: 0;
    height: 100%;
    width: 100%;
    padding: 20px 10px;
    z-index: 9999;
    display: flex;
    @media (max-width: ${ScreenSize.Small}) {
        padding: 0;
    }
`

const DialogContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    flex: 1;
    & > *:not(:last-child) {
        position: fixed;
        opacity: 0;
        pointer-events: none;
        width: 1px;
        height: 1px;
        overflow: hidden;
        z-index: -1;
    }
`

const FocusButtonStyle = styled.button`
    width: 10px;
    height: 10px;
    outline: 0;
    border: 0;
    padding: 0;
    opacity: 0;
`

const LoaderStyle = styled(Loader)`
    margin: auto;
`

export const Dialog = observer(() => {
    let focusBtn: HTMLButtonElement | null = null
    let modal: HTMLDivElement | null = null

    const focusRestrict = () => {
        document.addEventListener(
            "focus",
            (event) => {
                if (modal && DialogStore.showModalPage && !modal.contains(event.target as Node)) {
                    event.stopPropagation()
                    if (focusBtn) {
                        focusBtn.focus()
                    }
                }
            },
            true,
        )
    }

    useEffect(() => {
        focusRestrict()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setFocusBtn = (btn: HTMLButtonElement | null) => {
        focusBtn = btn
        if (btn && DialogStore.showModalPage) {
            btn.focus()
        }
    }

    if (DialogStore.showModalPage) {
        document.body.style.overflow = "hidden"

        return (
            <DialogContainerWrapper ref={(ref) => (modal = ref)}>
                <DialogContainer>
                    <FocusButtonStyle ref={(btn) => setFocusBtn(btn)} />
                    {DialogStore.dialogs.map((dialog, index) => (
                        <React.Fragment key={index}>{dialog}</React.Fragment>
                    ))}
                    {DialogStore.fullScreenLoaders > 0 && <LoaderStyle size={56} />}
                </DialogContainer>
            </DialogContainerWrapper>
        )
    }

    document.body.style.overflow = ""
    return null
})
