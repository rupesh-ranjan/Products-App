import Rating from "./Rating";
import checkIcon from "../icons/check.svg";
import boxIcon from "../icons/box.svg";
import truckIcon from "../icons/truck.svg";
import secureIcon from "../icons/secure-payments.svg";
import { type Product } from "../pages/ProductDetails";
// import boxIcon from "../icons/box.svg";

type Props = {
    product: Product;
    dimensions: { width: number; height: number; depth: number };
};

export default function ProductInfo({ product }: Props) {
    return (
        <div>
            {/* Badges */}
            <div className="flex gap-2 mb-2">
                <span className="px-2 py-1 text-xs rounded bg-gray-100 capitalize">
                    {product.category}
                </span>

                <span className="px-2 py-1 text-xs rounded bg-black text-white flex items-center gap-1">
                    <img src={checkIcon} alt="check" className="h-3 w-3" />
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
                    <span>{product.stock} units</span>
                </div>

                <div>
                    <p className="font-medium text-gray-900">Weight</p>
                    <p>{product.weight}g</p>
                </div>

                <div>
                    <p className="font-medium text-gray-900">Dimensions</p>
                    <p>
                        {`${Math.round(
                            product.dimensions.width
                        )} X ${Math.round(
                            product.dimensions.height
                        )} X ${Math.round(product.dimensions.depth)}`}{" "}
                        cm
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

            <button className="w-full h-12 rounded-lg bg-black text-white mb-4 flex items-center justify-center gap-2">
                <img src={boxIcon} alt="box" className="h-4 w-4" />
                Order Now
            </button>

            {/* Shipping */}
            <div className="flex gap-6 text-sm text-gray-500">
                <span className="flex items-center gap-2">
                    <img src={truckIcon} alt="truck" className="h-4 w-4" />
                    Fast Shipping
                </span>

                <span className="flex items-center gap-2">
                    <img src={secureIcon} alt="secure" className="h-4 w-4" />
                    Secure Payment
                </span>
            </div>
        </div>
    );
}
