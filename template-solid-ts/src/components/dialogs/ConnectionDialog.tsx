import {Dialog, DialogContent, DialogHeader, DialogTitle} from "../ui/dialog.tsx";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "../ui/tabs.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import {TextField, TextFieldInput, TextFieldLabel} from "../ui/text-field.tsx";
import {Button} from "../ui/button.tsx";
import {createSignal} from "solid-js";
import {showErrorToaster, showSuccessToaster} from "../ui/toast-utils.ts";
import {Switch, SwitchControl, SwitchDescription, SwitchThumb} from "../ui/switch.tsx";
import {logIn, signIn} from "../../services/ApiService.ts";
import {appStore, setAppStore} from "../../stores/AppStore.ts";
import {addAuthorizationHeader} from "../../services/AxiosInstance.ts";

interface SignInForm {
    mail: string;
    phoneNumber: string;
    lastName: string;
    firstName:string;
    password: string;
    verifyPassword?: string;
}

export default function ConnectionDialog(props: { setDialogOpen: (e: boolean) => void, dialogOpen: () => boolean }) {

    const [showPassword, setShowPassword] = createSignal(false)
    const [signInForm, setSignInForm] = createSignal<SignInForm>({
        lastName: '',
        firstName: '',
        mail: '',
        phoneNumber: '',
        password: '',
        verifyPassword: ''
    })
    const [loginForm, setLoginForm] = createSignal({
        identifier: '',
        password: ''
    })
    let refSignInInputPassword;
    let refLogInInputPassword;
    let refSignInInputVerifyPassword;

    const checkSignInForm = async () => {
        if(signInForm().password !== signInForm().verifyPassword){
            showErrorToaster("Échec de validation du formulaire", "Les mots de passe ne correspondent pas")
            return
        }
        if(!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!?\$_])[A-Za-z\d!?\$_]{8,}$/.exec(signInForm().password)){
            showErrorToaster("Échec de validation du formulaire", "Mot de passe invalide, le mot de passe doit comporter au moins 8 caractères et contenir un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial (! ou ?)")
            return
        }

        if(signInForm().firstName.length < 3 && signInForm().lastName.length < 3){
            showErrorToaster("Échec de validation du formulaire","Vous devez fournir un nom et un prénom")
            return
        }
        let request = signInForm();
        delete request.verifyPassword
        const response = await signIn(request)
        try {
            setAppStore("token", response?.data.jwToken)
            setAppStore("user", {
                reference: response?.data.reference,
                phoneNumber: signInForm().phoneNumber,
                mail: signInForm().mail,
                type: response?.data.type,
                accountVerifiedStatus: response?.data.accountVerifiedStatus
            })
            addAuthorizationHeader(appStore.token!)
            showSuccessToaster("Inscription réussie", `Bienvenue ${signInForm().firstName} ${signInForm().lastName}`)
            props.setDialogOpen(false)
        } catch (error){
            console.log(error)
            showErrorToaster("Echec de l'inscription","Adresse mail déjà enregistrée")
        }


    }

    const sendLoginForm = async () => {
        let request = loginForm();
        try {
            const response = await logIn(request)
            setAppStore("token", response?.data.jwToken)
            setAppStore("user", {
                reference: response?.data.reference,
                phoneNumber: response?.data.phoneNumber,
                mail: response?.data.mail,
                type: response?.data.type,
                accountVerifiedStatus: response?.data.accountVerifiedStatus
            })
            setAppStore("profilePicture", response?.data.profilePicture)
            addAuthorizationHeader(appStore.token!)
            showSuccessToaster("Connexion réussie", `Bonjour ${response?.data.firstName} ${response?.data.lastName}`)
            props.setDialogOpen(false)
        } catch (error: any) {
            if(error.response.data.message === "User not found") {
                showErrorToaster("Échec de la connexion","Utilisateur non reconnu")
            } else {
                showErrorToaster("Échec de la connexion","Une erreur inconnue est apparue, veuillez réessayer plus tard")
            }
        }

    }

    return (
        <Dialog open={props.dialogOpen()} onOpenChange={(e: any) => {
            props.setDialogOpen(e)
        }}>
            <DialogContent class="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle style={{margin: "auto"}}>Log in / Sign in</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="account" class="w-[420px] " style={{margin: "auto"}}>
                    <TabsList class="grid w-full grid-cols-2">
                        <TabsTrigger value="log-in">Log in</TabsTrigger>
                        <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                    </TabsList>
                    <TabsContent value="log-in">
                        <Card>
                            <CardHeader>
                                <CardTitle style={{margin: "auto"}}>Log in</CardTitle>
                                <CardDescription style={{margin: "auto"}}>
                                    Log into your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent class="space-y-2">
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Identifiant</TextFieldLabel>
                                    <TextFieldInput value={loginForm().identifier} type="text"
                                                    onInput={(e: any) => setLoginForm((prev) => {
                                                        prev.identifier = e.target.value
                                                        return prev
                                                    })}
                                                    placeholder={"Téléphone ou adresse mail"}/>
                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextField class="space-y-1" style={{width: '100%'}}>
                                        <TextFieldLabel>Mot de passe</TextFieldLabel>
                                        <TextFieldInput value={loginForm().password} type="password"
                                                        onInput={(e: any) => setLoginForm((prev) => {
                                                            prev.password = e.target.value
                                                            return prev
                                                        })} ref={refLogInInputPassword}
                                                        placeholder={"Mot de passe"}/>
                                        <Switch checked={showPassword()} onChange={(e: boolean) => {
                                            if (e) {
                                                refLogInInputPassword!.type = "text"
                                            } else {
                                                refLogInInputPassword!.type = "password"
                                            }
                                            setShowPassword(e)
                                        }} class="flex items-center space-x-2 justify-center" >
                                            <SwitchDescription class="switch__description">Afficher le mot de passe</SwitchDescription>
                                            <SwitchControl class="switch__control">
                                                <SwitchThumb class="switch__thumb" />
                                            </SwitchControl>
                                        </Switch>
                                    </TextField>
                                </TextField>
                            </CardContent>
                            <CardFooter>
                                <Button style={{width: '100%'}} onClick={sendLoginForm}>Log in</Button>
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
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>M@il</TextFieldLabel>
                                    <TextFieldInput type="email" required={true} value={signInForm().mail}
                                                    onInput={(e: any) => setSignInForm((prev) => {
                                                        prev.mail = e.target.value
                                                        return prev
                                                    })}/>
                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Numéro de téléphone</TextFieldLabel>
                                    <TextFieldInput type="tel" required={true} value={signInForm().phoneNumber}
                                                    onInput={(e: any) => setSignInForm((prev) => {
                                                        prev.phoneNumber = e.target.value
                                                        return prev
                                                    })}/>
                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Mot de passe</TextFieldLabel>
                                    <TextFieldInput value={signInForm().password} type="password" onInput={(e: any) =>
                                        setSignInForm((prev) => {
                                            prev.password = e.target.value
                                            return prev
                                        })
                                    } ref={refSignInInputPassword}/>

                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Vérification du mot de passe</TextFieldLabel>
                                    <TextFieldInput value={signInForm().verifyPassword} type="password"
                                                    onInput={(e: any) =>
                                                        setSignInForm((prev) => {
                                                            prev.verifyPassword = e.target.value
                                                            return prev
                                                        })
                                                    } ref={refSignInInputVerifyPassword}/>
                                    <Switch checked={showPassword()} onChange={(e: boolean) => {
                                        if (e) {
                                            refSignInInputPassword!.type = "text"
                                            refSignInInputVerifyPassword!.type = "text"
                                        } else {
                                            refSignInInputPassword!.type = "password"
                                            refSignInInputVerifyPassword!.type = "password"
                                        }
                                        setShowPassword(e)
                                    }} class="flex items-center space-x-2 justify-center" >
                                        <SwitchDescription class="switch__description">Afficher les mots de passe</SwitchDescription>
                                        <SwitchControl class="switch__control">
                                            <SwitchThumb class="switch__thumb" />
                                        </SwitchControl>
                                    </Switch>
                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Nom</TextFieldLabel>
                                    <TextFieldInput type="text" required={true} value={signInForm().lastName}
                                                    onInput={(e: any) => setSignInForm((prev) => {
                                                        prev.lastName = e.target.value
                                                        return prev
                                                    })}/>
                                </TextField>
                                <TextField class="space-y-1" style={{width: '100%'}}>
                                    <TextFieldLabel>Prénom</TextFieldLabel>
                                    <TextFieldInput type="text" required={true} value={signInForm().firstName}
                                                    onInput={(e: any) => setSignInForm((prev) => {
                                                        prev.firstName = e.target.value
                                                        return prev
                                                    })}/>
                                </TextField>
                            </CardContent>
                            <CardFooter>
                                <Button style={{width: '100%'}} onClick={checkSignInForm}>Créer un compte</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}