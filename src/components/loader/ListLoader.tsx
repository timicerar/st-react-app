import { useTranslation } from "react-i18next"
import { observer } from "mobx-react"
import styled from "styled-components"
import ErrorUtils from "../../utils/ErrorUtils"
import { Colors } from "../Colors"
import { Loader } from "./Loader"

const ErrorMessageStyle = styled.div`
    width: 100%;
    font-size: 1rem;
    text-align: center;
    color: ${Colors.RED};
`

const EmptyMessageStyle = styled.div`
    width: 100%;
    font-size: 1rem;
    text-align: center;
    color: ${Colors.BLACK};
`

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

type ListLoaderProps = {
    isLoading: boolean
    error: Error | null
    items: [] | null
    emptyMessage?: string
}

export const ListLoader = observer(({ ...props }: ListLoaderProps) => {
    const { t } = useTranslation()

    if (props.isLoading) {
        return (
            <LoaderWrapper>
                <Loader size={32} />
            </LoaderWrapper>
        )
    }

    if (props.error) {
        return <ErrorMessageStyle>{ErrorUtils.getErrorMessage(props.error)}</ErrorMessageStyle>
    }

    if (!props.items || (props.items && props.items.length === 0)) {
        return <EmptyMessageStyle>{props.emptyMessage || t("list.empty")}</EmptyMessageStyle>
    }

    return null
})
