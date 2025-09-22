import React, { useContext } from "react";
import { BookOpen, Mic, MessageCircle, Award, Home } from "lucide-react";
import { TranslationContext } from "../Translation";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ onSelect, selected, translations, user }) {
  const { t } = useContext(TranslationContext) || {};
  const navigate = useNavigate();

  const sidebarOptions = [
    { icon: <Home className="w-5 h-5 mr-2" />, label: translations?.sidebar_home || "Home" },
    { icon: <MessageCircle className="w-5 h-5 mr-2" />, label: translations?.sidebar_chat || "Chat Practice" },
    { icon: <BookOpen className="w-5 h-5 mr-2" />, label: translations?.sidebar_lessons || "Lessons" }, // index 3
    { icon: <Award className="w-5 h-5 mr-2" />, label: translations?.sidebar_progress || "Progress" },
  ];

  const handleSelect = (idx) => {
    if (onSelect) {
      onSelect(idx);
    }
  };

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
            onClick={() => handleSelect(idx)}
          >
            {opt.icon}
            {opt.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto pt-8 flex flex-col gap-2">
        <button
          className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-green-700 text-white hover:bg-green-800 transition font-semibold"
          onClick={() => user ? null : navigate("/Login")}
        >
          {user ? user.name : (translations?.sidebar_login || "Login")}
        </button>
        <button
          className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-white text-green-700 border border-green-700 hover:bg-green-100 transition font-semibold mt-2"
          onClick={() => navigate("/")}
        >
          {translations?.sidebar_home_btn || "Go to Home"}
        </button>
      </div>
    </aside>
  );
}