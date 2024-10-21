import {createSignal} from "solid-js"

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {DropdownMenu} from "@kobalte/core/dropdown-menu";
import {CheckedIcon, DarkModeIcon, LightModeIcon} from "../../assets/icons/SvgIcons.tsx";
import displayText from "../../constants/display-text.ts";

export function AccountMenu(props: { updateTheme: (e: string) => void, themeName: () => string }) {
    const [showGitLog, setShowGitLog] = createSignal(false)
    const [showHistory, setShowHistory] = createSignal(false)
    return (
        <DropdownMenu>
            <DropdownMenu.Trigger class="dropdown-menu__trigger">
                <Avatar>
                    <AvatarImage src="https://github.com/sek-consulting.png" height={15} width={15}/>
                    <AvatarFallback>EK</AvatarFallback>
                </Avatar>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
                <DropdownMenu.Content class="dropdown-menu__content">
                    <DropdownMenu.Item class="dropdown-menu__item">
                        Connexion <div class="dropdown-menu__item-right-slot">⇧+⌘+K</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-menu__item">
                        Profil <div class="dropdown-menu__item-right-slot">⌘+K</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item class="dropdown-menu__item" disabled>
                        Update Project <div class="dropdown-menu__item-right-slot">⌘+T</div>
                    </DropdownMenu.Item>
                    <DropdownMenu.Sub overlap gutter={4} shift={-8}>
                        <DropdownMenu.SubTrigger class="dropdown-menu__sub-trigger">
                            GitHub
                            <div class="dropdown-menu__item-right-slot">
                                <DarkModeIcon/>
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
                                <DropdownMenu.Separator class="dropdown-menu__separator"/>
                                <DropdownMenu.Item class="dropdown-menu__item">
                                    Open on GitHub
                                </DropdownMenu.Item>
                            </DropdownMenu.SubContent>
                        </DropdownMenu.Portal>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Separator class="dropdown-menu__separator"/>
                    <DropdownMenu.CheckboxItem
                        class="dropdown-menu__checkbox-item"
                        checked={showGitLog()}
                        onChange={setShowGitLog}
                    >
                        <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                            <DarkModeIcon/>
                        </DropdownMenu.ItemIndicator>
                        Show Git Log
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.CheckboxItem
                        class="dropdown-menu__checkbox-item"
                        checked={showHistory()}
                        onChange={setShowHistory}
                    >
                        <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                            <DarkModeIcon/>
                        </DropdownMenu.ItemIndicator>
                        Show History
                    </DropdownMenu.CheckboxItem>
                    <DropdownMenu.Separator class="dropdown-menu__separator"/>
                    <DropdownMenu.Group>
                        <DropdownMenu.GroupLabel class="dropdown-menu__group-label">
                            Thèmes
                        </DropdownMenu.GroupLabel>

                        <DropdownMenu.RadioGroup value={props.themeName()} onChange={(e) => props.updateTheme(e)}>
                            <DropdownMenu.RadioItem class="dropdown-menu__radio-item"
                                                    value={displayText.themeNameLight}>
                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                    <CheckedIcon/>
                                </DropdownMenu.ItemIndicator>
                                Light
                                <div class="dropdown-menu__item-right-slot">
                                    <LightModeIcon/>
                                </div>
                            </DropdownMenu.RadioItem>
                            <DropdownMenu.RadioItem class="dropdown-menu__radio-item" value={displayText.themeNameDark}>
                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                    <CheckedIcon/>
                                </DropdownMenu.ItemIndicator>
                                Dark
                                <div class="dropdown-menu__item-right-slot">
                                    <DarkModeIcon/>
                                </div>
                            </DropdownMenu.RadioItem>
                        </DropdownMenu.RadioGroup>
                    </DropdownMenu.Group>
                    <DropdownMenu.Arrow/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu>
    )
}