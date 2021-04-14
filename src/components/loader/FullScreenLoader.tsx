import styled from "styled-components"
import { Loader } from "./Loader"

const LoaderWrapperStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;
    width: 100%;
`

export const FullScreenLoader = () => {
    return (
        <LoaderWrapperStyle>
            <Loader size={96} />
        </LoaderWrapperStyle>
    )
}
