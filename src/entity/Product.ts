export type Product = {
    id: string | null,
    name: string;
    adminFeePercentage: number;
    variants: Variant[];
}

export type Variant = {
    id: string | null,
    productId: string | null,
    name: string,
    price: number,
    cogs: number,
}