import {createSignal} from "solid-js"

import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar.tsx";
import {DropdownMenu} from "@kobalte/core/dropdown-menu";
import {
    CheckedIcon,
    DarkModeIcon,
    DownloadIcon,
    HidePasswordIcon,
    LightModeIcon,
    SeePasswordIcon
} from "../../assets/icons/SvgIcons.tsx";
import displayText from "../../constants/display-text.ts";
import {appStore} from "../../stores/AppStore.ts";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import {TextField, TextFieldInput, TextFieldLabel} from "../ui/text-field.tsx";
import {Button} from "../ui/button.tsx";
import {ToggleGroup} from "@kobalte/core/toggle-group";

export function AccountMenu(props: { updateTheme: (e: string) => void, themeName: () => string, logIn: () => void }) {
    const [showGitLog, setShowGitLog] = createSignal(false)
    const [showHistory, setShowHistory] = createSignal(false)
    const [dialogOpen, setDialogOpen] = createSignal(false)
    const [identifier, setIdentifier] = createSignal("")
    const [password, setPassword] = createSignal("")
    const [value, setValue] = createSignal("hide")
    let refInputPassword;

    const openDialog = () => {
        setDialogOpen(true)
    }
    return (
        <>

            <Dialog open={dialogOpen()}>
                <DialogContent class="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle style={{margin:"auto"}}>Log in / Sign in</DialogTitle>
                    </DialogHeader>
                    <Tabs defaultValue="account" class="w-[420px] " style={{margin:"auto"}}>
                        <TabsList class="grid w-full grid-cols-2">
                            <TabsTrigger value="log-in">Log in</TabsTrigger>
                            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                        </TabsList>
                        <TabsContent value="log-in">
                            <Card>
                                <CardHeader>
                                    <CardTitle style={{margin:"auto"}}>Log in</CardTitle>
                                    <CardDescription style={{margin:"auto"}}>
                                        Log into your account
                                    </CardDescription>
                                </CardHeader>
                                <CardContent class="space-y-2">
                                    <TextField class="space-y-1" style={{width:'100%'}}>
                                        <TextFieldLabel>Identifiant</TextFieldLabel>
                                        <TextFieldInput value={identifier()} type="text" onChange={(e) => setIdentifier(e.target!.value)}
                                        placeholder={"Téléphone ou adresse mail"}/>
                                    </TextField>
                                    <TextField class="space-y-1" style={{width:'100%'}}>
                                        <DownloadIcon/>
                                    </TextField>
                                </CardContent>
                                <CardFooter>
                                    <Button style={{width:'100%'}}>Log in</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                        <TabsContent value="sign-in">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Sign in</CardTitle>
                                    <CardDescription>
                                        Inscription
                                    </CardDescription>
                                </CardHeader>
                                <CardContent class="space-y-2">
                                    <TextField class="space-y-1">
                                        <TextFieldLabel>M@il</TextFieldLabel>
                                        <TextFieldInput type="email" required={true}/>
                                    </TextField>
                                    <TextField class="space-y-1">
                                        <TextFieldLabel>Numéro de téléphone</TextFieldLabel>
                                        <TextFieldInput type="tel" required={true}/>
                                    </TextField>
                                    <TextField class="space-y-1">
                                        <TextFieldLabel>Mot de passe</TextFieldLabel>
                                        <TextFieldInput value={password()} type="password" onInput={(e:any) => {
                                            setPassword(e.target.value)
                                        }
                                        } ref={refInputPassword}/>
                                        <ToggleGroup  value={value()} onChange={(e: string) => {
                                            if(e === "hide") {
                                                refInputPassword!.type = "password"
                                            } else {
                                                refInputPassword!.type = "text"

                                            }
                                            setValue(e)
                                        }}>
                                            <ToggleGroup.Item value="see" aria-label="Afficher le mdp">
                                                <SeePasswordIcon />
                                            </ToggleGroup.Item>
                                            <ToggleGroup.Item value="hide" aria-label="Cacher le mdd">
                                                <HidePasswordIcon />
                                            </ToggleGroup.Item>
                                        </ToggleGroup>
                                    </TextField>
                                    <TextField class="space-y-1">
                                        <TextFieldLabel>Nom</TextFieldLabel>
                                        <TextFieldInput type="text" required={true}/>
                                    </TextField>
                                    <TextField class="space-y-1">
                                        <TextFieldLabel>Prénom</TextFieldLabel>
                                        <TextFieldInput type="text" required={true}/>
                                    </TextField>
                                </CardContent>
                                <CardFooter>
                                    <Button>Créer un compte</Button>
                                </CardFooter>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>
            <DropdownMenu>
                <DropdownMenu.Trigger class="dropdown-menu__trigger">
                    <Avatar>
                        <AvatarImage src={appStore.profilePicture} height={15} width={15}/>
                        <AvatarFallback>Me</AvatarFallback>
                    </Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Portal>
                    <DropdownMenu.Content class="dropdown-menu__content">
                        {appStore.token !== null &&
                            <DropdownMenu.Item class="dropdown-menu__item" onClick={openDialog}>
                                Log in / Sign in
                            </DropdownMenu.Item>
                        }

                        <DropdownMenu.Item class="dropdown-menu__item" as={"a"} href={"/profile"} onClick={() => {
                            console.log("click")
                        }}>
                                Profil
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