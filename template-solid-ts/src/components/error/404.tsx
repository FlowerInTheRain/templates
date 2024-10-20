import {Flex} from "../ui/flex.tsx";
import {Image} from "@kobalte/core/image";

export default function ErrorPage() {
    return (
        <Flex class={"error-page"}>
            Perdu ?
            <Image fallbackDelay={600} class="image">
                <Image.Img
                    class="image__img"
                    src="error.gif"
                    alt="Nicole Steeves"
                />
                <Image.Fallback class="image__fallback">NS</Image.Fallback>
            </Image>
        </Flex>
    )
}