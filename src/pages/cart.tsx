import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/router";

export default function CartPage() {
    const { cart, removeFromCart, clearCart } = useCartStore();
    const router = useRouter();

    // Closes the cart page and redirects to the home page
    const closeCartPage = () => {
        router.push("/");  // Might want to replace this with a custom back navigation later
    };

    return (
        <main className="min-h-screen bg-gray-100 p-6 relative">
            {/* Close button at the top-right corner */}
            <button
                onClick={closeCartPage}
                className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
            >
                &times;
            </button>

            <h1 className="text-4xl font-semibold text-fuchsia-950 text-center mb-6">Your Cart</h1>

            {cart.length === 0 ? (
                <p className="text-center text-gray-600">Your cart is empty!</p>
            ) : (
                <div className="space-y-4">
                    {cart.map((product) => (
                        <div
                            key={product.id}
                            className="flex justify-between items-center bg-white p-4 shadow-md rounded-lg"
                        >
                            <span>{product.title}</span>
                            <span>${product.price.toFixed(2)}</span>
                            <button
                                onClick={() => removeFromCart(product.id)}
                                className="text-red-500 hover:text-red-700"
                            >
                                Remove
                            </button>
                        </div>
                    ))}

                    {/* Clear the entire cart */}
                    <button
                        onClick={() => {
                            if (confirm("Are you sure you want to clear the cart?")) {
                                clearCart();
                            }
                        }}
                        className="w-full mt-4 bg-red-500 text-white py-2 rounded-lg"
                    >
                        Clear Cart
                    </button>
                </div>
            )}
        </main>
    );
}
