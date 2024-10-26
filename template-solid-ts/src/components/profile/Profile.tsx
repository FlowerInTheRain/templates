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
import {addAuthorizationHeader} from "../../services/AxiosInstance.ts";
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
            addAuthorizationHeader(
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpc3MiOiJwZXRwYWxzIiwidXBuIjoic2EuYmVubmFjZXVyQGdtYWlsLmNvbSIsImdyb3VwcyI6WyJDTElFTlQiXSwiZXhwIjoxNzMxMTA4OTYxLCJhZGRyZXNzIjoicGV0cGFscy1hcHBzIiwiaWF0IjoxNzI5ODk5MzYxLCJqdGkiOiIxOTBhNDhkYy05Yzk2LTRkMjQtOWI5Mi02Mjc1OTE4ODcxODYifQ.BmlLiO4u5X1WVn-i0BjbzgniCCU-sVoHnbENmvEdJ8aXXPS61kF-zZcYubvMojkupQUC7jcterr1bwwOeEzsA_kwt-KZiLCMVCxAvGo-BpVvFMof3lNoSay3tk7IqcsOFURqAM0bQtACYeYM4hhH4BDgvqKmyZPH0R9BDVV3TnNx41TpqaCNKO1uai9HGfvf6N1fmvQLUdenP3FUTwk5M6T8FgBcSLJkZGwCYJRdv_sf2rvzcS0n_uNcc7xcvLjcmsulaa4fuX8TnnTUSYJP6OIiibVBegK1jqYn7AsacQPC-21mS0nncozu1TuFBAlxvpIrmP-1PD3G41d9ZgAfsQ"
            )

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
                                    <p class="text-sm font-medium leading-none">0764017528</p>
                                    <p class="text-sm text-muted-foreground">Numéro de téléphone</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <MailIcon/>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">sa.bennaceur@gmail.com</p>
                                    <p class="text-sm text-muted-foreground">Adresse mail</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                {VerifiedIcon("darkgreen")}
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">Profil vérifié</p>
                                    <p class="text-sm text-muted-foreground">Vérification</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Separator></Separator>
                    <div style={{margin: "25px auto"}}>
                        <div class={"flex items-center justify-center"}>
                            Actions
                        </div>
                        <div class="flex space-x-4 text-sm">
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <PhoneIcon/>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">0764017528</p>
                                    <p class="text-sm text-muted-foreground">Numéro de téléphone</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                <MailIcon/>
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">sa.bennaceur@gmail.com</p>
                                    <p class="text-sm text-muted-foreground">Adresse mail</p>
                                </div>
                            </div>
                            <Separator orientation="vertical"/>
                            <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                {VerifiedIcon("darkgreen")}
                                <div class="space-y-1">
                                    <p class="text-sm font-medium leading-none">Profil vérifié</p>
                                    <p class="text-sm text-muted-foreground">Vérification</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </Flex>
    )
}