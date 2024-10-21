import {NavigationMenu} from "@kobalte/core/navigation-menu";
import {showSuccessToaster, showWarningToaster} from "../ui/toast-utils.ts";
import displayText from "../../constants/display-text.ts";
import {AccountMenu} from "./AccountMenu.tsx";
import {setAppStore} from "../../stores/AppStore.ts";
import {ConfigColorMode, useColorMode} from "@kobalte/core";
import type { Orientation } from "@kobalte/utils";

export default function BasicAppBar(props: { themeName: () => string, setThemeName: (e: string) => void }) {
    const {setColorMode} = useColorMode()

    const updateTheme = (theme: string) => {
        if (theme === displayText.themeNameDark) {
            props.setThemeName(displayText.themeNameDark)
            setColorMode(displayText.themeNameDark as ConfigColorMode)
            setAppStore("theme", displayText.themeNameDark)
            showWarningToaster(displayText.toasterUpdateThemeTitle, displayText.toasterUpdateThemeDarkContent);
        } else {
            props.setThemeName(displayText.themeNameLight)
            setColorMode(displayText.themeNameLight as ConfigColorMode)
            setAppStore("theme", displayText.themeNameLight)
            showSuccessToaster(displayText.toasterUpdateThemeTitle, displayText.toasterUpdateThemeLightContent);
        }
    }

    const login = () => {
        setAppStore("token", "123456789")
    }

    return (
        <>
            <NavigationMenu orientation={displayText.horizontal as Orientation} class="navigation-menu__root">
                <NavigationMenu.Menu>
                    <NavigationMenu.Item
                        class="navigation-menu__trigger"
                        href="/"
                    >Home
                    </NavigationMenu.Item>
                </NavigationMenu.Menu>
                <NavigationMenu.Menu>
                    <NavigationMenu.Trigger class="navigation-menu__trigger">
                        {displayText.menuItemOne}{" "}
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
                                    {displayText.menuItemOneLabel[0]}
                                </NavigationMenu.ItemLabel>
                                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                    {displayText.menuItemOneDescription[0]}
                                </NavigationMenu.ItemDescription>
                            </NavigationMenu.Item>
                            <NavigationMenu.Item
                                class="navigation-menu__item"
                                href="https://pigment.kobalte.dev"
                            >
                                <NavigationMenu.ItemLabel class="navigation-menu__item-label">
                                    {displayText.menuItemOneLabel[1]}
                                </NavigationMenu.ItemLabel>
                                <NavigationMenu.ItemDescription class="navigation-menu__item-description">
                                    {displayText.menuItemOneDescription[1]}
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
            <AccountMenu updateTheme={updateTheme} themeName={props.themeName} logIn={login}></AccountMenu>
        </>
    )
}
