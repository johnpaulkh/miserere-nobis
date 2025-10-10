import {Form} from "react-bootstrap";
import type {Product, Variant} from "../entity/Product.ts";

type VariantSelectProps = {
    products: Product[],
    productId: string,
    variantId: string,
    onChange: (e) => void,
}

export default function VariantSelect({products, productId, variantId, onChange}: VariantSelectProps) {
    const variants: Variant[] = products
        .filter((p) => p.id === productId)
        .flatMap((p) => p.variants)

    return (
        <Form.Group className="mb-3">
            <Form.Select
                name="variantId"
                value={variantId}
                onChange={onChange}
                disabled={variants.length === 0}
            >
                <option value="">-- Pilih Variant --</option>
                {variants.map((variant) => (
                    <option key={variant.id} value={variant.id ?? ""}>
                        {variant.name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}