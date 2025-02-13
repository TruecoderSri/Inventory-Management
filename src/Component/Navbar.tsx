import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    const { cart } = useCartStore();

    const cartItemCount = cart.length;

    return (
        <>
            <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
                {/* Main logo or title */}
                <Link href="/" className="text-lg font-semibold hover:underline">
                    Inventory Management System
                </Link>

            </nav>

            {/* Floating cart button on the top-right */}
            <Link
                href="/cart"
                className="fixed top-4 right-4 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition flex items-center"
            >
                <FaShoppingCart size={24} />
                {/*Conditionally show a (count icon) on the cart icon if item is >0 */}
                {cartItemCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {cartItemCount}
                    </span>
                )}
            </Link>
        </>
    );
}
