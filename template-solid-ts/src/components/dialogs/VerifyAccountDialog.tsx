import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "../ui/dialog"
import {OTPField, OTPFieldGroup, OTPFieldInput, OTPFieldSeparator, OTPFieldSlot} from "../ui/otp-field.tsx";
import {createSignal} from "solid-js";
import {Button} from "../ui/button.tsx";
import {createNewOtpCode, verifyUserAccount} from "../../services/ApiService.ts";
import {appStore, setAppStore} from "../../stores/AppStore.ts";
import {showErrorToaster, showSuccessToaster} from "../ui/toast-utils.ts";


export default function VerifyAccountDialog(props: { setDialogOpen: (e: boolean) => void, dialogOpen: () => boolean }){
    const [loading, setLoading] = createSignal(false)

    const verifyAccount = async (otpValue:string) => {
        if(otpValue.length === 6){
            setLoading(true)
            const request = {
                otpCode: otpValue
            }
            try {

                await verifyUserAccount(request)
                setAppStore("user", {
                    mail: appStore.user!.mail,
                    phoneNumber: appStore.user!.phoneNumber,
                    reference:appStore.user!.reference,
                    type: appStore.user!.type,
                    accountVerifiedStatus: true
                })
                setLoading(false)
                showSuccessToaster("Compte vérifié", "Votre compte a bien été vérifié")
            } catch (error:any) {
                console.log(error)
                showErrorToaster("Erreur lors de la vérifiation du compte","blabla")
            }
        }
    }

    const generateNewCode = async () => {
        await createNewOtpCode()
    }

    return (
        <Dialog open={props.dialogOpen()} onOpenChange={(e: any) => {
            props.setDialogOpen(e)
        }}>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Vérification de compte</DialogTitle>
                    <DialogDescription>
                        Veuillez saisir le code OTP envoyé par mail.
                    </DialogDescription>
                </DialogHeader>
                    {!loading() ?

                        <>
                <div class="flex gap-4 py-4 justify-center">

                                <OTPField maxLength={6} onValueChange={verifyAccount}>
                                    <OTPFieldInput/>
                                    <OTPFieldGroup>
                                        <OTPFieldSlot index={0}/>
                                        <OTPFieldSlot index={1}/>
                                        <OTPFieldSlot index={2}/>
                                    </OTPFieldGroup>
                                    <OTPFieldSeparator/>
                                    <OTPFieldGroup>
                                        <OTPFieldSlot index={3}/>
                                        <OTPFieldSlot index={4}/>
                                        <OTPFieldSlot index={5}/>
                                    </OTPFieldGroup>
                                </OTPField>
                </div>

                            <Button variant={"outline"} onClick={generateNewCode} style={{width:"65%", margin:"auto"}}>Générer un nouveau code</Button>

                        </>
                        :
                        <span>Compte en cours de vérification</span>
                    }
            </DialogContent>
        </Dialog>
    )
}