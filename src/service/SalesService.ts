import type {Paginated} from "../entity/Paginated.ts";
import type {Sales} from "../entity/Sale.ts";
import {apiDateFormat} from "../utils/DateFormatter.ts";

const API_URL = "http://localhost:8080/miserere/api/v1/sales";

export type SalesCreateRequest = {
    date: string,
    customer: string,
    address: string,
    logistic: string,
    details: SalesDetailCreateRequest[],
}

export type SalesDetailCreateRequest = {
    productId: string,
    variantId: string,
    quantity: number,
    price: number,
    cogs: number,
}

async function fetchSales(startDate: Date, endDate: Date): Promise<(Paginated<Sales> | null)> {
    try {
        const params = new URLSearchParams();
        if (startDate) params.append('startDate', apiDateFormat(startDate));
        if (endDate) params.append('endDate', apiDateFormat(endDate));


        const response = await fetch(`${API_URL}?${params.toString()}`);
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return null;
    }
}

async function createSales(request: SalesCreateRequest) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
    }

    const createdProductData = await response.json();
    console.log("Product created successfully:", createdProductData);
    return createdProductData;
}

export {
    fetchSales,
    createSales
};
