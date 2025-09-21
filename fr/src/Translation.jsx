import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // default
  const [translations, setTranslations] = useState({});

  // All static texts of the page
  const texts = {
    // Navbar & Hero
    header: "AI Tamil Tutor",
    startLearning: "Start Learning",
    startLearningNow: "Start Learning Now",
    subtitle: "Learn Tamil through interactive conversations with AI – anytime, anywhere.",

    // About
    about_title: "Why Learn Tamil with AI?",
    about_text: "Tamil is one of the oldest and most beautiful languages in the world. Our AI-powered tutor makes it simple, fun, and interactive:",
    about_points: [
      "Practice real conversations with AI",
      "Get instant feedback on pronunciation and grammar",
      "Improve your vocabulary with smart suggestions",
      "Learn at your own pace – from beginner to advanced"
    ],

    // Features
    features_title: "Key Features",
    features: [
      ["🗣️", "Voice & Text Chat", "Speak or type in Tamil and get real-time replies."],
      ["🎧", "Pronunciation Practice", "AI listens to your Tamil and corrects you instantly."],
      ["📚", "Grammar & Vocabulary", "Learn proper usage with simple examples."],
      ["🔄", "Adaptive Learning", "Lessons adjust based on your progress."]
    ],

    // How It Works
    how_title: "How It Works",
    how_points: [
      "1️⃣ Start a Chat → Enter text or use your microphone.",
      "2️⃣ AI Responds → Get instant replies in Tamil (with English support if needed).",
      "3️⃣ Get Feedback → AI highlights mistakes and suggests corrections.",
      "4️⃣ Track Progress → Watch your skills improve over time."
    ],

    // Demo
    demo_title: "Try It Out!",
    demo_subtitle: "Start your first Tamil conversation:",
    demo_prompt: "👉 Type or say “Vanakkam 👋” and see how the AI responds!",

    // Benefits
    benefits_title: "Who Can Use This?",
    benefits: [
      "✨ Students learning Tamil as a second language",
      "🌍 Travelers visiting Tamil Nadu or Sri Lanka",
      "📖 Heritage learners connecting with Tamil culture",
      "🧑‍🏫 Professionals preparing for exams or interviews in Tamil"
    ],

    // Testimonials
    testimonials_title: "What Learners Say",
    testimonials: [
      "⭐ “I learned conversational Tamil in just 2 months with this AI tutor!”",
      "⭐ “The pronunciation feedback was a game-changer for me.”"
    ],

    // CTA
    cta_title: "Ready to Speak Tamil?",
    cta_subtitle: "Start your Tamil learning journey today with AI. Simple. Fun. Effective.",
    cta_button: "Start Free Trial",

    // Footer
    footer_links: "Home | About | Contact | Privacy Policy",
    footer_copyright: "© 2025 AI Tamil Learning Platform. All Rights Reserved.",

    // Sidebar
    sidebar_title: "Tamil Learning",
    sidebar_home: "Home",
    sidebar_chat: "Chat Practice",
    sidebar_pronunciation: "Pronunciation",
    sidebar_lessons: "Lessons",
    sidebar_progress: "Progress",
    sidebar_login: "Login",
    language: "Language",
  };

  // Translate function
  const translateAll = async (lang) => {
    // Gather all strings to translate
    let keys = [];
    let values = [];

    for (let key in texts) {
      if (Array.isArray(texts[key])) {
        texts[key].forEach((item) => {
          if (Array.isArray(item)) {
            item.forEach((sub) => {
              keys.push([key, item, sub]);
              values.push(sub);
            });
          } else {
            keys.push([key, item]);
            values.push(item);
          }
        });
      } else {
        keys.push([key]);
        values.push(texts[key]);
      }
    }

    // Batch translate all values in one request
    const res = await axios.post("http://localhost:5000/translate", {
      text: values,
      target_lang: lang,
    });

    // Map back to structure
    let translated = {};
    let i = 0;
    for (let key in texts) {
      if (Array.isArray(texts[key])) {
        translated[key] = texts[key].map((item) => {
          if (Array.isArray(item)) {
            return item.map(() => res.data.translated_text[i++]);
          } else {
            return res.data.translated_text[i++];
          }
        });
      } else {
        translated[key] = res.data.translated_text[i++];
      }
    }
    setTranslations(translated);
  };

  useEffect(() => {
    if (language !== "en") translateAll(language);
    else setTranslations(texts);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ translations, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};
