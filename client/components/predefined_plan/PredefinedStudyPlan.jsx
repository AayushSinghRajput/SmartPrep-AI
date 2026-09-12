"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import books from "../../assets/data/topviewedbooks.json";
import { getGlobalPlan } from "../../services/predefined";
import StudyPlanModal from "./StudyPlanModal";
import PredefinedHeader from "./PredefinedHeader";
import PredefinedPlanCard from "./PredefinedPlanCard";
import PredefinedStats from "./PredefinedStats";
import { toast } from "../../utils/toast";
import { colors } from "../../constants/colors";

import physicsImg from "../../assets/images/physics.jpg";
import chemistryImg from "../../assets/images/chemistry.webp";
import biologyImg from "../../assets/images/biology.jpg";
import englishImg from "../../assets/images/English.jpg";
import aiImg from "../../assets/images/ai.jpeg";

const subjectImages = {
  Physics: physicsImg,
  Chemistry: chemistryImg,
  Biology: biologyImg,
  English: englishImg,
  Mathematics: aiImg,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 },
  },
};

export default function PredefinedStudyPlan() {
  const [showAll, setShowAll] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingCardId, setLoadingCardId] = useState(null);

  const visibleBooks = showAll ? books : books.slice(0, 3);

  const handleViewDetails = async (subject, id) => {
    if (loading) return; // Prevent concurrent plan requests
    if (!subject) {
      toast.warning("Subject name is missing for this card.");
      return;
    }

    setLoading(true);
    setLoadingCardId(id);
    try {
      const data = await getGlobalPlan(subject);
      if (data && data.schedule && data.schedule.length > 0) {
        setSelectedPlan(data);
        toast.success(`${subject} 30-day prep plan loaded!`);
      } else {
        setSelectedPlan({ subject, schedule: [] });
        toast.info(`No study plan schedule found for ${subject} yet.`);
      }
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch plan:", error);
      setSelectedPlan({ subject, schedule: [] });
      setIsModalOpen(true);
      toast.error(`Could not load ${subject} plan. Please try again.`);
    } finally {
      setLoading(false);
      setLoadingCardId(null);
    }
  };

  return (
    <motion.div
      className="p-6 md:p-8 lg:p-12"
      style={{ background: colors.gradients.subtle }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto">
        <PredefinedHeader />

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {visibleBooks.map((book) => (
              <PredefinedPlanCard
                key={book.id}
                book={book}
                onViewDetails={handleViewDetails}
                isLoading={loading && loadingCardId === book.id}
                isAnyLoading={loading}
                subjectImages={subjectImages}
                aiImg={aiImg}
                cardVariants={cardVariants}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More & Stats */}
        <PredefinedStats
          showAll={showAll}
          onToggleShowAll={() => setShowAll(!showAll)}
          totalBooks={books.length}
        />

        {/* Study Plan Modal */}
        <AnimatePresence>
          {isModalOpen && selectedPlan && (
            <StudyPlanModal
              plan={selectedPlan}
              onClose={() => setIsModalOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
