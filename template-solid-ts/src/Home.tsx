import './App.css'
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card"
import {Col, Grid} from "./components/ui/grid"
import {Flex} from "./components/ui/flex.tsx";
import {For} from "solid-js"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./components/ui/table"
import {Button} from "./components/ui/button.tsx";
import {useNavigate} from "@solidjs/router";
import dayjs from 'dayjs';

import formatters from "./constants/formatters.ts";
const format ="YYYY-MM-DD HH:mm";
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
        date: dayjs().subtract(6, 'days').format(format)


    }
]



function Home() {
    const nav = useNavigate();

    const goToInvoiceDetails = (reference: string) => {
        nav(`/invoice-details/${reference}` )
    };

    return (
        <Flex class={"app-content"}>
            <Grid cols={1} colsMd={2} colsLg={3} class="w-full gap-2">
                <Col span={1} spanLg={2}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Latest invoices</CardTitle>
                        </CardHeader>
                        <CardContent>
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
                                    <For each={invoices}>
                                        {(invoice) => (
                                            <TableRow>
                                                <TableCell class="font-medium">{invoice.invoice}</TableCell>
                                                <TableCell
                                                    class={invoice.paymentStatus === 'Paid' ? 'ok-status' : invoice.paymentStatus === 'Pending' ? 'waiting-status' : "ko-status"}>{invoice.paymentStatus}</TableCell>
                                                <TableCell>{invoice.paymentMethod}</TableCell>
                                                <TableCell class="text-right">{invoice.totalAmount}</TableCell>
                                                <TableCell class="text-center">{invoice.date}</TableCell>

                                                <TableCell>
                                                    <Button variant="outline" onClick={
                                                        () => goToInvoiceDetails(invoice.invoice)
                                                    }>Invoice details</Button>
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </For>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </Col>
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                    </CardHeader>
                    <CardContent>KPI 2</CardContent>
                </Card>
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