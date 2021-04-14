import { observer } from "mobx-react"
import styled from "styled-components"
import ErrorUtils from "../../utils/ErrorUtils"
import { Colors } from "../Colors"
import { Loader } from "./Loader"

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
`

const ErrorMessageStyle = styled.div`
    width: 100%;
    text-align: center;
    color: ${Colors.RED};
`

type DetailsLoaderProps = {
    isLoading: boolean
    error: Error | null
    item: {} | null
}

export const DetailsLoader = observer(({ ...props }: DetailsLoaderProps) => {
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

    return null
})
