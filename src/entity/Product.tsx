export type Product = {
    id: string,
    name: string;
    variants: Variant[];
}

export type Variant = {
    id: string,
    name: string,
    price: number,
    cogs: number,
}