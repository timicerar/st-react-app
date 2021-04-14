import styled from "styled-components"
import { Colors } from "../Colors"

const LoaderStyle = styled.svg`
    display: block;
    shape-rendering: auto;
    background: rgba(255, 255, 255, 0);
`

type LoaderProps = {
    size?: number
}

export const Loader = ({ ...props }: LoaderProps) => {
    return (
        <LoaderStyle
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width={props.size ? `${props.size}px` : `64px`}
            height={props.size ? `${props.size}px` : `64px`}
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle cx="50" cy="50" r="0" fill="none" stroke={Colors.BLACK} strokeWidth="2">
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="0s"
                />
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="0s"
                />
            </circle>
            <circle cx="50" cy="50" r="0" fill="none" stroke={Colors.BLUE} strokeWidth="2">
                <animate
                    attributeName="r"
                    repeatCount="indefinite"
                    dur="1s"
                    values="0;40"
                    keyTimes="0;1"
                    keySplines="0 0.2 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                />
                <animate
                    attributeName="opacity"
                    repeatCount="indefinite"
                    dur="1s"
                    values="1;0"
                    keyTimes="0;1"
                    keySplines="0.2 0 0.8 1"
                    calcMode="spline"
                    begin="-0.5s"
                />
            </circle>
        </LoaderStyle>
    )
}
