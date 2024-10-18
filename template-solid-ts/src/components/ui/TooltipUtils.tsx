import {TooltipContent} from "./tooltip.tsx";

const tooltipContent= (content : string) => {
    return (
        <>
            <TooltipContent>{content}</TooltipContent>
        </>
    )
}

export {
    tooltipContent
}