import Link from "next/link";
import { motion } from "framer-motion";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="md:col-span-1"
          >
            <div className="mb-4">
              <Logo variant="light" size="md" href="/" />
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Personalized AI-powered study companion optimized for high-retention learning and higher education exam prep.
            </p>
          </motion.div>

          {/* Quick Links section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "Dashboard", href: "/dashboard" },
                { name: "About", href: "/about" },
                { name: "Contact", href: "/contact" }
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-indigo-400 transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Study Suite</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Entrance Prep</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">Interactive Notes</Link></li>
              <li><Link href="/dashboard" className="hover:text-indigo-400 transition-colors">AI Quiz Engine</Link></li>
              <li><Link href="/community" className="hover:text-indigo-400 transition-colors">Peer Study Forum</Link></li>
            </ul>
          </motion.div>

          {/* Social Media section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">Connect</h3>
            <div className="flex gap-4 text-xl text-slate-400">
              <a href="#" className="hover:text-indigo-400 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><FaLinkedin /></a>
            </div>
          </motion.div>
        </div>

        {/* Bottom copyright bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} SmartPrep AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}