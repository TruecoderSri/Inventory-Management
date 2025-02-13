import { create } from "zustand";
import toast from "react-hot-toast";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

interface CartState {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  // Load the cart from localStorage if available; otherwise, start with an empty array
  cart:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cart") || "[]")
      : [],

  addToCart: (product) =>
    set((state) => {
      const updatedCart = [...state.cart, product]; // Adds the product to the current cart
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Persist the updated cart to localStorage
      toast.success(`${product.title} added to cart!`);
      return { cart: updatedCart };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const updatedCart = state.cart.filter((product) => product.id !== id); // Remove the product by its ID
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
      toast.error("Item removed from cart.");
      return { cart: updatedCart };
    }),

  clearCart: () =>
    set(() => {
      localStorage.removeItem("cart"); // Clear localStorage for the cart
      toast("Cart cleared.", { icon: "🗑️" });
      return { cart: [] };
    }),
}));
