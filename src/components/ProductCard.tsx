import { useNavigate } from "react-router";
import Rating from "./Rating";

type ProductCardProps = {
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail?: string;
};

export default function ProductCard({
    id,
    title,
    price,
    rating,
    thumbnail,
}: ProductCardProps) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/products/${id}`)}
            className="cursor-pointer rounded-xl border border-gray-200 p-4 transition-shadow hover:shadow-card bg-white min-h-100 flex flex-col justify-between"
        >
            {/* Image */}
            <div className="mb-4 h-60 rounded-lg bg-gray-100 overflow-hidden">
                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt={title}
                        className="h-full w-full object-cover"
                    />
                )}
            </div>

            <div>
                {/* Title */}
                <h3 className="mb-1 text-sm font-medium">{title}</h3>

                {/* Rating */}
                <div className="flex">
                    <Rating value={rating} />
                    <span className="ml-1 text-gray-500 text-xs">
                        ({rating})
                    </span>
                </div>
            </div>

            {/* Price */}
            <p className="mt-2 text-lg font-semibold">${price}</p>
        </div>
    );
}
