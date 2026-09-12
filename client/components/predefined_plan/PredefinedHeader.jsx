"use client";

import { motion } from "framer-motion";
import { FaBookOpen } from "react-icons/fa";
import { colors } from "../../constants/colors";

export default function PredefinedHeader() {
  return (
    <motion.div
      className="text-center mb-12 md:mb-16"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-6 shadow-lg transition-transform duration-300"
        style={{
          background: "linear-gradient(145deg, #6b73ff, #000dff)",
          boxShadow:
            "8px 8px 15px rgba(0,0,0,0.2), -8px -8px 15px rgba(255,255,255,0.3)",
        }}
      >
        <span className="text-2xl text-white">
          <FaBookOpen />
        </span>
      </div>

      <h2
        className="text-4xl md:text-5xl font-bold mb-4"
        style={{ color: colors.primary[900] }}
      >
        30-Day Smart Study Plans
      </h2>

      <p
        className="text-lg md:text-xl mb-8 max-w-3xl mx-auto"
        style={{ color: colors.primary[600] }}
      >
        AI-curated daily roadmaps designed to maximize your entrance exam
        preparation efficiency
      </p>
    </motion.div>
  );
}
