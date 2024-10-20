import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog.tsx";
import {Button} from "../ui/button.tsx";
import {TextField, TextFieldErrorMessage, TextFieldInput, TextFieldLabel} from "../ui/text-field.tsx";
import formatters from "../../constants/formatters.ts";
import displayText from "../../constants/display-text.ts";

export default function SendEmailDialog(props: {
    recipient: string,
    updateEmail: (e) => string,
    sendEmail: () => void
}) {
    return(
        <Dialog>
        <DialogTrigger as={Button<"button">} class={"w-full"}>Send By Email</DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{displayText.mailDialogTitle}</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <TextField value={props.recipient}
                           validationState={props.recipient.length > 4 && formatters.regexEmail.exec(props.recipient) ? "valid" : "invalid"}
                           onChange={props.updateEmail}>
                    <TextFieldLabel for="email" class={"input-error-message"}>Recipient</TextFieldLabel>
                    <TextFieldErrorMessage class={"input-error-message"}>
                        {displayText.mailDialogError}
                    </TextFieldErrorMessage>
                    <TextFieldInput id={"email"}
                                    class="col-span-3" type="email"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && formatters.regexEmail.exec(props.recipient)) {
                                            props.sendEmail();
                                        }
                                    }}
                    />
                </TextField>

            </div>
            <DialogFooter>
                <Button type="submit" class={"w-full"} onClick={props.sendEmail}>{displayText.mailDialogSubmit}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    );
}
