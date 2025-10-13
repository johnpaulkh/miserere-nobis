import type {Product} from "../entity/Product.ts";
import type {Paginated} from "../entity/Paginated.ts";

const API_URL = "http://localhost:8080/miserere/api/v1/products";

async function fetchProducts(): Promise<(Paginated<Product> | null)> {
    try {
        const response = await fetch(API_URL);
        return await response.json();
    } catch (err) {
        // Handle network errors or the error thrown above
        console.error("Failed to fetch products:", err);
        return null;
    }
}

async function createProduct(product: Product): Promise<Product> {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create product: ${response.status} - ${errorText}`);
    }

    const createdProductData = await response.json();
    console.log("Product created successfully:", createdProductData);
    return createdProductData;
}

async function updateProduct(product: Product): Promise<Product> {
    const response = await fetch(`${API_URL}/${product.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update product: ${response.status} - ${errorText}`);
    }

    const updatedProductData = await response.json();
    console.log("Product updated successfully:", updatedProductData);
    return updatedProductData;
}

export {
    fetchProducts,
    createProduct,
    updateProduct,
}