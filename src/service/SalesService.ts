import type {Paginated} from "../entity/Paginated.ts";
import type {Sales} from "../entity/Sale.ts";

const API_URL = "http://localhost:8080/miserere/api/v1/sales";

async function fetchSales(): Promise<(Paginated<Sales> | null)> {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (err) {
        console.error("Failed to fetch products:", err);
        return null;
    }
}

export {
    fetchSales,
}