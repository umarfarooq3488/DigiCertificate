import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/Firebase";
import RequestAccountForm from "../components/RequestAccountForm";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/admin");
    } catch (err) {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 px-4">
       {showRequestForm ? (
        <RequestAccountForm onClose={() => setShowRequestForm(false)} />
      ): (

        <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
      >
        <h2 className="text-3xl font-extrabold text-blue-700 text-center mb-2">Admin Sign In</h2>
        <p className="text-center text-gray-500 mb-4">Sign in to manage your events and certificates</p>
        {error && <div className="mb-2 text-red-500 text-center text-sm">{error}</div>}
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">Email</label>
          <input
            type="email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-1">Password</label>
          <input
            type="password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
            />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition"
          disabled={loading}
          >
          {loading ? "Signing In..." : "Sign In"}
        </button>
        <p className="text-center text-sm mt-4">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => setShowRequestForm(true)}
            >
            Request Account
          </button>
        </p>
      </form>
      )}
     
    </div>
  );
};

export default SignIn;
