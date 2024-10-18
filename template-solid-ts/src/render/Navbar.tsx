import {Switch, SwitchControl, SwitchLabel, SwitchThumb} from "../components/ui/switch.tsx";
import {Flex} from "../components/ui/flex.tsx";
import {Tooltip, TooltipTrigger} from "../components/ui/tooltip.tsx";
import {tooltipContent} from "../components/ui/TooltipUtils.tsx";
import {NavigationMenu} from "@kobalte/core/navigation-menu";
import {useColorMode} from "@kobalte/core";
import {showErrorToaster, showSuccessToaster} from "../components/ui/toast-utils.ts";
import data from "../constants/static-text-values.ts";

export default function BasicAppBar({themeName, setThemeName}) {
    const {setColorMode} = useColorMode()
    const updateTheme = () => {
        if (themeName() === data.themeNameLight) {
            setThemeName(data.themeNameDark)
            showErrorToaster(data.toasterUpdateThemeTitle, data.toasterUpdateThemeContent);
            setColorMode(data.themeNameDark)
            localStorage.setItem("theme", data.themeNameDark)
        } else {
            showSuccessToaster(data.toasterUpdateThemeTitle, data.toasterUpdateThemeContent);
            setThemeName(data.themeNameLight)
            setColorMode(data.themeNameLight)
            localStorage.setItem("theme", data.themeNameLight)
        }
    }

    return (
        <NavigationMenu orientation={data.horizontal} class="navigation-menu__root">
            <NavigationMenu.Menu>
                <NavigationMenu.Trigger class="navigation-menu__trigger">
                    {data.menuItemOne}{" "}
                </NavigationMenu.Trigger>
                <NavigationMenu.Portal>
                    <NavigationMenu.Content class="navigation-menu__content content-1">
                        <NavigationMenu.Item

                            class="navigation-menu__item-callout"
                            href="https://kobalte.dev"
                        >
                            <img
                                src="https://kobalte.dev/android-chrome-192x192.png"
                                role="presentation"
                                alt="Kobalte"
                            />
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                {data.menuItemOneLabel[0]}
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                {data.menuItemOneDescription[0]}
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://pigment.kobalte.dev"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                {data.menuItemOneLabel[1]}
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                {data.menuItemOneDescription[1]}
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://www.solidjs.com/"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                SolidJS
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Simple and performant reactivity for building user interfaces.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://start.solidjs.com/"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                SolidStart
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Fine-grained reactivity goes fullstack.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                    </NavigationMenu.Content>
                </NavigationMenu.Portal>
            </NavigationMenu.Menu>
            <NavigationMenu.Menu>
                <NavigationMenu.Trigger class="navigation-menu__trigger">
                    See{" "}
                </NavigationMenu.Trigger>
                <NavigationMenu.Portal>
                    <NavigationMenu.Content class="navigation-menu__content content-1">
                        <NavigationMenu.Item

                            class="navigation-menu__item-callout"
                            href="https://kobalte.dev"
                        >
                            <img
                                src="https://kobalte.dev/android-chrome-192x192.png"
                                role="presentation"
                                alt="Kobalte"
                            />
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                Kobalte
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Unstyled, accessible components for SolidJS.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://pigment.kobalte.dev"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                Pigment
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Ready-to-use components with a consistent look and feel.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://www.solidjs.com/"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                SolidJS
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Simple and performant reactivity for building user interfaces.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                        <NavigationMenu.Item
                            class="navigation-menu__item"
                            href="https://start.solidjs.com/"
                        >
                            <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                SolidStart
                            </NavigationMenu.ItemLabel>
                            <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                Fine-grained reactivity goes fullstack.
                            </NavigationMenu.ItemDescription>
                        </NavigationMenu.Item>
                    </NavigationMenu.Content>
                </NavigationMenu.Portal>
            </NavigationMenu.Menu>
            <NavigationMenu.Menu>
                <NavigationMenu.Trigger>
                    <Tooltip>
                        <TooltipTrigger>
                            <Switch class={"theme-switch"} onClick={() => updateTheme()}
                                    defaultChecked={themeName() === 'light'}>
                                <Flex>
                                    <SwitchControl class={"theme-switch-control"}>
                                        <SwitchThumb/>
                                    </SwitchControl>
                                    <SwitchLabel class={"theme-switch-label"}></SwitchLabel>
                                </Flex>
                            </Switch>
                        </TooltipTrigger>
                        {tooltipContent("Thème")}
                    </Tooltip>
                </NavigationMenu.Trigger>
            </NavigationMenu.Menu>
        </NavigationMenu>
    )
}
