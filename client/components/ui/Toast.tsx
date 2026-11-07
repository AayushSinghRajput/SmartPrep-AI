import toast from "react-hot-toast";

/**
 * SmartPrep AI - Light Theme Toast Helpers
 */

export const showToast = {
  success: (message: string) => {
    return toast.success(message, {
      style: {
        border: "1px solid #a7f3d0",
        background: "#ffffff",
        color: "#0f172a",
      },
      iconTheme: {
        primary: "#10b981",
        secondary: "#ffffff",
      },
    });
  },

  error: (message: string) => {
    return toast.error(message, {
      style: {
        border: "1px solid #fecaca",
        background: "#ffffff",
        color: "#0f172a",
      },
      iconTheme: {
        primary: "#ef4444",
        secondary: "#ffffff",
      },
    });
  },

  info: (message: string) => {
    return toast(message, {
      icon: "ℹ️",
      style: {
        border: "1px solid #bfdbfe",
        background: "#ffffff",
        color: "#0f172a",
      },
    });
  },

  loading: (message: string) => {
    return toast.loading(message, {
      style: {
        border: "1px solid #e2e8f0",
        background: "#ffffff",
        color: "#0f172a",
      },
    });
  },
};

export default showToast;

