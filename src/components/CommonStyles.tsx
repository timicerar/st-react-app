import { css } from "styled-components"
import { Colors } from "./Colors"

export type SpacingType = "2" | "4" | "6" | "8" | "10" | "12" | "14" | "16" | "18" | "24" | "32" | "40" | "48" | "56" | "64" | "auto" | "none"

export interface ICommonStyleProps {
    margin?: SpacingType
    marginTop?: SpacingType
    marginBottom?: SpacingType
    marginLeft?: SpacingType
    marginRight?: SpacingType

    verticalMargin?: SpacingType
    horizontalMargin?: SpacingType

    padding?: SpacingType
    paddingTop?: SpacingType
    paddingBottom?: SpacingType
    paddingLeft?: SpacingType
    paddingRight?: SpacingType

    verticalPadding?: SpacingType
    horizontalPadding?: SpacingType

    backgroundColor?: Colors

    fullHeight?: boolean
    fullWidth?: boolean
}

export const getSpacing = (spacing?: SpacingType): string | number | undefined => {
    switch (spacing) {
        case "2":
            return "0.125rem"

        case "4":
            return "0.25rem"

        case "6":
            return "0.375rem"

        case "8":
            return "0.5rem"

        case "10":
            return "0.625rem"

        case "12":
            return "0.75rem"

        case "14":
            return "0.875rem"

        case "16":
            return "1rem"

        case "18":
            return "1.125rem"

        case "24":
            return "1.5rem"

        case "32":
            return "2rem"

        case "40":
            return "2.5rem"

        case "48":
            return "3rem"

        case "56":
            return "3.5rem"

        case "64":
            return "4rem"

        case "auto":
            return "auto"

        case "none":
            return 0

        default:
            return undefined
    }
}

const getPadding = ({ padding, horizontalPadding, verticalPadding }: ICommonStyleProps): string => {
    if (padding) {
        return `padding: ${getSpacing(padding)};`
    }

    const style: string[] = []

    if (verticalPadding) {
        const paddingTopBottom = getSpacing(verticalPadding)
        style.push(...[`padding-top: ${paddingTopBottom};`, `padding-bottom: ${paddingTopBottom};`])
    }

    if (horizontalPadding) {
        const paddingLeftRight = getSpacing(horizontalPadding)
        style.push(...[`padding-left: ${paddingLeftRight};`, `padding-right: ${paddingLeftRight};`])
    }

    return style.join("")
}

const getMargin = ({ margin, horizontalMargin, verticalMargin }: ICommonStyleProps): string => {
    if (margin) {
        return `margin: ${getSpacing(margin)};`
    }

    const style: string[] = []

    if (verticalMargin) {
        const marginTopBottom = getSpacing(verticalMargin)
        style.push(...[`margin-top: ${marginTopBottom};`, `margin-bottom: ${marginTopBottom};`])
    }

    if (horizontalMargin) {
        const marginLeftRight = getSpacing(horizontalMargin)
        style.push(...[`margin-left: ${marginLeftRight};`, `margin-right: ${marginLeftRight};`])
    }

    return style.join("")
}

export const CommonStyle = css<ICommonStyleProps>`
    ${(props) => getMargin(props)};
    margin-top: ${(props) => getSpacing(props.marginTop)};
    margin-bottom: ${(props) => getSpacing(props.marginBottom)};
    margin-left: ${(props) => getSpacing(props.marginLeft)};
    margin-right: ${(props) => getSpacing(props.marginRight)};
    ${(props) => getPadding(props)};
    padding-top: ${(props) => getSpacing(props.paddingTop)};
    padding-bottom: ${(props) => getSpacing(props.paddingBottom)};
    padding-left: ${(props) => getSpacing(props.paddingLeft)};
    padding-right: ${(props) => getSpacing(props.paddingRight)};
    ${(props) => props.backgroundColor && `background-color: ${props.backgroundColor};`}
    ${(props) => props.fullWidth && "width: 100%;"}
	${(props) => props.fullHeight && "height: 100%;"}
`
