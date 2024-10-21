import './App.css'
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card"
import {Col, Grid} from "./components/ui/grid"
import {Flex} from "./components/ui/flex.tsx";
import {createSignal, For, onMount} from "solid-js"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "./components/ui/table"
import {Button} from "./components/ui/button.tsx";
import {useNavigate} from "@solidjs/router";
import dayjs from 'dayjs';
import formatters from "./constants/formatters.ts";
import {getMockData} from "./services/FakeService.ts";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "./components/ui/accordion.tsx";
import {FilledStarIcon} from "./assets/icons/SvgIcons.tsx";
import {
    Pagination,
    PaginationEllipsis,
    PaginationItem,
    PaginationItems,
    PaginationNext,
    PaginationPrevious
} from "./components/ui/pagination.tsx";

const invoices = [
    {
        invoice: "INV001",
        paymentStatus: "Paid",
        totalAmount: "$250.00",
        paymentMethod: "Credit Card",
        date: dayjs().format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV002",
        paymentStatus: "Pending",
        totalAmount: "$150.00",
        paymentMethod: "PayPal",
        date: dayjs().format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV003",
        paymentStatus: "Unpaid",
        totalAmount: "$350.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV004",
        paymentStatus: "Paid",
        totalAmount: "$450.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(2, 'hours').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV005",
        paymentStatus: "Paid",
        totalAmount: "$550.00",
        paymentMethod: "PayPal",
        date: dayjs().subtract(2, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV006",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().subtract(4, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV007",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(6, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV008",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().subtract(8, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV009",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(10, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV010",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().subtract(12, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV011",
        paymentStatus: "Paid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(15, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV012",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().subtract(15, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV013",
        paymentStatus: "Paid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(15, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV014",
        paymentStatus: "Pending",
        totalAmount: "$200.00",
        paymentMethod: "Bank Transfer",
        date: dayjs().subtract(16, 'days').format(formatters.dateTimeNoSecondsFormat)
    },
    {
        invoice: "INV015",
        paymentStatus: "Unpaid",
        totalAmount: "$300.00",
        paymentMethod: "Credit Card",
        date: dayjs().subtract(17, 'days').format(formatters.dateTimeNoSecondsFormat)
    }
]


function Home() {
    const nav = useNavigate();
    const [products, setProducts] = createSignal([])
    const goToInvoiceDetails = (reference: string) => {
        nav(`/invoice-details/${reference}`)
    };
    onMount(async () => {
        const res = await getMockData()
        if (res && res.status === 200) {
            setProducts(res.data)
        }
    });
    const iconsToPlace = (amount: number) => {
        let res = [];
        for (let i = 0; i < amount; i++) {
            res.push(<FilledStarIcon></FilledStarIcon>);
        }
        return res;
    }
    const updateDisplayableItems = (index: number) => {
        setMaxIndex(index * 5)
    }
    const [maxIndex, setMaxIndex] = createSignal(5);
    return (
        <Flex class={"app-content"}>
            <Grid cols={1} colsMd={2} colsLg={3} class="w-full gap-2">
                <Col span={1} spanLg={2}>
                    <Card>

                        {invoices.length > 5 &&
                            <Pagination style={{}} class={"pagination"}
                                        count={Math.ceil(invoices.length / 5)}
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
                        <Table>
                            <TableCaption>A list of your recent invoices.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead class="w-[100px]">Invoice</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead class="text-right">Amount</TableHead>
                                    <TableHead class="text-center">Date</TableHead>
                                    <TableHead>Details</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <For each={invoices.slice(maxIndex() - 5, maxIndex())}>
                                    {(invoice) => (
                                        <TableRow>
                                            <TableCell class="font-medium">{invoice.invoice}</TableCell>
                                            <TableCell
                                                class={invoice.paymentStatus === 'Paid' ? 'ok-status' : invoice.paymentStatus === 'Pending' ? 'waiting-status' : "ko-status"}>{invoice.paymentStatus}</TableCell>
                                            <TableCell>{invoice.paymentMethod}</TableCell>
                                            <TableCell class="text-right">{invoice.totalAmount}</TableCell>
                                            <TableCell class="text-center">{invoice.date}</TableCell>
                                            <TableCell>
                                                <Button variant="outline"
                                                        class={"invoice-details-button"}
                                                        onClick={
                                                            () => goToInvoiceDetails(invoice.invoice)
                                                        }>Invoice details</Button>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </For>
                            </TableBody>
                            <TableFooter class={"table-footer"}>
                                <TableRow>
                                    <TableCell colSpan={6}>
                                    </TableCell>
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Card>

                </Col>
                <Col>

                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Accordion multiple={false} collapsible>
                                <For each={products()} fallback={<div>Loading...</div>}>
                                    {(item: any, index) => (
                                        <div>
                                            <AccordionItem value={`item-${index}`}>
                                                <AccordionTrigger>{item.name} </AccordionTrigger>
                                                <AccordionContent>
                                                    <div
                                                        class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                        <div class="space-y-1">
                                                            <p class="text-sm font-medium leading-none">{item.brand}</p>
                                                            <p class="text-sm text-muted-foreground">Marque</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                        <div class="space-y-1">
                                                            <p>{item.description}</p>
                                                            <p class="text-sm text-muted-foreground">Description</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                        <div class="space-y-1">
                                                            <p>{item.price} €</p>
                                                            <p class="text-sm text-muted-foreground">Prix</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                        <div class="space-y-1">
                                                            <p>{item.category}</p>
                                                            <p class="text-sm text-muted-foreground">Catégorie</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        class="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                                                        <div class="space-y-1">
                                                            <div
                                                                class={"stars-display"}>{iconsToPlace(Math.floor(item.rating)).map(meh => meh)}</div>
                                                            <p class="text-sm text-muted-foreground">Note moyenne des
                                                                utilisateurs</p>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </div>
                                    )}
                                </For>
                            </Accordion>
                        </CardContent>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <CardHeader>
                            <CardTitle>Title</CardTitle>
                        </CardHeader>
                        <CardContent>KPI 3</CardContent>
                    </Card>
                </Col>
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    <CardContent>KPI 4</CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    <CardContent>KPI 5</CardContent>
                </Card>
            </Grid>
        </Flex>
    )
}

export default Home