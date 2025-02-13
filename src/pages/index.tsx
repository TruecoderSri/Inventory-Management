import { useEffect, useState } from "react";
import ProductCard from "@/Component/ProductCard";
import Navbar from "@/Component/Navbar";
import Pagination from "@mui/material/Pagination";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    stock: number;
    sku: string;
    discountPercentage: number;
    thumbnail: string;
    shippingInformation: string;
    warrantyInformation: string;
}

export default function ProductListPage() {
    const [productList, setProductList] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [isMounted, setIsMounted] = useState(false); // Keeping track of mount status to avoid server-side rendering issues

    useEffect(() => {
        setIsMounted(true);  // Ensures we only show the page once it's mounted on the client

        const fetchProducts = async () => {
            setIsLoading(true); // Reset loading state for every request
            try {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}?limit=9&skip=${(currentPage - 1) * 9}`
                );

                const data = await response.json();

                setProductList(data.products);
                setTotalItems(data.total);
            } catch (error) {
                console.error("Failed to fetch products:", error);  // Helpful for debugging in case of API failure
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts(); // Load products when currentPage changes
    }, [currentPage]);

    // Handle page change from the pagination component
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    // Prevent rendering during server-side phase
    if (!isMounted) return null;

    return (
        <div>
            <Navbar />

            <main className="min-h-screen bg-gray-100 p-6">
                <h1 className="text-4xl font-semibold text-fuchsia-950 text-center mb-6">
                    Products Collection
                </h1>

                {isLoading ? (
                    <p className="text-center text-gray-600">Loading products... Hang tight!</p>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {productList.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        {/* Pagination Component */}
                        <div className="flex justify-center mt-6">
                            <Pagination
                                count={Math.ceil(totalItems / 9)}
                                page={currentPage}
                                onChange={handlePageChange}
                                color="primary"
                            />
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
