import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger
} from "../ui/drawer.tsx";
import {Button} from "../ui/button.tsx";
import {DownloadIcon, EditIcon, MailIcon, PhoneIcon, VerifiedIcon} from "../../assets/icons/SvgIcons.tsx";
import {updateProfilePic} from "../../services/FakeService.ts";
import {appStore, setAppStore} from "../../stores/AppStore.ts";
import {showErrorToaster, showSuccessToaster} from "../ui/toast-utils.ts";
import {Flex} from "../ui/flex.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "../ui/tooltip.tsx";
import {Card, CardContent} from "../ui/card.tsx";
import {Separator} from "../ui/separator.tsx";

export default function Profile() {
    const sendFile = (e: any) => {
        e.preventDefault()
        const file = e.target[0].files[0]
        if (file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg" || file.type === "image/gif") {
            const changeProfilePicRequest = {
                image: file
            }
            updateProfilePic(changeProfilePicRequest).then(r => {
                setAppStore("profilePicture", r!.data.profilePictureUrl)
            })
            showSuccessToaster("Photo modifiée", "La photo de profil a bien été modifiée")
        } else {
            showErrorToaster("Type de fichier non supporté.", "Seuls les fichiers images et gif (PNG/JPG/GIF) sont autorisés en tant que photo de profil")
        }
    }
    let refProfilePicturePreview: HTMLImageElement;
    let refUpdateProfilePictureTrigger: HTMLImageElement;

    return (
        <Flex class={"app-content"}>
            <Card>
                <CardContent>
                    <div class="flex space-x-4 rounded-md p-4 items-center justify-center">
                        <Drawer>
                            { /** @ts-ignore */}
                            <DrawerTrigger ref={refUpdateProfilePictureTrigger}
                                           as={"img"} src={appStore.profilePicture} width="150px" height="150px"
                                           class={"size-32 shrink-0 overflow-hidden rounded-full"}
                                           style={{margin: "12px"}}>
                                Modifier la photo de profil
                            </DrawerTrigger>
                            <div style={{
                                position: "absolute",
                                cursor: "pointer",
                            }}
                                 onClick={() => refUpdateProfilePictureTrigger.click()}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <EditIcon/>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Changer la photo de profil</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                            <DrawerContent>
                                <div class="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle>Changer la photo de profil</DrawerTitle>
                                    </DrawerHeader>

                                    <form onSubmit={sendFile} enctype="multipart/form-data">
                                        <DrawerFooter>
                                    <span
                                        class={"relative flex size-28 shrink-0 overflow-hidden rounded-full items-center justify-center"}
                                        style={{"margin": "0 auto"}}>
                                        {/** @ts-ignore */}
                                        <img id={"preview"} alt={"Preview"} ref={refProfilePicturePreview}/>
                                    </span>
                                            <input type={"file"} name="file" id={"file"}
                                                   style={{visibility: "hidden"}}
                                                   onChange={(e) => {
                                                       refProfilePicturePreview.src = URL.createObjectURL(e.target.files![0])
                                                   }}/>
                                            <Button variant={"ghost"}
                                                    onClick={() => document.getElementById("file")!.click()}><DownloadIcon/>Sélectionner
                                                une nouvelle photo de profil</Button>
                                            <Button type={"submit"}>Appliquer</Button>

                                            <DrawerClose as={Button<"button">} variant="outline">
                                                Annuler
                                            </DrawerClose>
                                        </DrawerFooter>
                                    </form>
                                </div>
                            </DrawerContent>
                        </Drawer>
                    </div>
                    <div style={{margin: "15px auto"}}>
                        <div class={"flex items-center justify-center"}>
                            Contact
                        </div>
                        <div class="flex h-5 space-x-4 text-sm">
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <PhoneIcon/>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">{appStore.user?.phoneNumber}</p>
                                    <p class="text-sm text-muted-foreground">Numéro de téléphone</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <MailIcon/>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">{appStore.user?.mail}</p>
                                    <p class="text-sm text-muted-foreground">Adresse mail</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                {VerifiedIcon(appStore.user?.accountVerifiedStatus ? "darkgreen" : "darkred")}
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none accent-red-700">{appStore.user?.accountVerifiedStatus ? "Profil vérifié" : "Profil non vérifié"}</p>
                                    <p class="text-sm text-muted-foreground">Vérification</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator></Separator>
                </CardContent>
            </Card>
        </Flex>
    )
}