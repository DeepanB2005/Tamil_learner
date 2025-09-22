import React, { useState, useContext } from "react";
import { TranslationContext } from "../../Translation";

// You can use any speaker icon, here is a simple SVG inline:
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

// Vowels with English pronunciation keys
const vowels = [
  { letter: "அ", pronKey: "ah" },      // as in "America"
  { letter: "ஆ", pronKey: "ahh" },     // as in "car"
  { letter: "இ", pronKey: "ie" },      // as in "ink"
  { letter: "ஈ", pronKey: "ee" },     // as in "see"
  { letter: "உ", pronKey: "uh" },      // as in "put"
  { letter: "ஊ", pronKey: "oo" },     // as in "food"
  { letter: "எ", pronKey: "a" },      // as in "end"
  { letter: "ஏ", pronKey: "aa" },     // as in "ate"
  { letter: "ஐ", pronKey: "i" },     // as in "aisle"
  { letter: "ஒ", pronKey: "o" },      // as in "go"
  { letter: "ஓ", pronKey: "oa" },     // as in "over"
  { letter: "ஔ", pronKey: "au" },     // as in "cow"
];

// Consonants with English pronunciation keys
const consonants = [
  { letter: "க", pronKey: "ka" },
  { letter: "ங", pronKey: "nga" },
  { letter: "ச", pronKey: "cha" },
  { letter: "ஞ", pronKey: "nya" },
  { letter: "ட", pronKey: "ta" },
  { letter: "ண", pronKey: "na" },
  { letter: "த", pronKey: "tha" },
  { letter: "ந", pronKey: "na2" },
  { letter: "ப", pronKey: "pa" },
  { letter: "ம", pronKey: "ma" },
  { letter: "ய", pronKey: "ya" },
  { letter: "ர", pronKey: "ra" },
  { letter: "ல", pronKey: "la" },
  { letter: "வ", pronKey: "va" },
  { letter: "ழ", pronKey: "zha" },
  { letter: "ள", pronKey: "la2" },
  { letter: "ற", pronKey: "ra2" },
  { letter: "ன", pronKey: "na3" },
];

// Example compound letters (can be extended)
const compounds = [
  { letter: "கா", pronKey: "kaa" },
  { letter: "கி", pronKey: "ki" },
  { letter: "கீ", pronKey: "kee" },
  { letter: "கு", pronKey: "ku" },
  { letter: "கூ", pronKey: "koo" },
  { letter: "கெ", pronKey: "ke" },
  { letter: "கே", pronKey: "kae" },
  { letter: "கை", pronKey: "kai" },
  { letter: "கொ", pronKey: "ko" },
  { letter: "கோ", pronKey: "koa" },
  { letter: "கௌ", pronKey: "kau" },
  { letter: "மா", pronKey: "maa" },
  { letter: "சி", pronKey: "chi" },
  { letter: "தொ", pronKey: "tho" }
];

const sections = [
  { key: "vowels", label: "Uyir Ezhuthukkal (Vowels)" },
  { key: "consonants", label: "Mei Ezhuthukkal (Consonants)" },
  { key: "compounds", label: "Uyirmei Ezhuthukkal (Compounds)" }
];

export default function TamilAlphabet({ onBack }) {
  const [section, setSection] = useState("vowels");
  const [completedSections, setCompletedSections] = useState([]);
  const [nextEnabled, setNextEnabled] = useState(false);
  const { translations } = useContext(TranslationContext);

  const getLetters = () => {
    if (section === "vowels") return vowels;
    if (section === "consonants") return consonants;
    return compounds;
  };

  // Helper to get translated pronunciation
  const getPronunciation = (pronKey) => {
    return translations?.[pronKey] || pronKey;
  };

  // TTS for pronunciation (English, as most browsers support it)
  const speak = (text, lang = "en-US") => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  // Section navigation logic
  const currentSectionIdx = sections.findIndex(s => s.key === section);

  const handleComplete = () => {
    if (!completedSections.includes(section)) {
      setCompletedSections([...completedSections, section]);
    }
    setNextEnabled(true);
  };

  const handleNext = () => {
    if (currentSectionIdx < sections.length - 1) {
      setSection(sections[currentSectionIdx + 1].key);
      setNextEnabled(false);
    }
  };

  const handlePrev = () => {
    if (currentSectionIdx > 0) {
      setSection(sections[currentSectionIdx - 1].key);
      setNextEnabled(completedSections.includes(sections[currentSectionIdx - 1].key));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-4">
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-lg font-semibold shadow hover:bg-red-700 transition"
          onClick={onBack}
        >
          {translations?.back_btn || "Back to Lessons"}
        </button>
      </div>

      <h1 className="text-2xl font-bold mb-4">
        {translations?.alphabet_title || "Tamil Alphabet & Pronunciation"}
      </h1>

      {/* Section Buttons */}
      <div className="flex gap-3 mb-6">
        {sections.map((s, idx) => (
          <button
            key={s.key}
            className={`px-4 py-2 rounded transition-all duration-200 ${
              section === s.key
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            disabled={
              s.key !== section &&
              !completedSections.includes(sections[idx - 1]?.key)
            }
            onClick={() => setSection(s.key)}
          >
            {translations?.[`${s.key}_btn`] || s.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
        {getLetters().map((item, idx) => (
          <div
            key={idx}
            className="p-4 border rounded-lg text-center text-2xl font-semibold hover:bg-indigo-100 flex flex-col items-center"
          >
            <span>{item.letter}</span>
            <span className="text-base text-gray-700 mt-2 flex items-center gap-2">
              {getPronunciation(item.pronKey)}
              <button
                aria-label="Hear pronunciation"
                className="ml-1 text-indigo-600 hover:text-indigo-900 focus:outline-none"
                onClick={() => speak(getPronunciation(item.pronKey))}
                tabIndex={0}
                type="button"
              >
                <div className="p-2 bg-amber-100 rounded-full"><SpeakerIcon /></div>
              </button>
            </span>
          </div>
        ))}
      </div>

      {/* Complete, Previous and Next Buttons */}
      <div className="flex gap-4 mt-8 justify-center">
        {currentSectionIdx > 0 && (
          <button
            className="px-6 py-2 bg-gray-500 text-white rounded-lg font-semibold shadow hover:bg-gray-700 transition"
            onClick={handlePrev}
          >
            {translations?.prev_btn || "Previous"}
          </button>
        )}
        {!completedSections.includes(section) && (
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition"
            onClick={handleComplete}
          >
            {translations?.complete_btn || "Complete"}
          </button>
        )}
        {completedSections.includes(section) && currentSectionIdx < sections.length - 1 && (
          <button
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition ${!nextEnabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={handleNext}
            disabled={!nextEnabled}
          >
            {translations?.next_btn || "Next"}
          </button>
        )}
        {completedSections.includes(section) && currentSectionIdx === sections.length - 1 && (
          <span className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg font-semibold shadow">
            {translations?.all_completed || "All sections completed!"}
          </span>
        )}
      </div>
    </div>
  );
}