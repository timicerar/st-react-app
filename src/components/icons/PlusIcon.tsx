import styled from "styled-components"
import { Colors } from "../Colors"

const SVGStyle = styled.svg<PlusIconProps>`
    transform: ${(props) => props.rotate && `rotate(${props.rotate}deg)`};

    &:hover {
        & > path {
            fill: ${(props) => props.hoverColor};
        }
    }
`

type PlusIconProps = {
    color?: Colors
    rotate?: number
    hoverColor?: Colors
    size?: number
    onClick?: () => void
}

export const PlusIcon = ({ color, hoverColor, rotate, size, onClick }: PlusIconProps) => {
    return (
        <SVGStyle
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="plus"
            className="svg-inline--fa fa-plus fa-w-14"
            hoverColor={hoverColor}
            rotate={rotate}
            onClick={onClick}
            width={size ? `${size}px` : "24px"}
            height={size ? `${size}px` : "24px"}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
        >
            <path
                fill={color ?? Colors.BLACK}
                d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
            />
        </SVGStyle>
    )
}
