import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ProductInfo from "../components/ProductInfo";
import ProductAccordion from "../components/ProductAccordion";
import Rating from "../components/Rating";

export type Review = {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
};

export type Product = {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating: number;
    stock: number;
    brand: string;
    sku: string;
    weight: number;
    availabilityStatus: string;
    warrantyInformation: string;
    shippingInformation: string;
    returnPolicy: string;
    tags: string[];
    dimensions: {
        width: number;
        height: number;
        depth: number;
    };
    reviews: Review[];
    images: string[];
    thumbnail: string;
};

export default function ProductDetails() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${id}`)
            .then((res) => res.json())
            .then(setProduct)
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                Loading...
            </div>
        );
    }

    if (!product) {
        return <div className="text-center py-20">Product not found</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Back */}
            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-sm text-gray-500 hover:text-black"
            >
                ← Back to Products
            </button>

            {/* Top Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Image */}
                <div className="bg-gray-100 rounded-xl p-6">
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-full h-[420px] object-cover rounded-lg"
                    />
                </div>

                {/* Right Info */}
                <ProductInfo product={product} />
            </div>

            {/* Accordion */}
            <ProductAccordion product={product} />

            {/* Reviews */}
            <div className="mt-12">
                <h2 className="text-sm font-medium mb-4">Customer Reviews</h2>

                <div className="space-y-4">
                    {product.reviews.map((review, index) => (
                        <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between">
                                <div>
                                    <p className="font-medium">
                                        {review.reviewerName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {review.reviewerEmail}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <Rating value={review.rating} />
                                    <p className="text-xs text-gray-400">
                                        {new Date(
                                            review.date
                                        ).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <p className="mt-2 text-sm text-gray-600">
                                {review.comment}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
