import {Form} from "react-bootstrap";
import type {Product} from "../entity/Product.ts";

type ProductSelectProps = {
    products: Product[],
    productId: string,
    onChange: (e) => void,
}

export default function ProductSelect({products, productId, onChange}: ProductSelectProps) {
    return (
        <Form.Group className="mb-3">
            <Form.Select
                name="productId"
                value={productId}
                onChange={onChange}
                disabled={products.length === 0}
            >
                <option value="">-- Pilih Produk --</option>
                {products.map((product) => (
                    <option key={product.id} value={product.id ?? ""}>
                        {product.name}
                    </option>
                ))}
            </Form.Select>
        </Form.Group>
    );
}