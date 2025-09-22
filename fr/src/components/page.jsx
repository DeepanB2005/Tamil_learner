import React, { useState, useContext } from "react";
import Sidebar from "./sidebar";
import Chatbot from "./chatbot";
import TamilVowels from "./pronounciation";
import { TranslationContext } from "../Translation";

import TamilLessons from "./Lessons";
function Dashboard() {
  const [selected, setSelected] = useState(0);
  const { language, setLanguage, translations } = useContext(TranslationContext);

  return (
    <div className="flex h-screen">
      {/* Sidebar with translation */}
      <Sidebar selected={selected} onSelect={setSelected} translations={translations} />

      <div className="flex-1 flex flex-col">
        {/* Top Nav for language selection */}
        <nav className="w-full flex justify-end items-center px-8 py-4 bg-white shadow">
          <label className="mr-2 font-medium text-gray-700" htmlFor="lang-select">
            {translations?.language || "Language"}:
          </label>
          <select
            id="lang-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ் (Tamil)</option>
            <option value="fr">Français (French)</option>
            <option value="es">Español (Spanish)</option>
            <option value="de">Deutsch (German)</option>
            <option value="hi">हिन्दी (Hindi)</option>
            <option value="zh">中文 (Chinese)</option>
            <option value="ar">العربية (Arabic)</option>
            <option value="ru">Русский (Russian)</option>
            <option value="ja">日本語 (Japanese)</option>
            {/* Add more languages as needed */}
          </select>
        </nav>
        <main className="flex-1 overflow-auto">
          {selected === 1 ? (
            <Chatbot />
          ) :  selected === 2 ? (
            <TamilLessons />
          ) :(
            <div className="flex items-center justify-center h-full text-2xl text-gray-500">
              {translations?.sidebar_home || "Welcome to Tamil Learning!"}
            </div>
          )
          }
        </main>
      </div>
    </div>
  );
}

export default Dashboard;