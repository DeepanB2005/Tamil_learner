import React, { useContext } from "react";
import { TranslationContext } from "../Translation";

// Tamil vowel letters (fixed) with keys for sounds
const vowels = [
  { letter: "அ", soundKey: "ah" },      // as in "America"
  { letter: "ஆ", soundKey: "aa" },     // as in "car"
  { letter: "இ", soundKey: "i" },      // as in "ink"
  { letter: "ஈ", soundKey: "ee" },     // as in "see"
  { letter: "உ", soundKey: "u" },      // as in "put"
  { letter: "ஊ", soundKey: "oo" },     // as in "food"
  { letter: "எ", soundKey: "e" },      // as in "end"
  { letter: "ஏ", soundKey: "ae" },     // as in "ate"
  { letter: "ஐ", soundKey: "ai" },     // as in "aisle"
  { letter: "ஒ", soundKey: "o" },      // as in "go"
  { letter: "ஓ", soundKey: "oa" },     // as in "over"
  { letter: "ஔ", soundKey: "au" },     // as in "cow"
];

export default function TamilVowels() {
  const { translations, language } = useContext(TranslationContext);

  // Use browser TTS for English pronunciation
  const speak = (text, lang = "en-US") => {
    const utter = new window.SpeechSynthesisUtterance(text);
    utter.lang = lang;
    window.speechSynthesis.speak(utter);
  };

  // Helper to get translated pronunciation
  const getPronunciation = (soundKey) => {
    // If translations exist for the soundKey, use it, else fallback to soundKey itself
    return translations?.[soundKey] || soundKey;
  };

  React.useEffect(() => {
    window.speechSynthesis.onvoiceschanged = () => {
      console.log(window.speechSynthesis.getVoices());
    };
  }, []);

  return (
    <div className="p-6 bg-yellow-50">
      <h2 className="text-2xl font-bold mb-6 text-center">
        {translations?.vowels_title || "Tamil Vowels"}
      </h2>

      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
        {vowels.map((v, index) => (
          <div
            key={index}
            className="flex flex-col items-center p-4 bg-gradient-to-r from-green-100 to-white shadow rounded-2xl hover:scale-105 transition"
          >
            <span className="text-4xl font-bold text-red-600">
              {v.letter}
            </span>
            <button
              className="mt-2 text-gray-700 text-lg underline focus:outline-none"
              onClick={() => speak(getPronunciation(v.soundKey))}
            >
              {getPronunciation(v.soundKey)}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}