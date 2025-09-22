// src/components/lessons/TamilGrammarBasics.jsx
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

// Grammar dataset
const wordFormation = [
  { tamil: "கல் + கள் = கற்கள்", meaning: "stone + plural suffix = stones" },
  { tamil: "மரம் + இல் = மரத்தில்", meaning: "tree + locative = on the tree" },
];

const pronouns = [
  { tamil: "நான்", meaning: "I" },
  { tamil: "நீ", meaning: "You (informal)" },
  { tamil: "அவர்", meaning: "He/She (formal)" },
  { tamil: "அவர்கள்", meaning: "They" },
];

const verbs = [
  { tamil: "போ", meaning: "to go" },
  { tamil: "போகிறேன்", meaning: "I go (present)" },
  { tamil: "போனேன்", meaning: "I went (past)" },
  { tamil: "போவேன்", meaning: "I will go (future)" },
];

const postpositions = [
  { tamil: "க்கு", meaning: "to/for" },
  { tamil: "இல்", meaning: "in/at" },
  { tamil: "உடன்", meaning: "with" },
  { tamil: "மீது", meaning: "on/over" },
];

const sentenceStructures = [
  { tamil: "நான் உணவு சாப்பிடுகிறேன்", meaning: "I eat food (SOV)" },
  { tamil: "அவன் பள்ளிக்குச் செல்கிறான்", meaning: "He goes to school (SOV)" },
];

const sections = [
  { key: "wordFormation", label: "Word Formation", data: wordFormation },
  { key: "pronouns", label: "Pronouns", data: pronouns },
  { key: "verbs", label: "Verbs", data: verbs },
  { key: "postpositions", label: "Postpositions", data: postpositions },
  { key: "sentenceStructures", label: "Sentence Structures", data: sentenceStructures },
];

export default function TamilGrammarBasics({ onBack }) {
  const [section, setSection] = useState("wordFormation");
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
        {translations?.grammar_basics_title || "Tamil Grammar Basics"}
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
            {translations?.[`${s.key}_section`] || s.label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentSection.data.map((item, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg text-center hover:bg-indigo-100 flex flex-col items-center"
          >
            <span className="text-lg font-semibold">{item.tamil}</span>
            <span className="text-sm text-gray-700 mt-2 flex items-center gap-2">
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
