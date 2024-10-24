import {useLocation, useParams} from "@solidjs/router";
import {Flex} from "../ui/flex.tsx";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../ui/card.tsx";
import {Button} from "../ui/button.tsx";
import {DownloadIcon} from "../../assets/icons/SvgIcons.tsx";
import {createSignal} from "solid-js";
import SendEmailDialog from "../dialogs/SendEmailDialog.tsx";
import formatters from "../../constants/formatters.ts";
import {showErrorToaster, showSuccessToaster} from "../ui/toast-utils.ts";
import displayText from "../../constants/display-text.ts";

export default function InvoiceDetail() {
    const location = useLocation();
    const invoice: any = location.state;
    const params = useParams();
    const [recipient, setRecipient] = createSignal("");

    const sendEmail = () => {
        if (formatters.regexEmail.exec(recipient())) {
            showSuccessToaster(displayText.mailSentToTitle, `${displayText.mailSentToDescription} ${recipient()}`)
        } else {
            showErrorToaster(displayText.mailUnsentTitle, displayText.mailUnsentDescription)
        }
    }


    const updateEmail = (mail: string) => {
        setRecipient(mail)
    }
    return (
        <Flex class={"app-content"}>
            <Card class={"invoice-details-card"}>
                <CardHeader>
                    <CardTitle>{displayText.invoiceCardTitle} {params.reference}</CardTitle>
                    <CardDescription>{displayText.invoiceCardDescription}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <div class="space-y-1">
                            <p class="text-sm font-medium leading-none">{invoice.invoice}</p>
                            <p class="text-sm text-muted-foreground">Référencee</p>
                        </div>
                    </div>
                    <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <span class={`flex size-2 translate-y-1 rounded-full bg-red-700 ${invoice.paymentStatus.toLowerCase()}-status`}/>
                        <div class="space-y-1">
                            <p class={`text-sm font-medium leading-none ${invoice.paymentStatus.toLowerCase()}-status`}>{invoice.paymentStatus}</p>
                            <p class="text-sm text-muted-foreground">Statut</p>
                        </div>
                    </div>
                    <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <div class="space-y-1">
                            <p class="text-sm font-medium leading-none">{invoice.totalAmount}</p>
                            <p class="text-sm text-muted-foreground">Montant</p>
                        </div>
                    </div>
                    <div class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                        <div class="space-y-1">
                            <p class="text-sm font-medium leading-none">{invoice.date}</p>
                            <p class="text-sm text-muted-foreground">Date de la transaction</p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button class="w-full">
                        <DownloadIcon/>
                        {displayText.download}
                    </Button>
                    <SendEmailDialog recipient={recipient()} updateEmail={updateEmail}
                                     sendEmail={() => sendEmail()}/>
                </CardFooter>
            </Card>
        </Flex>
    )
}