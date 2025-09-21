import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    language: "",
    field: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLoginChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleRegisterChange = e => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Login successful!");
        onLogin && onLogin(data.user);
        navigate("/learn");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  const handleRegisterSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(registerForm),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage("Registration successful! Please login.");
        setIsRegister(false);
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-96 flex flex-col gap-4">
        <button
          className="mb-2 text-green-700 underline text-left"
          onClick={() => navigate("/")}
        >
          ← Go to Home
        </button>
        <div className="flex justify-between mb-4">
          <button
            className={`font-bold ${!isRegister ? "text-green-700" : "text-gray-400"}`}
            onClick={() => setIsRegister(false)}
          >
            Login
          </button>
          <button
            className={`font-bold ${isRegister ? "text-green-700" : "text-gray-400"}`}
            onClick={() => setIsRegister(true)}
          >
            Register
          </button>
        </div>
        {isRegister ? (
          <form className="flex flex-col gap-3" onSubmit={handleRegisterSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              name="language"
              placeholder="Preferred Language"
              value={registerForm.language}
              onChange={handleRegisterChange}
              required
              className="border rounded px-3 py-2"
            />
            <select
              name="field"
              value={registerForm.field}
              onChange={handleRegisterChange}
              required
              className="border rounded px-3 py-2"
            >
              <option value="">Select Field</option>
              <option value="student">Student</option>
              <option value="tamil learner">Tamil Learner</option>
              <option value="other">Other</option>
            </select>
            <button
              type="submit"
              className="bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Register
            </button>
          </form>
        ) : (
          <form className="flex flex-col gap-3" onSubmit={handleLoginSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
              className="border rounded px-3 py-2"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
              className="border rounded px-3 py-2"
            />
            <button
              type="submit"
              className="bg-green-700 text-white py-2 rounded hover:bg-green-800 transition"
            >
              Login
            </button>
          </form>
        )}
        {message && <div className="text-center text-red-600">{message}</div>}
      </div>
    </div>
  );
}