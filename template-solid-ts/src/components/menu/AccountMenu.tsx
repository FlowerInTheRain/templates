import {createSignal} from "solid-js"

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {DropdownMenu} from "@kobalte/core/dropdown-menu";
import {
    CheckedIcon,
    DarkModeIcon,
    LightModeIcon,
    LoginIcon,
    LogOutIcon,
    ProfileIcon
} from "../../assets/icons/SvgIcons.tsx";
import displayText from "../../constants/display-text.ts";
import {appStore, setAppStore} from "../../stores/AppStore.ts";
import ConnectionDialog from "../dialogs/ConnectionDialog.tsx";
import {removeAuthorizationHeader} from "../../services/AxiosInstance.ts";
import VerifyAccountDialog from "../dialogs/VerifyAccountDialog.tsx";

export function AccountMenu(props: { updateTheme: (e: string) => void, themeName: () => string, logIn: () => void }) {
    const [showGitLog, setShowGitLog] = createSignal(false)
    const [showHistory, setShowHistory] = createSignal(false)
    const [dialogOpen, setDialogOpen] = createSignal(false)
    const [verifyAccountDialogOpen, setVerifyAccountDialogOpen] = createSignal(false)

    const openDialog = () => {
        setDialogOpen(true)
    }
    const openVerifyAccountDialog = () => {
        setVerifyAccountDialogOpen(true)
    }
    const logOut = () => {
        removeAuthorizationHeader()
        setAppStore("user", null)
        setAppStore("token", null)
        setAppStore("profilePicture", '')
    }
    return (
        <>
            <ConnectionDialog setDialogOpen={setDialogOpen} dialogOpen={dialogOpen}/>
            <VerifyAccountDialog setDialogOpen={setVerifyAccountDialogOpen} dialogOpen={verifyAccountDialogOpen}/>

            <DropdownMenu>
                <DropdownMenu.Trigger class="dropdown-menu__trigger">
                    <Avatar>
                        <AvatarImage src={appStore.profilePicture} height={15} width={15}/>
                        <AvatarFallback>Me</AvatarFallback>
                    </Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-menu__content">
                        {appStore.token === null ?
                            <DropdownMenu.Item class="dropdown-menu__item" onClick={openDialog}>
                                <div class="dropdown-menu__item-indicator">
                                    <LoginIcon/>
                                </div>
                                Log in / Sign in
                            </DropdownMenu.Item>
                            :
                            <>
                            {!appStore.user!.accountVerifiedStatus &&
                                <DropdownMenu.Item class="dropdown-menu__item" onClick={openVerifyAccountDialog} style={{color:"gold"}}>
                                    {appStore.user!.accountVerifiedStatus.toString()}
                                    <div class="dropdown-menu__item-right-slot" style={{color:"gold"}}><ProfileIcon /></div>
                                </DropdownMenu.Item>
                            }
                                <DropdownMenu.Item class="dropdown-menu__item" as={"a"} href={"/profile"}>
                                    Profil
                                    <div class="dropdown-menu__item-right-slot"><ProfileIcon/></div>
                                </DropdownMenu.Item>
                                <DropdownMenu.Item class="dropdown-menu__item" onClick={logOut}>
                                    Log out <div class="dropdown-menu__item-right-slot"><LogOutIcon/></div>
                                </DropdownMenu.Item>
                                {
                                    /**
                                     *
                                     */
                                }
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
                                </DropdownMenu.Sub><DropdownMenu.Separator
                                class="dropdown-menu__separator"/><DropdownMenu.CheckboxItem
                                class="dropdown-menu__checkbox-item"
                                checked={showGitLog()}
                                onChange={setShowGitLog}
                            >
                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                    <DarkModeIcon/>
                                </DropdownMenu.ItemIndicator>
                                Show Git Log
                            </DropdownMenu.CheckboxItem><DropdownMenu.CheckboxItem
                                class="dropdown-menu__checkbox-item"
                                checked={showHistory()}
                                onChange={setShowHistory}
                            >
                                <DropdownMenu.ItemIndicator class="dropdown-menu__item-indicator">
                                    <DarkModeIcon/>
                                </DropdownMenu.ItemIndicator>
                                Show History
                            </DropdownMenu.CheckboxItem></>
                        }


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
                                <DropdownMenu.RadioItem class="dropdown-menu__radio-item"
                                                        value={displayText.themeNameDark}>
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
        </>
    )
}