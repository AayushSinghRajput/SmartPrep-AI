import originalToast from "react-hot-toast";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from "react-icons/fi";

/**
 * Enhanced Toast Messenger
 * Provides consistent, beautifully styled notifications across the platform:
 * - toast.success(message, options)
 * - toast.error(message, options)
 * - toast.info(message, options)
 * - toast.warning(message, options)
 * - toast.loading(message, options)
 * - toast.promise(promise, messages, options)
 * - toast.dismiss(toastId)
 */

const baseStyle = {
  borderRadius: "14px",
  background: "#ffffff",
  color: "#0f172a",
  fontSize: "13.5px",
  fontWeight: "500",
  padding: "12px 16px",
  boxShadow: "0 10px 30px -5px rgba(15, 23, 42, 0.12), 0 4px 6px -2px rgba(15, 23, 42, 0.04)",
  maxWidth: "420px",
};

export const toast = (message, options = {}) => {
  return originalToast(message, {
    style: {
      ...baseStyle,
      border: "1px solid rgba(226, 232, 240, 0.8)",
      ...options.style,
    },
    ...options,
  });
};

// Success Toast
toast.success = (message, options = {}) => {
  return originalToast.success(message, {
    duration: 3500,
    style: {
      ...baseStyle,
      border: "1px solid rgba(16, 185, 129, 0.3)",
      background: "#ffffff",
      ...options.style,
    },
    iconTheme: {
      primary: "#10b981",
      secondary: "#ffffff",
    },
    ...options,
  });
};

// Error Toast
toast.error = (message, options = {}) => {
  return originalToast.error(message, {
    duration: 4500,
    style: {
      ...baseStyle,
      border: "1px solid rgba(244, 63, 94, 0.3)",
      background: "#ffffff",
      ...options.style,
    },
    iconTheme: {
      primary: "#f43f5e",
      secondary: "#ffffff",
    },
    ...options,
  });
};

// Info Toast
toast.info = (message, options = {}) => {
  return originalToast(message, {
    duration: 3500,
    icon: <FiInfo className="w-5 h-5 text-indigo-600 shrink-0" />,
    style: {
      ...baseStyle,
      border: "1px solid rgba(99, 102, 241, 0.3)",
      background: "#ffffff",
      ...options.style,
    },
    ...options,
  });
};

// Warning Toast
toast.warning = (message, options = {}) => {
  return originalToast(message, {
    duration: 4000,
    icon: <FiAlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />,
    style: {
      ...baseStyle,
      border: "1px solid rgba(245, 158, 11, 0.3)",
      background: "#ffffff",
      ...options.style,
    },
    ...options,
  });
};

// Loading Toast
toast.loading = (message, options = {}) => {
  return originalToast.loading(message, {
    style: {
      ...baseStyle,
      border: "1px solid rgba(226, 232, 240, 0.8)",
      ...options.style,
    },
    ...options,
  });
};

// Promise Toast
toast.promise = (promise, messages, options = {}) => {
  return originalToast.promise(
    promise,
    messages,
    {
      style: {
        ...baseStyle,
        ...options.style,
      },
      ...options,
    }
  );
};

// Dismiss Toast
toast.dismiss = (toastId) => {
  return originalToast.dismiss(toastId);
};

export default toast;
