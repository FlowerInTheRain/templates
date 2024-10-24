import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems, PaginationNext,
    PaginationPrevious
} from "../ui/pagination.tsx";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table.tsx";
import {createMemo, createSignal, For} from "solid-js";
import {Button} from "../ui/button.tsx";
import {Card} from "../ui/card.tsx";
import {useNavigate} from "@solidjs/router";

export default function InvoiceSummary(props: {invoices: any}){
    const nav = useNavigate();
    const [maxIndex, setMaxIndex] = createSignal(5);
    const pagesAmount = createMemo(() => {
        return Math.ceil(props.invoices.length / 5)
    })

    const updateDisplayableItems = (index: number) => {
        setMaxIndex(index * 5)
    }
    const goToInvoiceDetails = (invoice: any) => {
        nav(`/invoice-details/${invoice.invoice}`, {state: invoice})
    };
    return (
        <Card>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead class="w-[100px]">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead class="text-right">Amount</TableHead>
                        <TableHead class="text-right">Details</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <For each={props.invoices.slice(maxIndex() - 5, maxIndex())}>
                        {(invoice) => (
                            <TableRow>
                                <TableCell class="font-medium">{invoice.invoice}</TableCell>
                                <TableCell
                                    class={`${invoice.paymentStatus.toLowerCase()}-status`}>{invoice.paymentStatus}</TableCell>
                                <TableCell class="text-right">{invoice.totalAmount}</TableCell>
                                <TableCell class="text-right">
                                    <Button variant="outline"
                                            class={"invoice-details-button"}
                                            onClick={
                                                () => goToInvoiceDetails(invoice)
                                            }>Invoice details</Button>
                                </TableCell>
                            </TableRow>
                        )}
                    </For>
                </TableBody>
                <TableFooter class={"table-footer"}>
                    <TableRow>
                        <TableCell colSpan={6}>
                            {props.invoices.length > 5 &&
                                <Pagination class={"pagination"}
                                            count={pagesAmount()}
                                            fixedItems
                                            onPageChange={updateDisplayableItems}
                                            itemComponent={(props) => <PaginationItem
                                                page={props.page}>{props.page}</PaginationItem>}
                                            ellipsisComponent={() => <PaginationEllipsis/>}
                                >
                                    <PaginationPrevious/>
                                    <PaginationItems/>
                                    <PaginationNext/>
                                </Pagination>
                            }
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </Card>
    );
}