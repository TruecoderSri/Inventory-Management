import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
            <Component {...pageProps} />
        </>
    );
}
