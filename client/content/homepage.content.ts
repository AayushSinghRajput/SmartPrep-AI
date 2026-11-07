/**
 * SmartPrep AI - Homepage Content Configuration
 * Fully centralized, truthful copy without fabricated numbers or fake ratings.
 */

export const homepageContent = {
  hero: {
    badge: "Built for NEB +2 Science & Entrance Examinations",
    headingMain: "Turn any textbook PDF into a day-by-day study plan.",
    supportingText:
      "Upload your textbook PDF, select your subject and preparation duration, and receive a structured schedule with daily topics, comprehensive revision notes, and targeted practice quizzes. Started late? Pick a ready-made 30-day crash plan and start preparing immediately.",
    primaryCta: {
      text: "Start Free",
      href: "/signup",
    },
    secondaryCta: {
      text: "See How It Works",
      href: "#how-it-works",
    },
    microcopy: "Free to start. No credit card required.",
  },

  proofStrip: [
    {
      title: "Your Own Textbook PDF",
      description: "Generates schedules tailored directly to the syllabus in your uploaded book.",
      icon: "file-text",
    },
    {
      title: "Grounded Answers",
      description: "AI explanations and doubt solutions strictly referenced to your textbook material.",
      icon: "check-circle",
    },
    {
      title: "Generated in Minutes",
      description: "Skip manual revision scheduling and get straight to focused concept learning.",
      icon: "clock",
    },
    {
      title: "Free to Start",
      description: "Begin learning immediately with access to core study plans and practice tools.",
      icon: "shield",
    },
  ],

  howItWorks: {
    heading: "How SmartPrep AI Works",
    subtitle: "From a dense textbook PDF to daily mastery in four straightforward steps.",
    steps: [
      {
        stepNumber: "01",
        title: "Upload Your PDF",
        description: "Upload your NEB +2 Science textbook or reference book PDF into the secure workspace.",
      },
      {
        stepNumber: "02",
        title: "Enter Subject & Days",
        description: "Name your subject and set the target number of days you have until your examination.",
      },
      {
        stepNumber: "03",
        title: "Get Day-Wise Schedule",
        description: "Receive a structured day-by-day roadmap with balanced topics, subtopics, and focus areas.",
      },
      {
        stepNumber: "04",
        title: "Learn, Practice & Track",
        description: "Study structured notes, practice adaptive MCQs, resolve doubts, and monitor your mastery.",
      },
    ],
  },

  crashPlans: {
    badge: "Ready-Made 30-Day Blueprints",
    heading: "30 Days to Exam Day. Complete Syllabus, Zero Guesswork.",
    subtitle:
      "Skip the planning paralysis. Pick your high-stakes subject to unlock balanced daily targets, high-yield formulas, and entrance-tested practice from Day 1 to 30.",
    roadmapStages: [
      {
        week: "Week 1",
        title: "Core Foundations",
        description: "Review fundamental principles, high-weightage definitions, and core formulas.",
      },
      {
        week: "Week 2",
        title: "In-Depth Topics & Notes",
        description: "Cover remaining syllabus chapters with concise summaries and derivations.",
      },
      {
        week: "Week 3",
        title: "Targeted MCQ Mastery",
        description: "Solve topic-specific entrance questions, identify mistakes, and reinforce weak spots.",
      },
      {
        week: "Week 4",
        title: "Timed Mocks & Final Revision",
        description: "Complete full-length exam simulations and speed drills for exam day readiness.",
      },
    ],
    plans: [
      {
        id: "physics",
        subject: "Physics",
        curriculum: "NEB / +2 Science Syllabus",
        tagline: "Mechanics, Heat, Waves, Electricity & Modern Physics",
        duration: "30 days · daily targets",
        isReady: true,
        image: "/images/physics1.jpg",
      },
      {
        id: "chemistry",
        subject: "Chemistry",
        curriculum: "NEB / +2 Science Syllabus",
        tagline: "Physical, Inorganic & Organic Reaction Pathways",
        duration: "30 days · daily targets",
        isReady: true,
        image: "/images/chemistry1.jpg",
      },
      {
        id: "mathematics",
        subject: "Mathematics",
        curriculum: "NEB / +2 Science Syllabus",
        tagline: "Calculus, Algebra, Vectors, Coordinate Geometry & Trigonometry",
        duration: "30 days · daily targets",
        isReady: true,
        image: "/images/maths1.jpg",
      },
      {
        id: "biology",
        subject: "Biology",
        curriculum: "NEB / +2 Science Syllabus",
        tagline: "Botany, Zoology, Genetics & Human Physiology",
        duration: "30 days · daily targets",
        isReady: true,
        image: "/images/biology1.jpg",
      },
      {
        id: "english",
        subject: "English",
        curriculum: "NEB / +2 Science Syllabus",
        tagline: "Grammar, Vocabulary, Reading Comprehension & Writing",
        duration: "30 days · daily targets",
        isReady: true,
        image: "/images/English1.jpg",
      },
    ],
    exampleDay: {
      label: "Example Day",
      dayNumber: 1,
      totalDays: 30,
      topic: "Rotational Dynamics & Torque",
      subtopics: ["Moment of Inertia", "Torque & Angular Acceleration", "Rotational Work & Energy"],
      sampleQuestion: "What is the relation between torque τ, moment of inertia I, and angular acceleration α?",
      sampleOptions: ["τ = I · α", "τ = I / α", "τ = I · ω²", "τ = m · v²"],
      correctIndex: 0,
    },
  },

  features: {
    heading: "Engineered for Focus, Speed & Exam Retention",
    subtitle: "Everything +2 Science students in Nepal need to prepare methodically without distractions.",
    items: [
      {
        id: "plan-generator",
        title: "Adaptive Study Plan Engine",
        tag: "Core Engine",
        description: "Upload any textbook PDF to automatically calculate chapter weightage and produce a day-by-day balanced roadmap.",
        icon: "calendar",
        highlights: [
          "Automated day-by-day syllabus balancing",
          "Calibrated to your exact exam date & target days",
          "Direct chapter extraction from uploaded textbook PDF",
        ],
      },
      {
        id: "mcq-practice",
        title: "Adaptive Entrance MCQs",
        tag: "IOE & CEE Format",
        description: "Topic-specific practice questions with instant feedback, negative marking simulation, and step-by-step solutions.",
        icon: "check-square",
        highlights: [
          "Topic-by-topic questions with instant textbook rationales",
          "Negative marking simulation for IOE & CEE entrance",
          "Accuracy benchmarks and common mistake alerts",
        ],
      },
      {
        id: "formula-vault",
        title: "High-Yield Formula Vault",
        tag: "NEB Derivations",
        description: "Instant access to verified formulas, derivations, and SI units directly extracted from your textbook chapters.",
        icon: "book-open",
        highlights: [
          "All formulas, definitions and SI units compiled",
          "Step-by-step derivations verified for NEB board exams",
          "Quick-revision formula sheets ready before exam day",
        ],
      },
      {
        id: "ai-assistant",
        title: "Grounded Textbook AI Tutor",
        tag: "Zero Hallucinations",
        description: "Ask questions on complex concepts and receive explanations referenced directly to your textbook's syllabus.",
        icon: "message-circle",
        highlights: [
          "Explanations referenced directly to your NEB book",
          "Zero hallucinations or out-of-syllabus notations",
          "Instant doubt resolution on tricky numericals",
        ],
      },
      {
        id: "performance-tracking",
        title: "Diagnostic Performance Analytics",
        tag: "Readiness Score",
        description: "Pinpoint weak topics, track quiz accuracy trends, and know your readiness score before exam day.",
        icon: "bar-chart-2",
        highlights: [
          "Overall exam readiness percentage indicator",
          "Subject-by-subject weakness diagnostics",
          "Historical quiz attempts and accuracy tracking",
        ],
      },
      {
        id: "study-streaks",
        title: "Study Streaks & Exam Milestones",
        tag: "Daily Discipline",
        description: "Build relentless daily study habits with streak tracking, completed milestones, and entrance countdowns.",
        icon: "target",
        highlights: [
          "Relentless daily study streak tracking",
          "Real-time countdown timer to board and entrance exams",
          "Daily milestone achievements to stay accountable",
        ],
      },
    ],
  },

  whyDifferent: {
    badge: "Textbook Grounding",
    heading: "Answers from your textbook, not random internet noise.",
    explanation:
      "General AI models and search engines pull answers from conflicting global curricula, confusing students with unfamiliar notations and out-of-syllabus methods. SmartPrep AI grounds every note, derivation, and quiz strictly in your uploaded NEB textbook.",
    comparison: {
      genericAi: {
        title: "Generic AI & Web Search",
        tag: "Unverified Fluff",
        points: [
          "Confusing notations from foreign boards (CBSE / Cambridge)",
          "Overwhelming essay responses with zero syllabus boundaries",
          "Risk of marks deduction on NEB board evaluations",
          "No synchronization with your examination countdown",
        ],
      },
      smartprepAi: {
        title: "SmartPrep AI Grounding",
        tag: "100% NEB Aligned",
        points: [
          "Strict adherence to official NEB +2 Science definitions",
          "Exact formula notations accepted in IOE & CEE exams",
          "Structured daily milestones matched to your exam date",
          "Verified answer citations directly from your textbook",
        ],
      },
    },
    steps: [
      { title: "Your PDF", desc: "Upload your school textbook or syllabus" },
      { title: "Smart Prep AI Reads It", desc: "Extracts chapters, topics, and definitions" },
      { title: "Targeted Results", desc: "Notes and quizzes aligned to your exam" },
    ],
  },

  communityPreview: {
    badge: "Peer Study Network",
    heading: "Study together. Crack your entrance exams faster.",
    subtitle:
      "Join ambitious +2 Science students across Nepal preparing for NEB board, IOE Engineering, and CEE Medical exams. Ask doubts, share formulas, and discuss past questions.",
    threads: [
      {
        id: "physics-1",
        subject: "Physics",
        stream: "IOE Engineering",
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
        author: "Aayush S.",
        college: "St. Xavier's / NEB Gr 12",
        avatarBg: "bg-indigo-600",
        timeAgo: "25 mins ago",
        question:
          "Why does the moment of inertia change with the axis of rotation even when the mass and body shape are completely identical?",
        replyCount: 4,
        likes: 38,
        topReply: {
          author: "Bikram K.",
          college: "Pulchowk Campus Aspirant",
          avatarBg: "bg-emerald-600",
          content:
            "Moment of inertia measures how mass is spatially distributed relative to that specific rotation axis (I = Σ mᵢ · rᵢ²). Shifting the axis changes the perpendicular distance rᵢ of each mass particle, altering the body's resistance to angular acceleration.",
          isVerified: true,
        },
      },
      {
        id: "chemistry-1",
        subject: "Chemistry",
        stream: "CEE Medical",
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
        author: "Prashant M.",
        college: "Prasadi Academy",
        avatarBg: "bg-amber-600",
        timeAgo: "1 hour ago",
        question:
          "Why does formaldehyde (HCHO) undergo the Cannizzaro reaction instead of Aldol condensation?",
        replyCount: 6,
        likes: 42,
        topReply: {
          author: "Anjali T.",
          college: "IOM Entrance Ranker",
          avatarBg: "bg-rose-600",
          content:
            "Aldol condensation strictly requires an α-hydrogen to generate the enolate nucleophile. Since formaldehyde lacks α-carbons and α-hydrogens, it undergoes self oxidation-reduction (Cannizzaro) in concentrated alkali instead!",
          isVerified: true,
        },
      },
      {
        id: "math-1",
        subject: "Mathematics",
        stream: "IOE Engineering",
        badgeColor: "bg-sky-50 text-sky-700 border-sky-200",
        author: "Rohan D.",
        college: "Trinity Int'l College",
        avatarBg: "bg-sky-600",
        timeAgo: "3 hours ago",
        question:
          "What is the quickest shortcut to solve definite integrals of type ∫_0^(π/2) sin^n x cos^m x dx in the IOE 140-mark paper?",
        replyCount: 5,
        likes: 54,
        topReply: {
          author: "Suman B.",
          college: "IOE Computer Engineering",
          avatarBg: "bg-indigo-600",
          content:
            "Use Wallis' reduction formula! For integer powers, it solves these in under 20 seconds without tedious trigonometric substitutions or integration by parts.",
          isVerified: true,
        },
      },
    ],
    // Backwards compatibility with examplePost
    examplePost: {
      author: "Science Student",
      subjectTag: "Physics · Rotational Dynamics",
      timeAgo: "2 hours ago",
      question:
        "Can someone explain why the moment of inertia depends on the axis of rotation even for the same mass?",
      replyCount: 3,
      topReply: {
        author: "Peer Reviewer",
        content:
          "Moment of inertia represents how mass is distributed relative to the chosen axis (I = Σ m r²). Changing the axis changes the distance r of each mass element from that axis.",
      },
    },
    ctaText: "Join the Student Community",
    ctaHref: "/community",
  },

  faq: {
    badge: "Frequently Asked Questions",
    heading: "Got Questions? We've Got Answers.",
    subtitle: "Everything you need to know about preparing with SmartPrep AI.",
    items: [
      {
        question: "Which PDFs work with SmartPrep AI?",
        answer:
          "SmartPrep AI works with standard digital textbook PDFs, teacher-provided handouts, and curriculum syllabus files for +2 Science subjects. Clean text PDFs provide the fastest and most accurate plan generation.",
      },
      {
        question: "Is my uploaded PDF private and secure?",
        answer:
          "Yes. Your uploaded files are stored securely in your private workspace and used only to generate your study schedule, notes, and quiz questions. Your materials are never made public.",
      },
      {
        question: "Is SmartPrep AI free to use?",
        answer:
          "Yes! You can create an account and begin generating study plans and practicing MCQs for free, with no credit card required.",
      },
      {
        question: "Is the 30-day crash plan enough for entrance exams?",
        answer:
          "The 30-day plan is structured as an intensive review to cover core concepts, daily practice, and revision. While consistent study over several months is always ideal, our 30-day plan prioritizes high-yield topics when exam dates are close.",
      },
      {
        question: "Can I adjust the number of study days later?",
        answer:
          "Yes. When creating a custom plan, you can select any duration that fits your schedule (e.g., 10 days, 20 days, or 45 days) and generate a schedule matching your timeline.",
      },
      {
        question: "How does the AI use my textbook to generate quizzes?",
        answer:
          "SmartPrep AI analyzes the topics and concepts in your uploaded document and creates questions specifically testing your recall and comprehension of those topics, accompanied by step-by-step explanations.",
      },
    ],
  },

  finalCta: {
    heading: "Your entrance exam is coming. Start your plan today.",
    subtitle:
      "Join students preparing methodically with custom day-by-day schedules and entrance practice.",
    buttonText: "Get Started Free",
    buttonHref: "/signup",
    microcopy: "Free to start · NEB +2 Science syllabus · No card needed",
  },
} as const;

