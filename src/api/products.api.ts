const BASE_URL = "https://dummyjson.com/products";

export type Product = {
    id: number;
    title: string;
    price: number;
    rating: number;
    thumbnail: string;
    category: string;
};

export type Category = {
    slug: string;
    name: string;
    url: string;
};

export async function fetchProducts(): Promise<Product[]> {
    const res = await fetch(`${BASE_URL}?limit=100`);
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();
    return data.products;
}

export async function fetchCategories(): Promise<Category[]> {
    const res = await fetch(`${BASE_URL}/categories`);
    if (!res.ok) throw new Error("Failed to fetch categories");
    return res.json();
}
