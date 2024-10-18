import {Switch, SwitchControl, SwitchLabel, SwitchThumb} from "../components/ui/switch.tsx";
import {Flex} from "../components/ui/flex.tsx";
import {Tooltip, TooltipTrigger} from "../components/ui/tooltip.tsx";
import {tooltipContent} from "../components/ui/TooltipUtils.tsx";
import {NavigationMenu} from "@kobalte/core/navigation-menu";
import {useColorMode} from "@kobalte/core";
import {showErrorToaster, showSuccessToaster} from "../components/ui/toast-utils.ts";
import data from "../constants/static-text-values.ts";
import {Toggle} from "../components/ui/toggle.tsx";
import {createSignal, Show} from "solid-js";
import { DropdownMenu } from "@kobalte/core/dropdown-menu";
export default function BasicAppBar({themeName, setThemeName}) {
    const {setColorMode} = useColorMode()
    const [showGitLog, setShowGitLog] = createSignal(false)
    const [showHistory, setShowHistory] = createSignal(false)
    const [branch, setBranch] = createSignal("develop")


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
    const LightModeIcon = ({className="", title=""}) => {
        return (
            <i type="material-o-19090" class={`cIcon cIcon-LightMode ${className}`} title={title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentcolor" viewBox="0 0 1024 1024">
                    <path d="M512 384c70.4 0 128 57.6 128 128s-57.6 128-128 128-128-57.6-128-128 57.6-128 128-128m0-85.3c-117.8 0-213.3 95.6-213.3 213.3s95.6 213.3 213.3 213.3 213.3-95.6 213.3-213.3-95.6-213.3-213.3-213.3zM85.3 554.7h85.4c23.5 0 42.7-19.2 42.6-42.7s-19.2-42.7-42.6-42.7H85.3c-23.5 0-42.7 19.2-42.6 42.7s19.2 42.7 42.6 42.7z m768 0h85.4c23.5 0 42.7-19.2 42.6-42.7s-19.2-42.7-42.6-42.7h-85.4c-23.5 0-42.7 19.2-42.6 42.7s19.2 42.7 42.6 42.7zM469.3 85.3v85.4c0 23.5 19.2 42.7 42.7 42.6s42.7-19.2 42.7-42.6V85.3c0-23.5-19.2-42.7-42.7-42.6s-42.7 19.2-42.7 42.6z m0 768v85.4c0 23.5 19.2 42.7 42.7 42.6s42.7-19.2 42.7-42.6v-85.4c0-23.5-19.2-42.7-42.7-42.6s-42.7 19.2-42.7 42.6zM255.6 195.4a42.5 42.5 0 0 0-60.2 0 42.5 42.5 0 0 0 0 60.2l45.2 45.2c16.6 16.6 43.9 16.6 60.2 0s16.6-43.9 0-60.2L255.6 195.4z m527.8 527.8a42.5 42.5 0 0 0-60.2 0 42.5 42.5 0 0 0 0 60.2l45.2 45.2c16.6 16.6 43.9 16.6 60.2 0a42.5 42.5 0 0 0 0-60.2l-45.2-45.2z m45.2-467.6a42.5 42.5 0 0 0 0-60.2 42.5 42.5 0 0 0-60.2 0l-45.2 45.2c-16.6 16.6-16.6 43.9 0 60.2s43.9 16.6 60.2 0l45.2-45.2zM300.8 783.4a42.5 42.5 0 0 0 0-60.2 42.5 42.5 0 0 0-60.2 0l-45.2 45.2c-16.6 16.6-16.6 43.9 0 60.2s43.9 16.6 60.2 0l45.2-45.2z">
                    </path>
                </svg>
            </i>
        );
    };

    const DarkModeIcon = ({className="", title=""}) => {
        return (
            <i type="material-22914" class={`cIcon cIcon-DarkMode ${className}`} title={title}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentcolor" viewBox="0 0 1024 1024">
                    <path d="M512 128a384 384 0 1 0 384 384c0-19.6-1.7-39.3-4.3-58a229.9 229.9 0 0 1-187.7 96.4 230.5 230.5 0 0 1-134-418.1c-18.8-2.6-38.4-4.3-58-4.3z">
                    </path>
                </svg>
            </i>
        );
    };
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
                    <Toggle onClick={() => updateTheme()}>
                        <Tooltip>
                            <TooltipTrigger>
                                <Show when={themeName() === 'light'} fallback={<DarkModeIcon/>}>
                                    <LightModeIcon/>
                                </Show>
                            </TooltipTrigger>
                            {tooltipContent("Thème")}
                        </Tooltip>
                    </Toggle>
                </NavigationMenu.Trigger>
            </NavigationMenu.Menu>

            <NavigationMenu.Menu >
                <NavigationMenu.Trigger class="navigation-menu__trigger" >
                        <DropdownMenu>
                            <DropdownMenu.Trigger class="dropdown-menu__trigger">
                                <span>Git Settings</span>
                                <DropdownMenu.Icon class="dropdown-menu__trigger-icon">
                                    <DarkModeIcon />
                                </DropdownMenu.Icon>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Portal
                                >

                                <DropdownMenu.Content class="dropdown-menu__content">
                                    <DropdownMenu.Item class="dropdown-menu__item">
                                        Commit <div class="dropdown-menu__item-right-slot">⌘+K</div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item class="dropdown-menu__item">
                                        Push <div class="dropdown-menu__item-right-slot">⇧+⌘+K</div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item class="dropdown-menu__item" disabled>
                                        Update Project <div class="dropdown-menu__item-right-slot">⌘+T</div>
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Sub overlap gutter={4} shift={-8}>
                                        <DropdownMenu.SubTrigger class="dropdown-menu__sub-trigger">
                                            GitHub
                                            <div class="dropdown-menu__item-right-slot">
                                                <DarkModeIcon />
                                            </div>
                                        </DropdownMenu.SubTrigger>
                                        <DropdownMenu.Portal>
                                            <DropdownMenu.SubContent class="dropdown-menu__sub-content">
                                                <DropdownMenu.Item class="dropdown-menu__item">
                                                    Create Pull Request…
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item class="dropdown-menu__item">
                                                    View Pull Requests
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item class="dropdown-menu__item">
                                                    Sync Fork
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Separator class="dropdown-menu__separator" />
                                                <DropdownMenu.Item class="dropdown-menu__item">
                                                    Open on GitHub
                                                </DropdownMenu.Item>
                                            </DropdownMenu.SubContent>
                                        </DropdownMenu.Portal>
                                    </DropdownMenu.Sub>
                                    <DropdownMenu.Separator class="dropdown-menu__separator" />
                                    <DropdownMenu.CheckboxItem
                                        class="dropdown-menu__checkbox-item"
                                        checked={showGitLog()}
                                        onChange={setShowGitLog}
                                    >
                                        <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                            <DarkModeIcon />
                                        </DropdownMenu.ItemIndicator>
                                        Show Git Log
                                    </DropdownMenu.CheckboxItem>
                                    <DropdownMenu.CheckboxItem
                                        class="dropdown-menu__checkbox-item"
                                        checked={showHistory()}
                                        onChange={setShowHistory}
                                    >
                                        <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                            <DarkModeIcon />
                                        </DropdownMenu.ItemIndicator>
                                        Show History
                                    </DropdownMenu.CheckboxItem>
                                    <DropdownMenu.Separator class="dropdown-menu__separator" />
                                    <DropdownMenu.Group>
                                        <DropdownMenu.GroupLabel class="dropdown-menu__group-label">
                                            Branches
                                        </DropdownMenu.GroupLabel>
                                        <DropdownMenu.RadioGroup value={branch()} onChange={setBranch}>
                                            <DropdownMenu.RadioItem class="dropdown-menu__radio-item" value="main">
                                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                                    <DarkModeIcon />
                                                </DropdownMenu.ItemIndicator>
                                                main
                                            </DropdownMenu.RadioItem>
                                            <DropdownMenu.RadioItem class="dropdown-menu__radio-item" value="develop">
                                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                                    <DarkModeIcon />
                                                </DropdownMenu.ItemIndicator>
                                                develop
                                            </DropdownMenu.RadioItem>
                                        </DropdownMenu.RadioGroup>
                                    </DropdownMenu.Group>
                                    <DropdownMenu.Arrow />
                                </DropdownMenu.Content>
                            </DropdownMenu.Portal>
                        </DropdownMenu>
                </NavigationMenu.Trigger>
            </NavigationMenu.Menu>

        </NavigationMenu>
    )
}
