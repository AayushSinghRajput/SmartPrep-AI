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
    badge: "Simple 4-Step Process",
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

  customPlanDemo: {
    badge: "Interactive Demo",
    heading: "See a Study Plan in Action",
    subtitle: "Watch how SmartPrep AI breaks down a textbook into clear, daily milestones.",
    fileName: "Physics_Grade12_Textbook.pdf",
    fileSize: "14.2 MB",
    subject: "Physics",
    durationDays: 10,
    caption: "Example plan. Your actual plan is generated from your own PDF and chosen duration.",
    ctaText: "Try it with your PDF",
    sampleRows: [
      {
        day: 1,
        topic: "Rotational Dynamics & Torque",
        subtopics: ["Moment of Inertia of Rigid Bodies", "Rotational Kinetic Energy", "Conservation of Angular Momentum"],
        status: "Active",
      },
      {
        day: 2,
        topic: "Simple Harmonic Motion (SHM)",
        subtopics: ["Equation of Simple Harmonic Motion", "Energy in SHM", "Simple and Compound Pendulum"],
        status: "Upcoming",
      },
      {
        day: 3,
        topic: "Wave Motion & Acoustics",
        subtopics: ["Stationary Waves in Pipes & Strings", "Doppler Effect", "Beats and Resonance"],
        status: "Upcoming",
      },
      {
        day: 4,
        topic: "Electrostatics & Capacitance",
        subtopics: ["Gauss's Law Applications", "Electric Potential & Field", "Parallel Plate Capacitors"],
        status: "Upcoming",
      },
    ],
    sampleDayContent: {
      day: 1,
      topic: "Rotational Dynamics & Torque",
      conceptSummary:
        "Rotational dynamics extends linear mechanics to rotating systems. Angular velocity (ω), angular acceleration (α), and torque (τ = r × F) mirror force and acceleration in translational motion.",
      keyFormula: "τ = I · α = \\frac{dL}{dt}",
      practiceCount: "10 practice questions ready",
    },
  },

  crashPlans: {
    badge: "Ready-Made 30-Day Blueprints",
    heading: "Started late? Your 30-day plan is ready.",
    subtitle:
      "Examination forms are open and entrance tests are approaching. Skip the planning phase, pick your target subject, and start studying today.",
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
    badge: "Complete Study Suite",
    heading: "Engineered for Focus, Speed & Exam Retention",
    subtitle: "Everything +2 Science students need to prepare methodically without distractions.",
    items: [
      {
        id: "plan-generator",
        title: "Study Plan Generator",
        description: "Converts textbook PDFs into structured day-wise milestones tailored to your schedule.",
        icon: "calendar",
      },
      {
        id: "mcq-practice",
        title: "Adaptive MCQ Practice",
        description: "Topic-by-topic quizzes with immediate answer feedback and step-by-step explanations.",
        icon: "check-square",
      },
      {
        id: "notes-generation",
        title: "Smart Notes & Summaries",
        description: "Clear concept summaries with mathematical formulas and key scientific terms.",
        icon: "book-open",
      },
      {
        id: "ai-assistant",
        title: "Context-Aware AI Tutor",
        description: "Ask questions on complex concepts and receive explanations grounded directly in your book.",
        icon: "message-circle",
      },
      {
        id: "performance-tracking",
        title: "Academic Performance Tracking",
        description: "Analyze accuracy trends, quiz history, and readiness across individual subjects.",
        icon: "bar-chart-2",
      },
      {
        id: "progress-tracking",
        title: "Study Milestones & Streaks",
        description: "Stay motivated with daily study progress tracking, completed days, and exam countdowns.",
        icon: "target",
      },
    ],
  },

  whyDifferent: {
    badge: "Textbook Grounding",
    heading: "Answers from your textbook, not from the whole internet.",
    explanation:
      "General search engines give overwhelming and conflicting answers from unrelated curricula. SmartPrep AI reads your uploaded textbook PDF and uses that exact course material to generate your daily notes, study schedules, and practice questions.",
    steps: [
      { title: "Your PDF", desc: "Upload your school textbook or syllabus" },
      { title: "Smart Prep AI Reads It", desc: "Extracts chapters, topics, and definitions" },
      { title: "Targeted Results", desc: "Notes and quizzes aligned to your exam" },
    ],
  },

  communityPreview: {
    badge: "Peer Study Community",
    heading: "Learn alongside fellow +2 Science students",
    subtitle: "Discuss tricky questions, share entrance tips, and get help when you're stuck.",
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
          "Moment of inertia represents how mass is distributed relative to the chosen axis ($I = \\sum m r^2$). Changing the axis changes the distance $r$ of each mass element from that axis.",
      },
    },
    ctaText: "Join the Community",
    ctaHref: "/community",
  },

  earlyAccess: {
    badge: "Early Access Community",
    heading: "Be among our first students.",
    subtitle: "We are currently welcoming early users preparing for upcoming board and entrance exams.",
    benefits: [
      "Immediate access to all 5 ready-made 30-day crash plans.",
      "Custom study plan generation from your uploaded textbook PDFs.",
      "Help shape new study features and practice tools through direct feedback.",
    ],
    ctaText: "Get Early Access Free",
    ctaHref: "/signup",
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

