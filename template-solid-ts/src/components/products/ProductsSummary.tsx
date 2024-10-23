import {Card, CardContent, CardHeader, CardTitle} from "../ui/card.tsx";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "../ui/accordion.tsx";
import {For} from "solid-js";
import {FilledStarIcon, GradientStarIcon} from "../../assets/icons/SvgIcons.tsx";
import {Skeleton} from "@kobalte/core/skeleton";

export default function ProductSummary(props: { products: () => any }) {
    const displayDecimalIcon = (id: number, decimal: number) => {
        const offset = Math.round(decimal * 100)
        return GradientStarIcon(id, offset)
    }
    const iconsToPlace = (amount: number) => {
        let res = [];
        for (let i = 0; i < amount; i++) {
            res.push(FilledStarIcon());
        }
        return res;
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Products</CardTitle>
            </CardHeader>
            <CardContent>
                <Skeleton>
                    <Accordion multiple={false} collapsible>
                        <For each={props.products()} fallback={<div>Loading...</div>}>
                            {(item: any) => (
                                <div>
                                    <AccordionItem value={`item-${item.product_id}`}>
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
                                                        class={"stars-display"}>
                                                        {iconsToPlace(Math.floor(item.rating)).map(meh => {

                                                            return meh
                                                        })}
                                                        {
                                                            displayDecimalIcon(item.product_id, item.rating - Math.floor(item.rating))
                                                        }
                                                        <p class="text-sm text-muted-foreground">{item.rating} ({item.reviews.length} avis)</p>

                                                    </div>
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                </div>
                            )}
                        </For>
                    </Accordion>
                </Skeleton>
            </CardContent>
        </Card>
    );
}