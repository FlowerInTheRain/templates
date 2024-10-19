import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "../ui/dialog.tsx";
import {Button} from "../ui/button.tsx";
import {TextField, TextFieldInput, TextFieldLabel} from "../ui/text-field.tsx";

export default function SendEmailDialog(props: { value: string, onChange: (e) => string, onClick: () => void }) {
    return <Dialog>
        <DialogTrigger as={Button<"button">} class={"w-full"}>Send By Email</DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Send invoice by mail</DialogTitle>
            </DialogHeader>
            <div class="grid gap-4 py-4">
                <TextField>
                    <TextFieldLabel style={{"font-size": "14px"}} for="email">Recipient</TextFieldLabel>
                    <TextFieldInput value={props.value} id={"email"}
                                    class="col-span-3" type="email" onChange={props.onChange}
                    />
                </TextField>
            </div>
            <DialogFooter>
                <Button type="submit" class={"w-full"} onClick={props.onClick}>Send by mail</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
}
