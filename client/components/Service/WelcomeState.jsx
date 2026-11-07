import { BookOpen, Sparkles } from "lucide-react";

export default function WelcomeState({ heading, description }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] text-center px-6 py-16 max-w-xl mx-auto">
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-sm">
          <BookOpen className="w-9 h-9" />
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs border border-amber-200 shadow-xs">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
        {heading || "Select a Chapter to Begin"}
      </h3>
      
      <p className="text-slate-500 mt-2.5 max-w-md text-sm sm:text-base leading-relaxed">
        {description || "Choose any day or subtopic from the course curriculum on the left to read structured notes and practice questions."}
      </p>

      <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200/80 text-xs font-semibold text-slate-600">
        💡 Tip: Use <span className="text-indigo-600 font-bold">Zen Mode</span> at the top right for distraction-free reading.
      </div>
    </div>
  );
}
