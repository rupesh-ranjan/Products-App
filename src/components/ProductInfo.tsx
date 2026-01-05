import Rating from "./Rating";
import { type Product } from "../pages/ProductDetails";

type Props = {
    product: Product;
};

export default function ProductInfo({ product }: Props) {
    return (
        <div>
            {/* Badges */}
            <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 text-xs rounded bg-gray-100 capitalize">
                    {product.category}
                </span>
                <span className="px-2 py-1 text-xs rounded bg-black text-white">
                    {product.availabilityStatus}
                </span>
            </div>

            <h1 className="text-2xl font-semibold mb-2">{product.title}</h1>

            <p className="text-gray-600 mb-3">{product.description}</p>

            <Rating value={product.rating} />

            <p className="text-3xl font-bold my-4">${product.price}</p>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600 mb-6">
                <div>
                    <p className="font-medium text-gray-900">Brand</p>
                    <p>{product.brand}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">SKU</p>
                    <p>{product.sku}</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">Stock</p>
                    <p>{product.stock} units</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">Weight</p>
                    <p>{product.weight}g</p>
                </div>
                <div>
                    <p className="font-medium text-gray-900">Dimensions</p>
                    <p>
                        {product.dimensions.width} × {product.dimensions.height}{" "}
                        × {product.dimensions.depth} cm
                    </p>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
                {product.tags.map((tag) => (
                    <span
                        key={tag}
                        className="px-3 py-1 text-xs border rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <button className="w-full h-12 rounded-lg bg-black text-white mb-4">
                Order Now
            </button>

            <div className="flex gap-6 text-sm text-gray-500">
                <span>🚚 Fast Shipping</span>
                <span>🔒 Secure Payment</span>
            </div>
        </div>
    );
}
