import Head from "next/head";
import type { AppProps } from "next/app";
import { useRouter } from "next/router"; // Hook to get current route
import Navbar from "../components/layout/Navbar"; // Custom Navbar component
import Footer from "../components/layout/Footer"; // Custom Footer component
import { AuthProvider } from "@/context/AuthContext"; // Context provider for authentication
import { ThemeProvider } from "@/context/ThemeContext"; // Theme provider for Light, Dark, and Sepia
import "../styles/globals.css"; // Global Tailwind / CSS styles
import { Toaster } from "react-hot-toast"; // Toast notification library
import { GoogleOAuthProvider } from "@react-oauth/google"; // "Continue with Google" support

/**
 * AppLayout Component
 * Wraps every page with Navbar, Footer, and styling
 */
function AppLayout({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Define routes where we DO NOT want to show the navbar/footer
  const noNavbarRoutes = ["/login", "/signup"];
  const showNavbar = !noNavbarRoutes.includes(router.pathname); // Boolean flag

  return (
    // Main layout container
    <div className="min-h-screen flex flex-col bg-[var(--bg-page)] text-[var(--text-primary)] font-sans antialiased transition-colors duration-200">
      <Head>
        <title>SmartPrep AI - High Retention EdTech Platform</title>
        <meta name="description" content="Personalized AI-powered prep suite for +2 Science students and entrance exam candidates." />
        <link rel="icon" href="/logo.png" type="image/png" />
      </Head>
      {/* Render Navbar only on allowed routes */}
      {showNavbar && <Navbar />}

      {/* Main content area between navbar and footer */}
      <main className="flex-1 w-full">
        {/* Render the current page/component */}
        <Component {...pageProps} />
      </main>

      {/* Render Footer only on allowed routes */}
      {showNavbar && <Footer />}
    </div>
  );
}

/**
 * MyApp Component
 * The root component of Next.js that wraps all pages
 */
export default function MyApp(props: AppProps) {
  return (
    // GoogleOAuthProvider enables the "Continue with Google" button on login/signup
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <ThemeProvider>
        {/* AuthProvider gives access to authentication context for all pages */}
        <AuthProvider>
          {/* AppLayout provides consistent layout with navbar/footer */}
          <AppLayout {...props} />

        {/* Toast notifications container */}
        <Toaster
          position="top-right"
          gutter={10}
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#0f172a",
              border: "1px solid rgba(226, 232, 240, 0.8)",
              boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
              borderRadius: "14px",
              padding: "12px 16px",
              fontSize: "13.5px",
              fontWeight: 500,
            },
          }}
        />
        </AuthProvider>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}
