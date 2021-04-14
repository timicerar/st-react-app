import React from "react"
import styled from "styled-components"

const SVGStyle = styled.svg`
    cursor: pointer;
`

type ShowPasswordProps = {
    show?: boolean
    onClick?: () => void
}

export const ShowPasswordIcon = ({ onClick, show }: ShowPasswordProps) => {
    if (show) {
        return (
            <SVGStyle onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
                <g fill="none" fillRule="evenodd">
                    <path d="M0 24h24V0H0z" />
                    <g stroke="#000" strokeWidth="2">
                        <path d="M15.81 10.947a3.81 3.81 0 1 1-7.62 0 3.81 3.81 0 0 1 7.62 0z" />
                        <path d="M12 17.355c-4.546 0-8.182-2.728-10-5.453 1.818-2.73 5.454-5.456 10-5.456s8.182 2.727 10 5.453c-1.818 2.728-5.454 5.456-10 5.456zM22 2L2 22" />
                    </g>
                </g>
            </SVGStyle>
        )
    }

    return (
        <SVGStyle onClick={onClick} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <g fill="none" fillRule="evenodd">
                <path d="M0 24h24V0H0z" />
                <g stroke="#000" strokeWidth="2">
                    <path d="M15.81 10.947a3.81 3.81 0 1 1-7.62 0 3.81 3.81 0 0 1 7.62 0z" />
                    <path d="M12 17.355c-4.546 0-8.182-2.728-10-5.453 1.818-2.73 5.454-5.456 10-5.456s8.182 2.727 10 5.453c-1.818 2.728-5.454 5.456-10 5.456z" />
                </g>
            </g>
        </SVGStyle>
    )
}
