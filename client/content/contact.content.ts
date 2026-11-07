/**
 * SmartPrep AI - Contact Page Content
 */

export const contactContent = {
  badge: "Support & Inquiries",
  heading: "Get in Touch with SmartPrep AI",
  subtitle:
    "Have questions about study schedules, PDF uploads, or technical assistance? Send us a message and we'll be glad to help.",
  contactDetails: {
    email: "smartprep.ai@gmail.com",
    phone: "+977 9860123456",
    location: "Dharan, Nepal",
    hoursPlaceholder: "Monday to Friday: 9:00 AM – 6:00 PM NPT",
    responseTime: "We typically respond within 24 hours.",
  },
  formFields: {
    nameLabel: "Your Name",
    namePlaceholder: "e.g. Aayush Rajput",
    emailLabel: "Email Address",
    emailPlaceholder: "student@example.com",
    subjectLabel: "Subject / Topic",
    subjectPlaceholder: "Question about study plans or PDF upload",
    messageLabel: "Message",
    messagePlaceholder: "Tell us how we can assist your exam preparation...",
    submitButton: "Send Message",
    submittingButton: "Sending Message...",
  },
  quickFaqs: [
    {
      q: "Are my uploaded study books private?",
      a: "Yes, your textbook uploads remain strictly in your private student workspace.",
    },
    {
      q: "Can institutions request bulk onboarding?",
      a: "Yes, send us an email at smartprep.ai@gmail.com with your institution details.",
    },
  ],
} as const;

