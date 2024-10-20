import {Tooltip, TooltipTrigger} from "../ui/tooltip.tsx";
import {tooltipContent} from "../ui/TooltipUtils.tsx";
import {NavigationMenu} from "@kobalte/core/navigation-menu";
import {useColorMode} from "@kobalte/core";
import {showSuccessToaster, showWarningToaster} from "../ui/toast-utils.ts";
import data from "../../constants/display-text.ts";
import {Toggle} from "../ui/toggle.tsx";
import {Show} from "solid-js";
import {DarkModeIcon, LightModeIcon} from "../../assets/icons/SvgIcons.tsx";
import {AccountMenu} from "./AccountMenu.tsx";
import {setAppStore} from "../../stores/AppStore.ts";

export default function BasicAppBar({themeName, setThemeName}) {
    const {setColorMode} = useColorMode()

    const updateTheme = (theme: string) => {
        if (theme === data.themeNameDark) {
            setThemeName(data.themeNameDark)
            showWarningToaster(data.toasterUpdateThemeTitle, data.toasterUpdateThemeDarkContent
            );
            setColorMode(data.themeNameDark)
            setAppStore((store) => {
                store.theme = data.themeNameDark
            })
        } else {
            showSuccessToaster(data.toasterUpdateThemeTitle, data.toasterUpdateThemeLightContent);
            setThemeName(data.themeNameLight)
            setColorMode(data.themeNameLight)
            setAppStore((store) => {
                store.theme = data.themeNameLight
            })
        }
    }


    return (
        <>

            <NavigationMenu orientation={data.horizontal} class="navigation-menu__root">
                <NavigationMenu.Menu>
                    <NavigationMenu.Item

                        class="navigation-menu__trigger"
                        href="/"
                    >Home
                    </NavigationMenu.Item>
                </NavigationMenu.Menu>
                <NavigationMenu.Menu>
                    <NavigationMenu.Trigger class="navigation-menu__trigger">
                        {data.menuItemOne}{" "}
                    </NavigationMenu.Trigger>
                    <NavigationMenu.Portal>
                        <NavigationMenu.Content class="navigation-menu__content content-1">
                            <NavigationMenu.Item

                                class="navigation-menu__item-callout"
                                href="/"
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
                <NavigationMenu.Viewport class="navigation-menu__viewport">
                    <NavigationMenu.Arrow class="navigation-menu__arrow"/>
                </NavigationMenu.Viewport>
            </NavigationMenu>
            <AccountMenu updateTheme={updateTheme} themeName={themeName}></AccountMenu>
        </>

    )
}
