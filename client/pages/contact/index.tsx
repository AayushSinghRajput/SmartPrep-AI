"use client";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock,
  FiSend,
  FiCheckCircle,
  FiAlertCircle,
  FiHelpCircle,
  FiMessageSquare,
} from "react-icons/fi";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { submitContactForm } from "@/services/contact";
import { contactContent } from "@/content/contact.content";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validation
    if (!formData.name || !formData.email || !formData.message) {
      setError("Please fill in your name, email, and message.");
      setLoading(false);
      return;
    }

    try {
      // Backend expects { name, email, message } strictly
      const payload = {
        name: formData.name,
        email: formData.email,
        message: formData.subject
          ? `[Subject: ${formData.subject}]\n\n${formData.message}`
          : formData.message,
      };

      await submitContactForm(payload);
      setShowSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setShowSuccess(false), 5000);
    } catch (err: any) {
      setError(err?.message || "Could not send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us — SmartPrep AI</title>
        <meta
          name="description"
          content="Have questions about textbook PDF study plans, schedules, or platform features? Get in touch with the SmartPrep AI team."
        />
        <link rel="canonical" href="https://smartprepai-three.vercel.app/contact" />
        <meta property="og:title" content="Contact SmartPrep AI" />
        <meta property="og:description" content="Send us an inquiry or doubt question." />
      </Head>

      <div className="bg-[#f8fafc] text-slate-900 min-h-screen pt-28 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-indigo-700">
              <FiMessageSquare className="w-3.5 h-3.5" />
              {contactContent.badge}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
              {contactContent.heading}
            </h1>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {contactContent.subtitle}
            </p>
          </div>

          {/* Grid: Contact Form & Side Channels */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form Column */}
            <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Send a Message
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  We usually respond within 24 hours on working days.
                </p>
              </div>

              {/* Success Notification */}
              {showSuccess && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3 text-emerald-800 text-xs sm:text-sm font-semibold">
                  <FiCheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">Message sent successfully!</p>
                    <p className="text-xs text-emerald-700 font-normal mt-0.5">
                      Thank you for contacting SmartPrep AI. We'll reply to your email shortly.
                    </p>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {error && (
                <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-center gap-3 text-rose-800 text-xs sm:text-sm font-semibold">
                  <FiAlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label={contactContent.formFields.nameLabel}
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={contactContent.formFields.namePlaceholder}
                  required
                />

                <Input
                  label={contactContent.formFields.emailLabel}
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder={contactContent.formFields.emailPlaceholder}
                  required
                />

                <Input
                  label={contactContent.formFields.subjectLabel}
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder={contactContent.formFields.subjectPlaceholder}
                />

                <Textarea
                  label={contactContent.formFields.messageLabel}
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder={contactContent.formFields.messagePlaceholder}
                  rows={5}
                  required
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={loading}
                  rightIcon={<FiSend className="w-4 h-4" />}
                  className="w-full sm:w-auto"
                >
                  {loading ? contactContent.formFields.submittingButton : contactContent.formFields.submitButton}
                </Button>
              </form>
            </div>

            {/* Side Information Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Channels Card */}
              <div className="bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                  Contact Information
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FiMail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Email Support
                      </span>
                      <a
                        href={`mailto:${contactContent.contactDetails.email}`}
                        className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {contactContent.contactDetails.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FiPhone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Phone Inquiries
                      </span>
                      <a
                        href={`tel:${contactContent.contactDetails.phone}`}
                        className="font-bold text-slate-900 hover:text-indigo-600 transition-colors"
                      >
                        {contactContent.contactDetails.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <FiMapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Office Location
                      </span>
                      <span className="font-bold text-slate-900">
                        {contactContent.contactDetails.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 pt-2 border-t border-slate-100">
                    <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 text-slate-500 flex items-center justify-center shrink-0">
                      <FiClock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        Support Window
                      </span>
                      <span className="text-xs text-slate-600">
                        {contactContent.contactDetails.responseTime}
                      </span>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {contactContent.contactDetails.hoursPlaceholder}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Link to FAQs */}
                <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-indigo-900">
                    <FiHelpCircle className="w-4 h-4 text-indigo-600" />
                    <span>Have common questions?</span>
                  </div>
                  <Link
                    href="/#faq"
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
                  >
                    Read FAQ →
                  </Link>
                </div>
              </div>

              {/* Map Embed Container */}
              <div className="rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm bg-white p-2">
                <iframe
                  title="SmartPrep AI Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0512321654443!2d85.30956277530676!3d27.71101717619325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1909ce8b070e%3A0xd5f3fbd021c684de!2sKathmandu%20Durbar%20Square!5e0!3m2!1sen!2snp!4v1691490193246!5m2!1sen!2snp"
                  width="100%"
                  height="190"
                  allowFullScreen
                  loading="lazy"
                  className="rounded-2xl border-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
