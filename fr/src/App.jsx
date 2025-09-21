import React, { useContext } from "react";
import { TranslationProvider, TranslationContext } from "./Translation";
import Dashboard from "./components/page";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

function AppContent() {
  const { translations, language, setLanguage } = useContext(TranslationContext);
  const t = (key, fallback) => translations[key] || fallback;
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800 bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 shadow-md bg-white">
        <h1 className="text-2xl font-bold text-indigo-600">
          {t("header", "AI Tamil Tutor")}
        </h1>
        <div className="flex items-center gap-4">
          <select
            value={language}
            onChange={e => setLanguage(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
            {/* Add more languages as needed */}
          </select>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
            onClick={() => navigate("/learn")}
          >
            {t("startLearning", "Start Learning")}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-50 via-white to-pink-50">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {t("header", "AI-Powered Tamil Learning Platform")}
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("subtitle", "Learn Tamil through interactive conversations with AI – anytime, anywhere.")}
        </p>
        <button
          className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl text-lg shadow hover:bg-indigo-700 transition"
          onClick={() => navigate("/learn")}
        >
          {t("startLearningNow", "Start Learning Now")}
        </button>
      </section>

      {/* About */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-semibold mb-6 text-indigo-700">
          {t("about_title", "Why Learn Tamil with AI?")}
        </h3>
        <p className="text-gray-700 max-w-3xl mx-auto mb-6">
          {t("about_text", "Tamil is one of the oldest and most beautiful languages in the world. Our AI-powered tutor makes it simple, fun, and interactive:")}
        </p>
        <ul className="space-y-3 text-lg">
          {(translations.about_points || [
            "Practice real conversations with AI",
            "Get instant feedback on pronunciation and grammar",
            "Improve your vocabulary with smart suggestions",
            "Learn at your own pace – from beginner to advanced"
          ]).map((point, idx) => (
            <li key={idx}>✅ {point}</li>
          ))}
        </ul>
      </section>

      {/* Features */}
      <section className="bg-indigo-50 py-16">
        <h3 className="text-3xl font-semibold text-center mb-12 text-indigo-700">
          {t("features_title", "Key Features")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {(translations.features || [
            ["🗣️", "Voice & Text Chat", "Speak or type in Tamil and get real-time replies."],
            ["🎧", "Pronunciation Practice", "AI listens to your Tamil and corrects you instantly."],
            ["📚", "Grammar & Vocabulary", "Learn proper usage with simple examples."],
            ["🔄", "Adaptive Learning", "Lessons adjust based on your progress."]
          ]).map(([icon, title, desc], idx) => (
            <div
              key={title}
              className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="text-4xl">{icon}</div>
              <h4 className="text-xl font-semibold mt-3 mb-2">{title}</h4>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h3 className="text-3xl font-semibold text-indigo-700 mb-8">
          {t("how_title", "How It Works")}
        </h3>
        <ol className="space-y-4 text-lg text-gray-700">
          {(translations.how_points || [
            "1️⃣ Start a Chat → Enter text or use your microphone.",
            "2️⃣ AI Responds → Get instant replies in Tamil (with English support if needed).",
            "3️⃣ Get Feedback → AI highlights mistakes and suggests corrections.",
            "4️⃣ Track Progress → Watch your skills improve over time."
          ]).map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ol>
      </section>

      {/* Demo */}
      <section className="bg-pink-50 py-16 text-center">
        <h3 className="text-3xl font-semibold text-indigo-700 mb-6">
          {t("demo_title", "Try It Out!")}
        </h3>
        <p className="text-gray-700 mb-4">
          {t("demo_subtitle", "Start your first Tamil conversation:")}
        </p>
        <p className="text-xl font-bold text-indigo-600">
          {t("demo_prompt", "👉 Type or say “Vanakkam 👋” and see how the AI responds!")}
        </p>
      </section>

      {/* Benefits */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h3 className="text-3xl font-semibold text-center mb-8 text-indigo-700">
          {t("benefits_title", "Who Can Use This?")}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700">
          {(translations.benefits || [
            "✨ Students learning Tamil as a second language",
            "🌍 Travelers visiting Tamil Nadu or Sri Lanka",
            "📖 Heritage learners connecting with Tamil culture",
            "🧑‍🏫 Professionals preparing for exams or interviews in Tamil"
          ]).map((benefit, idx) => (
            <p key={idx}>{benefit}</p>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-indigo-50 py-16 text-center">
        <h3 className="text-3xl font-semibold text-indigo-700 mb-8">
          {t("testimonials_title", "What Learners Say")}
        </h3>
        <div className="max-w-3xl mx-auto space-y-6">
          {(translations.testimonials || [
            "⭐ “I learned conversational Tamil in just 2 months with this AI tutor!”",
            "⭐ “The pronunciation feedback was a game-changer for me.”"
          ]).map((quote, idx) => (
            <blockquote key={idx} className="p-6 bg-white rounded-2xl shadow">
              {quote}
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-20 bg-gradient-to-r from-indigo-600 to-pink-600 text-white">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          {t("cta_title", "Ready to Speak Tamil?")}
        </h3>
        <p className="text-lg mb-6">
          {t("cta_subtitle", "Start your Tamil learning journey today with AI. Simple. Fun. Effective.")}
        </p>
        <button className="px-6 py-3 bg-white text-indigo-700 rounded-xl text-lg font-semibold shadow hover:bg-gray-100 transition">
          {t("cta_button", "Start Free Trial")}
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>{t("footer_links", "Home | About | Contact | Privacy Policy")}</p>
        <p className="mt-2 text-sm">
          {t("footer_copyright", "© 2025 AI Tamil Learning Platform. All Rights Reserved.")}
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <TranslationProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/learn" element={<Dashboard />} />
        </Routes>
      </Router>
    </TranslationProvider>
  );
}