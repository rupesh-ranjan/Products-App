import { useState } from "react";
import { type Product } from "../pages/ProductDetails";

type Props = {
    product: Product;
};

export default function ProductAccordion({ product }: Props) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const items = [
        {
            title: "Warranty Information",
            content: product.warrantyInformation,
        },
        {
            title: "Shipping Information",
            content: product.shippingInformation,
        },
        {
            title: "Return Policy",
            content: product.returnPolicy,
        },
    ];

    return (
        <div className="mt-12 border-t">
            <h2 className="text-sm font-medium my-4">Additional Information</h2>

            {items.map((item, index) => (
                <div key={item.title} className="border-b py-4">
                    <button
                        onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                        className="w-full flex justify-between text-sm font-medium"
                    >
                        {item.title}
                        <span>{openIndex === index ? "−" : "+"}</span>
                    </button>

                    {openIndex === index && (
                        <p className="mt-2 text-sm text-gray-600">
                            {item.content}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}
