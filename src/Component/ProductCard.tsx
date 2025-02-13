import { FC } from "react";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";

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

const ProductCard: FC<{ product: Product }> = ({ product }) => {
    const { addToCart } = useCartStore();

    const handleAddToCart = () => {
        addToCart(product);

    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-md rounded-lg p-4 transition hover:shadow-lg"
        >
            {/* Product Thumbnail */}
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
            />

            {/* Product Title */}
            <h2 className="mt-4 text-lg font-semibold text-gray-800">{product.title}</h2>

            {/* Shortened description if it's too long (for better layout) */}
            <p className="text-gray-600 text-sm">
                {product.description.length > 100
                    ? product.description.slice(0, 100) + "..."
                    : product.description}
            </p>

            {/* Product Details */}
            <div className="mt-2 text-sm text-gray-500">
                <p>
                    <strong>Category:</strong> {product.category}
                </p>
                <p>
                    <strong>Rating:</strong> {product.rating} ⭐
                </p>
                <p>
                    <strong>Stock:</strong> {product.stock > 0 ? `${product.stock} items available` : "Out of stock"}
                </p>
                <p>
                    <strong>SKU:</strong> {product.sku}
                </p>
                {product.discountPercentage > 0 && (
                    <p>
                        <strong>Discount:</strong> {product.discountPercentage}% off
                    </p>
                )}
                <p>
                    <strong>Shipping Info:</strong> {product.shippingInformation}
                </p>
                <p>
                    <strong>Warranty:</strong> {product.warrantyInformation}
                </p>
            </div>

            {/* Price and Add to Cart Button */}
            <div className="mt-4 flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                    ${product.price.toFixed(2)}
                </p>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleAddToCart}
                    className="mt-3 w-32 bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-700 transition"
                >
                    Add to Cart
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ProductCard;
