import {useParams} from "@solidjs/router";
import {Flex} from "../ui/flex.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import {Button} from "../ui/button.tsx";
import {DownloadIcon} from "../../assets/icons/SvgIcons.tsx";
import {createSignal} from "solid-js";
import SendEmailDialog from "../dialogs/SendEmailDialog.tsx";
import formatters from "../../constants/formatters.ts";
import {showErrorToaster, showSuccessToaster} from "../ui/toast-utils.ts";
import data from "../../constants/display-text.ts";


export default function InvoiceDetail() {

    const params = useParams();
    const [recipient, setRecipient] = createSignal("");

    const sendEmail = () => {
        if (formatters.regexEmail.exec(recipient())) {
            showSuccessToaster(data.mailSentToTitle, `${data.mailSentToDescription} ${recipient()}`)
        } else {
            showErrorToaster("Échec de l'envoi", "Format de l'adresse mail non valide")
        }
    }
    return (
        <Flex class={"app-content"}>
            <Card class={"invoice-details-card"}>
                <CardHeader>
                    <CardTitle>Invoice {params.reference}</CardTitle>
                    <CardDescription>Details for the invoice</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span class="flex size-2 translate-y-1 rounded-full bg-sky-500"/>
                        <div class="space-y-1">
                            <p class="text-sm font-medium leading-none">Titre de la notif</p>
                            <p class="text-sm text-muted-foreground">Label</p>
                        </div>
                    </div>
                </CardContent>

                <CardFooter>
                    <Button class="w-full">
                        <DownloadIcon/>
                        Download
                    </Button>

                    <SendEmailDialog value={recipient()} onChange={(e) => setRecipient(e.target.value)}
                                     onClick={() => sendEmail()}/>
                </CardFooter>
            </Card>

        </Flex>
    )
}