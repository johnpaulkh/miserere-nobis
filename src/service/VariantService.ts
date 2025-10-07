import type {Variant} from "../entity/Product.ts";

const API_URL = "http://localhost:8080/miserere/api/v1/products/";

async function updateVariant(variant : Variant) {
    const url = `${API_URL}${variant.productId}/variants/${variant.id}`;

    const response = await fetch(url, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variant),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update variant: ${response.status} - ${errorText}`);
    }

    const updatedVariantData = await response.json();
    console.log("Variant updated successfully:", updatedVariantData);
    return updatedVariantData;
}

async function createVariant(variant: Variant) {
    const url = `${API_URL}${variant.productId}/variants`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(variant),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create variant: ${response.status} - ${errorText}`);
    }

    const createdVariantData = await response.json();
    console.log("Variant created successfully:", createdVariantData);
    return createdVariantData;
}

export {
    createVariant,
    updateVariant
}