import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import Pagination from "../components/Pagination";
import {
    fetchCategories,
    type Product,
    type Category,
} from "../api/products.api";
import searchIcon from "../icons/search.svg";
import settingsIcon from "../icons/settings.svg";

const LIMIT = 8;

export default function Products() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sort, setSort] = useState("default");

    useEffect(() => {
        try {
            setLoading(true);

            const skip = (page - 1) * LIMIT;
            let url = `https://dummyjson.com/products?limit=${LIMIT}&skip=${skip}`;

            if (search) {
                url = `https://dummyjson.com/products/search?q=${search}&limit=${LIMIT}&skip=${skip}`;
            } else if (selectedCategory !== "all") {
                url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${LIMIT}&skip=${skip}`;
            }

            fetch(url)
                .then((res) => res.json())
                .then((data) => {
                    setProducts(data.products);
                    setTotal(data.total);
                });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }, [page, search, selectedCategory]);

    useEffect(() => {
        fetchCategories().then(setCategories);
    }, []);

    const sortedProducts = [...products].sort((a, b) => {
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

    const totalPages = Math.ceil(total / LIMIT);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[60vh]">
                Loading products...
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Header */}
            <div className="mb-6 px-2 py-4">
                {" "}
                {/*border will see*/}
                <h1 className="text-2xl font-semibold">Product Catalog</h1>
                <p className="text-gray-500 text-sm">
                    Discover our wide selection of quality products
                </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1 border-0 bg-gray-200 rounded-lg">
                    <img
                        src={searchIcon}
                        alt="search"
                        className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50"
                    />
                    <input
                        type="text"
                        placeholder="Search products..."
                        name="search input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-11 pl-10 pr-4 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    />
                </div>

                {/* Category */}
                <div className="flex items-center h-11 gap-2 px-4 border-0 bg-gray-200 rounded-lg">
                    <img
                        src={settingsIcon}
                        alt="categories"
                        className="h-4 w-4 opacity-60"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-transparent outline-none px-3 text-sm cursor-pointer"
                    >
                        <option value="all" className="flex-1">
                            All Categories
                        </option>
                        {categories.map((category) => (
                            <option key={category.slug} value={category.slug}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    name="sort"
                    className="h-11 px-3 text-sm border-0 bg-gray-200 rounded-lg"
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
                Showing {(page - 1) * LIMIT + 1}–{Math.min(page * LIMIT, total)}{" "}
                of {total} products
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

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
            />
        </div>
    );
}
