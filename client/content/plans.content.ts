/**
 * SmartPrep AI - 30-Day Crash Plans Configuration
 * Exactly five subjects, aligned with NEB / +2 Science syllabus.
 */

export interface CrashPlanSubject {
  id: string;
  subject: string;
  curriculum: string;
  duration: string;
  daysCount: number;
  description: string;
  topicsHighlight: string[];
  image: string;
  isAvailable: boolean;
  entranceStreams: string[];
}

export const crashPlansContent: CrashPlanSubject[] = [
  {
    id: "physics",
    subject: "Physics",
    curriculum: "NEB / +2 Science Syllabus",
    duration: "30 days · daily targets",
    daysCount: 30,
    description: "Systematic day-wise breakdown of Mechanics, Heat & Thermodynamics, Wave & Optics, Electrostatics, and Modern Physics.",
    topicsHighlight: ["Rotational Dynamics", "Wave Motion", "Current Electricity", "Nuclear Physics"],
    image: "/images/physics1.jpg",
    isAvailable: true,
    entranceStreams: ["Engineering (IOE)", "Medical (CEE)"],
  },
  {
    id: "chemistry",
    subject: "Chemistry",
    curriculum: "NEB / +2 Science Syllabus",
    duration: "30 days · daily targets",
    daysCount: 30,
    description: "Structured schedule balancing Physical Chemistry calculations, Inorganic trends, and Organic reaction mechanisms.",
    topicsHighlight: ["Chemical Equilibrium", "Coordination Compounds", "Aldehydes & Ketones", "Electrochemistry"],
    image: "/images/chemistry1.jpg",
    isAvailable: true,
    entranceStreams: ["Engineering (IOE)", "Medical (CEE)"],
  },
  {
    id: "mathematics",
    subject: "Mathematics",
    curriculum: "NEB / +2 Science Syllabus",
    duration: "30 days · daily targets",
    daysCount: 30,
    description: "Daily problem-solving practice covering Differential & Integral Calculus, Vectors, Coordinate Geometry, and Algebra.",
    topicsHighlight: ["Derivatives & Applications", "Definite Integrals", "3D Vectors & Matrices", "Trigonometric Equations"],
    image: "/images/maths1.jpg",
    isAvailable: true,
    entranceStreams: ["Engineering (IOE)"],
  },
  {
    id: "biology",
    subject: "Biology",
    curriculum: "NEB / +2 Science Syllabus",
    duration: "30 days · daily targets",
    daysCount: 30,
    description: "Detailed coverage of Botany and Zoology with physiological pathways, anatomical diagrams, and genetics concepts.",
    topicsHighlight: ["Genetics & Molecular Biology", "Human Circulatory System", "Plant Anatomy & Physiology", "Ecology"],
    image: "/images/biology1.jpg",
    isAvailable: true,
    entranceStreams: ["Medical (CEE)"],
  },
  {
    id: "english",
    subject: "English",
    curriculum: "NEB / +2 Science Syllabus",
    duration: "30 days · daily targets",
    daysCount: 30,
    description: "High-retention practice in Grammar rules, Vocabulary building, Comprehension techniques, and Entrance verbal reasoning.",
    topicsHighlight: ["Grammar & Prepositions", "Reading Comprehension", "Vocabulary & Idioms", "Sentence Correction"],
    image: "/images/English1.jpg",
    isAvailable: true,
    entranceStreams: ["IOE / CEE Aptitude"],
  },
];

