import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import {
    fetchProducts,
    fetchCategories,
    type Product,
    type Category,
} from "../api/products.api";

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sort, setSort] = useState("default");

    useEffect(() => {
        Promise.all([fetchProducts(), fetchCategories()])
            .then(([productsData, categoriesData]) => {
                setProducts(productsData);
                setCategories(categoriesData);
            })
            .finally(() => setLoading(false));
    }, []);

    // 🔍 Search + Category filter
    const filteredProducts = products
        .filter((product) =>
            product.title.toLowerCase().includes(search.toLowerCase())
        )
        .filter((product) =>
            selectedCategory === "all"
                ? true
                : product.category === selectedCategory
        );

    // 🔃 Sorting
    const sortedProducts = [...filteredProducts].sort((a, b) => {
        switch (sort) {
            case "price-asc":
                return a.price - b.price;
            case "price-desc":
                return b.price - a.price;
            case "newest":
                return b.id - a.id;
            case "oldest":
                return a.id - b.id;
            default:
                return 0;
        }
    });

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                <p className="text-gray-500">Loading products...</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-6">
                <h1 className="text-2xl font-semibold">Product Catalog</h1>
                <p className="text-gray-500 text-sm">
                    Discover our wide selection of quality products
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {/* Search */}
                <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="flex-1 h-11 rounded-lg border border-gray-200 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                />

                {/* Category */}
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                >
                    <option value="all">All Categories</option>
                    {categories.map((category) => (
                        <option key={category.slug} value={category.slug}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="h-11 rounded-lg border border-gray-200 px-3 text-sm"
                >
                    <option value="default">Sort</option>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
            </div>

            {/* Result count */}
            <p className="text-sm text-gray-500 mb-6">
                Showing {sortedProducts.length} products
            </p>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        price={product.price}
                        rating={product.rating}
                        thumbnail={product.thumbnail}
                    />
                ))}
            </div>

            {/* Empty State */}
            {sortedProducts.length === 0 && (
                <p className="text-center text-gray-500 mt-10">
                    No products found.
                </p>
            )}
        </div>
    );
}
