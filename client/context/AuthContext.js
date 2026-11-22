"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser, registerUser, googleLogin, githubLogin, sendOtp, verifyOtp, getCurrentUser, logoutUser } from "../services/auth";

const STORAGE_KEY = "smartprep_user";

// ---------------------------
// Auth context
// ---------------------------
const AuthContext = createContext({
  user: null,            // current logged-in user object
  loading: true,         // whether auth state is being initialized
  login: async () => {}, // login function
  loginWithGoogle: async () => {}, // "Continue with Google" function
  loginWithGithub: async () => {}, // "Continue with GitHub" function
  requestOtp: async () => {},      // Request 6-digit OTP code
  loginWithOtp: async () => {},    // Verify OTP and log in
  register: async () => {}, // registration function
  logout: async () => {}, // logout function
  authModalOpen: false,
  authModalMode: "signin", // "signin" | "signup"
  openAuthModal: (mode = "signin") => {},
  closeAuthModal: () => {},
  setAuthModalMode: (mode = "signin") => {},
});

// Custom hook to access AuthContext easily
export const useAuth = () => useContext(AuthContext);

// ---------------------------
// Auth provider component
// ---------------------------
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("signin");
  const router = useRouter();
  const revalidateSeqRef = useRef(0);
  const loginReqSeqRef = useRef(0);

  const openAuthModal = (mode = "signin") => {
    setAuthModalMode(mode === "signup" ? "signup" : "signin");
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // On mount, restore cached user from sessionStorage immediately (0ms) and revalidate with server
  useEffect(() => {
    let initialUser = null;
    try {
      // Clean up legacy localStorage if present from prior versions
      if (typeof window !== "undefined") {
        localStorage.removeItem(STORAGE_KEY);
      }

      const cached = sessionStorage.getItem(STORAGE_KEY);
      if (cached) {
        initialUser = JSON.parse(cached);
        setUser(initialUser);
      }
    } catch (error) {
      console.error("Error reading cached user:", error);
    } finally {
      // Auth state is immediately available for UI/Navbar
      setLoading(false);
    }

    // Revalidate session in background (stale-while-revalidate pattern)
    revalidateUser(initialUser);
  }, []);

  // ---------------------------
  // Background Session Verification
  // ---------------------------
  const revalidateUser = async (cachedUser) => {
    const currentSeq = ++revalidateSeqRef.current;
    try {
      const data = await getCurrentUser();
      if (currentSeq !== revalidateSeqRef.current) {
        return; // Ignore stale validation result
      }
      if (data.success && data.user) {
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
      } else if (data.status === 401) {
        // Explicitly unauthorized / session expired
        setUser(null);
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
      } else if (!cachedUser && !data.success) {
        setUser(null);
      }
      // If data.isTimeout is true (backend waking up) and we have cachedUser,
      // keep cachedUser so UI doesn't flicker or kick the user out prematurely.
    } catch (error) {
      console.error("Error checking auth:", error);
      if (currentSeq === revalidateSeqRef.current && !cachedUser) {
        setUser(null);
      }
    }
  };

  // ---------------------------
  // Login
  // ---------------------------
  const login = async (credentials) => {
    const currentSeq = ++loginReqSeqRef.current;
    try {
      const data = await loginUser(credentials);
      if (currentSeq !== loginReqSeqRef.current) {
        return { success: false, message: "Request cancelled." };
      }
      if (data.success) {
        revalidateSeqRef.current += 1;
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
        setLoading(false);
        setAuthModalOpen(false);
        router.push("/dashboard");
        return { success: true };
      }
      // Failed login preserves in-flight session revalidation
      return { success: false, message: data.message };
    } catch (error) {
      if (currentSeq !== loginReqSeqRef.current) return { success: false, message: "Request cancelled." };
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  // ---------------------------
  // Continue with Google
  // ---------------------------
  const loginWithGoogle = async (credential) => {
    const currentSeq = ++loginReqSeqRef.current;
    try {
      const data = await googleLogin(credential);
      if (currentSeq !== loginReqSeqRef.current) {
        return { success: false, message: "Request cancelled." };
      }
      if (data.success) {
        revalidateSeqRef.current += 1;
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
        setLoading(false);
        setAuthModalOpen(false);
        router.push("/dashboard");
        return { success: true };
      }
      // Failed login preserves in-flight session revalidation
      return { success: false, message: data.message };
    } catch (error) {
      if (currentSeq !== loginReqSeqRef.current) return { success: false, message: "Request cancelled." };
      return { success: false, message: "Google sign-in failed. Please try again." };
    }
  };

  // ---------------------------
  // Continue with GitHub
  // ---------------------------
  const loginWithGithub = async (code) => {
    const currentSeq = ++loginReqSeqRef.current;
    try {
      const data = await githubLogin(code);
      if (currentSeq !== loginReqSeqRef.current) {
        return { success: false, message: "Request cancelled." };
      }
      if (data.success) {
        revalidateSeqRef.current += 1;
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
        setLoading(false);
        setAuthModalOpen(false);
        router.push("/dashboard");
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      if (currentSeq !== loginReqSeqRef.current) return { success: false, message: "Request cancelled." };
      return { success: false, message: "GitHub sign-in failed. Please try again." };
    }
  };

  // ---------------------------
  // Request Email OTP
  // ---------------------------
  const requestOtp = async (email) => {
    try {
      const data = await sendOtp(email);
      return data;
    } catch (error) {
      return { success: false, message: "Failed to send verification code. Please try again." };
    }
  };

  // ---------------------------
  // Verify Email OTP & Login
  // ---------------------------
  const loginWithOtp = async (email, otp) => {
    const currentSeq = ++loginReqSeqRef.current;
    try {
      const data = await verifyOtp(email, otp);
      if (currentSeq !== loginReqSeqRef.current) {
        return { success: false, message: "Request cancelled." };
      }
      if (data.success) {
        revalidateSeqRef.current += 1;
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
        setLoading(false);
        setAuthModalOpen(false);
        router.push("/dashboard");
        return { success: true };
      }
      return { success: false, message: data.message };
    } catch (error) {
      if (currentSeq !== loginReqSeqRef.current) return { success: false, message: "Request cancelled." };
      return { success: false, message: "Verification failed. Please try again." };
    }
  };

  // ---------------------------
  // Register
  // ---------------------------
  const register = async (userData) => {
    const currentSeq = ++loginReqSeqRef.current;
    try {
      const data = await registerUser(userData);
      if (currentSeq !== loginReqSeqRef.current) {
        return { success: false, message: "Request cancelled." };
      }
      if (data.success) {
        revalidateSeqRef.current += 1;
        setUser(data.user);
        try {
          sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        } catch (e) {}
        setLoading(false);
        setAuthModalOpen(false);
        router.push("/dashboard");
        return { success: true };
      }
      // Failed registration preserves in-flight session revalidation
      return { success: false, message: data.message };
    } catch (error) {
      if (currentSeq !== loginReqSeqRef.current) return { success: false, message: "Request cancelled." };
      return { success: false, message: "Registration failed. Please try again." };
    }
  };

  // ---------------------------
  // Logout
  // ---------------------------
  const logout = async () => {
    const currentSeq = ++loginReqSeqRef.current;
    revalidateSeqRef.current += 1;
    try {
      // Attempt server logout first
      await logoutUser();
    } catch (error) {
      console.error("Server logout error:", error);
    } finally {
      // Clear local state even if server logout fails so user is not stuck
      if (currentSeq === loginReqSeqRef.current) {
        try {
          sessionStorage.removeItem(STORAGE_KEY);
        } catch (e) {}
        setUser(null);
        setLoading(false);
        router.push("/login");
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        loginWithGithub,
        requestOtp,
        loginWithOtp,
        register,
        logout,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        setAuthModalMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};