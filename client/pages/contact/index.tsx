"use client";

import { useState } from "react";
import { submitContactForm } from "../../api/contact";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FiMessageSquare, FiSend, FiCheckCircle } from "react-icons/fi";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
    try {
      await submitContactForm(formData);
      setShowSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 text-slate-900">
      
      {/* HEADING */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200 mb-3">
          <FiMessageSquare className="w-3.5 h-3.5" /> Support & Inquiries
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 mb-3">
          Get in Touch with SmartPrep AI
        </h1>
        <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
          Have questions about your study plans, features, or institution onboarding? We're here to assist.
        </p>
      </div>

      {/* GRID CONTAINER */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* CONTACT FORM */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Send Us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Aayush Rajput"
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="student@example.com"
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us how we can help..."
                  rows={4}
                  required
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold py-3 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all text-sm"
              >
                {loading ? "Sending..." : <><FiSend className="w-4 h-4" /> Send Message</>}
              </button>

              {showSuccess && (
                <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-3.5 py-2.5 rounded-xl text-xs font-semibold">
                  <FiCheckCircle className="w-4 h-4" /> Message sent successfully! We'll reply soon.
                </div>
              )}
              {error && <p className="text-rose-600 text-xs font-semibold">{error}</p>}
            </form>
          </div>
        </div>

        {/* CONTACT INFORMATION CARD */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-6">Contact Information</h2>

            <div className="space-y-5 text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 mt-0.5">
                  <FaEnvelope className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Email</span>
                  <a href="mailto:smartprep.ai@gmail.com" className="font-semibold text-indigo-600 hover:underline text-base">
                    smartprep.ai@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 mt-0.5">
                  <FaPhone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Phone</span>
                  <a href="tel:+9779860123456" className="font-semibold text-indigo-600 hover:underline text-base">
                    +977 9860123456
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100 mt-0.5">
                  <FaMapMarkerAlt className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-400 block uppercase tracking-wider">Location</span>
                  <span className="font-semibold text-slate-800 text-base">Dharan, Nepal</span>
                </div>
              </div>
            </div>

            {/* Map Embed */}
            <div className="mt-6 rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.0512321654443!2d85.30956277530676!3d27.71101717619325!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb1909ce8b070e%3A0xd5f3fbd021c684de!2sKathmandu%20Durbar%20Square!5e0!3m2!1sen!2snp!4v1691490193246!5m2!1sen!2snp"
                width="100%"
                height="180"
                allowFullScreen
                loading="lazy"
                className="border-0"
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}