import React, { useState } from "react";
import { BookOpen, MessageCircle, Mic, Award } from "lucide-react";
import TamilAlphabet from "./lessons/TamilAlphabets";
import BasicWords from "./lessons/Basicwords";
import TamilGrammarBasics from "./lessons/grammer";

export default function TamilLessons() {
  const [selectedModule, setSelectedModule] = useState(null);

  const modules = [
    {
      label: "Alphabet & Pronunciation",
      icon: <BookOpen size={32} />,
      index: 0,
      desc: "Learn Tamil vowels, consonants, and their sounds.",
    },
    {
      label: "Basic Words",
      icon: <MessageCircle size={32} />,
      index: 1,
      desc: "Practice common words, numbers, and colors.",
    },
    {
      label: "Sentences & Phrases",
      icon: <Mic size={32} />,
      index: 2,
      desc: "Daily use sentences, greetings, and Q&A.",
    },
    {
      label: "Advanced Content",
      icon: <Award size={32} />,
      index: 3,
      desc: "Idioms, storytelling, and real-world roleplays.",
    },
  ];

  // Handler for button click (redirect to module)
  const handleModuleClick = (idx) => {
    setSelectedModule(idx);
  };

  // Handler for back button in modules
  const handleBack = () => {
    setSelectedModule(null);
  };

  // Render TamilAlphabet if Alphabet & Pronunciation is selected
  if (selectedModule === 0) {
    return <TamilAlphabet onBack={handleBack} />;
  }

  // Render BasicWords if Basic Words is selected
  if (selectedModule === 1) {
    return <BasicWords onBack={handleBack} />;
  }

  // Render TamilGrammarBasics if Sentences & Phrases is selected
  if (selectedModule === 2) {
    return <TamilGrammarBasics onBack={handleBack} />;
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Tamil Lessons</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl">
        {modules.map((mod) => (
          <button
            key={mod.label}
            onClick={() => handleModuleClick(mod.index)}
            className="flex flex-col items-center justify-center p-8 bg-white rounded-2xl shadow-lg hover:bg-green-50 transition text-center border-2 border-green-200 hover:border-green-400"
            style={{ minHeight: 180 }}
          >
            <div className="mb-4 text-green-700">{mod.icon}</div>
            <div className="text-xl font-semibold mb-2">{mod.label}</div>
            <div className="text-gray-600 text-base">{mod.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}