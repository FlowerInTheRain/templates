import './App.css'
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card"
import {Col, Grid} from "./components/ui/grid"
import {Flex} from "./components/ui/flex.tsx";
import {createSignal, onMount} from "solid-js"
import dayjs from 'dayjs';
import formatters from "./constants/formatters.ts";
import {getMockData} from "./services/FakeService.ts";
import ProductSummary from "./components/products/ProductsSummary.tsx";
import InvoiceSummary from "./components/invoices/InvoicesSummary.tsx";

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
    const [products, setProducts] = createSignal([])

    onMount(async () => {
        const res = await getMockData()
        if (res && res.status === 200) {
            setProducts(res.data)
        }
    });


    return (
        <Flex class={"app-content"}>
            <Grid cols={1} colsMd={2} colsLg={3} class="w-full gap-2">
                <Col span={1} spanLg={2}>
                    <InvoiceSummary invoices={invoices}/>
                </Col>
                <Col>
                    <ProductSummary products={products}></ProductSummary>
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