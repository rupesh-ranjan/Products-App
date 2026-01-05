import { useState } from "react";
import chevronIcon from "../icons/chevron.svg";
import type { Product } from "../pages/ProductDetails";

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
        <div className="mt-12">
            <h2 className="text-sm font-medium my-4">Additional Information</h2>

            {items.map((item, index) => (
                <div key={item.title} className=" py-4">
                    <button
                        onClick={() =>
                            setOpenIndex(openIndex === index ? null : index)
                        }
                        className="w-full flex justify-between items-center text-sm font-medium"
                    >
                        {item.title}
                        <img
                            src={chevronIcon}
                            alt="chevron"
                            className={`h-4 w-4 transition-transform ${
                                openIndex === index ? "rotate-180" : ""
                            }`}
                        />
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
