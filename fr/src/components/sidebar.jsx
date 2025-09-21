import React, { useContext } from "react";
import { BookOpen, Mic, MessageCircle, Award, Home } from "lucide-react";
import { TranslationContext } from "../Translation";

export default function Sidebar({ onSelect, selected, translations }) {
  const { t } = useContext(TranslationContext) || {};

  // Use translations if available, else fallback to English
  const sidebarOptions = [
    { icon: <Home className="w-5 h-5 mr-2" />, label: translations?.sidebar_home || "Home" },
    { icon: <MessageCircle className="w-5 h-5 mr-2" />, label: translations?.sidebar_chat || "Chat Practice" },
    { icon: <Mic className="w-5 h-5 mr-2" />, label: translations?.sidebar_pronunciation || "Pronunciation" },
    { icon: <BookOpen className="w-5 h-5 mr-2" />, label: translations?.sidebar_lessons || "Lessons" },
    { icon: <Award className="w-5 h-5 mr-2" />, label: translations?.sidebar_progress || "Progress" },
  ];

  return (
    <aside className="w-80 bg-green-50 h-full shadow-lg flex flex-col py-8 px-4">
      <h2 className="text-xl font-bold text-green-700 mb-8">
        {translations?.sidebar_title || "Tamil Learning"}
      </h2>
      <nav className="flex flex-col gap-2 flex-1">
        {sidebarOptions.map((opt, idx) => (
          <button
            key={opt.label}
            className={`flex items-center px-4 py-2 rounded-lg text-left transition ${
              selected === idx
                ? "bg-green-600 text-white"
                : "hover:bg-green-100 text-green-800"
            }`}
            onClick={() => onSelect && onSelect(idx)}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-8">
        <button
          className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition font-semibold"
          onClick={() => alert('Login clicked')}
        >
          {translations?.sidebar_login || "Login"}
        </button>
      </div>
    </aside>
  );
}