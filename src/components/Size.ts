export type Size = "small" | "mobile" | "tablet" | "desktop" | "largeDesktop" | "fullScreen"

export const getSize = (size: Size): string | undefined => {
    switch (size) {
        case "small":
            return "360px"

        case "mobile":
            return "576px"

        case "tablet":
            return "768px"

        case "desktop":
            return "992px"

        case "largeDesktop":
            return "1200px"

        case "fullScreen":
            return "100%"

        default:
            return undefined
    }
}
