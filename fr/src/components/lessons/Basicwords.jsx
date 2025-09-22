// src/components/lessons/BasicWords.jsx
import React, { useState, useContext } from "react";
import { TranslationContext } from "../../Translation";

const SpeakerIcon = ({ className = "" }) => (
  <svg
    className={className}
    width="22"
    height="22"
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9 7H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h4l5 4V3l-5 4z" />
  </svg>
);

// Basic words dataset
const oneLetterWords = [
  { tamil: "ஊ", meaning: "yes" },
  { tamil: "ஐ", meaning: "eye" },
];

const twoLetterWords = [
  { tamil: "அம்", meaning: "yes/ok" },
  { tamil: "என்", meaning: "my" },
];

const commonNouns = [
  { tamil: "அம்மா", meaning: "mother" },
  { tamil: "அப்பா", meaning: "father" },
  { tamil: "தண்ணீர்", meaning: "water" },
  { tamil: "நண்பன்", meaning: "friend" },
];

const numbers = [
  { tamil: "ஒன்று", meaning: "one" },
  { tamil: "இரண்டு", meaning: "two" },
  { tamil: "மூன்று", meaning: "three" },
  { tamil: "நான்கு", meaning: "four" },
  { tamil: "ஐந்து", meaning: "five" },
];

const days = [
  { tamil: "திங்கள்", meaning: "Monday" },
  { tamil: "செவ்வாய்", meaning: "Tuesday" },
  { tamil: "புதன்", meaning: "Wednesday" },
  { tamil: "வியாழன்", meaning: "Thursday" },
  { tamil: "வெள்ளி", meaning: "Friday" },
  { tamil: "சனி", meaning: "Saturday" },
  { tamil: "ஞாயிறு", meaning: "Sunday" },
];

const months = [
  { tamil: "சித்திரை", meaning: "Chithirai (April-May)" },
  { tamil: "ஆனி", meaning: "Aani (June-July)" },
  { tamil: "ஆடி", meaning: "Aadi (July-August)" },
  { tamil: "ஆவணி", meaning: "Aavani (Aug-Sep)" },
];

const colors = [
  { tamil: "சிவப்பு", meaning: "red" },
  { tamil: "பச்சை", meaning: "green" },
  { tamil: "நீலம்", meaning: "blue" },
  { tamil: "கருப்பு", meaning: "black" },
  { tamil: "வெள்ளை", meaning: "white" },
];

const foods = [
  { tamil: "சோறு", meaning: "rice" },
  { tamil: "இட்லி", meaning: "idli" },
  { tamil: "தோசை", meaning: "dosa" },
  { tamil: "சாம்பார்", meaning: "sambar" },
];

const sections = [
  { key: "oneLetter", label: "One-letter words", data: oneLetterWords },
  { key: "twoLetter", label: "Two-letter words", data: twoLetterWords },
  { key: "common", label: "Common nouns", data: commonNouns },
  { key: "numbers", label: "Numbers", data: numbers },
  { key: "days", label: "Days of the Week", data: days },
  { key: "months", label: "Months", data: months },
  { key: "colors", label: "Colors", data: colors },
  { key: "foods", label: "Food Items", data: foods },
];

export default function BasicWords({ onBack }) {
  const [section, setSection] = useState("oneLetter");
  const { translations } = useContext(TranslationContext);

  const speak = (text, lang = "ta-IN") => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  const currentSection = sections.find((s) => s.key === section);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back button */}
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
          onClick={onBack}
        >
          {translations?.back_btn || "Back to Lessons"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {translations?.basic_words_title || "Basic Words"}
      </h1>

      {/* Section buttons */}
      <div className="flex flex-wrap gap-2 mb-6">
        {sections.map((s) => (
          <button
            key={s.key}
            className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
              section === s.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setSection(s.key)}
          >
            {translations?.[s.key + "_section"] || s.label}
          </button>
        ))}
      </div>

      {/* Word grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {currentSection.data.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg text-center hover:bg-indigo-100 flex flex-col items-center"
          >
            <span className="text-2xl font-semibold">{item.tamil}</span>
            <span className="text-base text-gray-700 mt-2 flex items-center gap-2">
              {translations?.[item.meaning] || item.meaning}
              <button
                onClick={() => speak(item.tamil)}
                className="ml-1 text-indigo-600 hover:text-indigo-900"
                aria-label="Hear pronunciation"
              >
                <div className="p-2 bg-amber-100 rounded-full">
                  <SpeakerIcon />
                </div>
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
