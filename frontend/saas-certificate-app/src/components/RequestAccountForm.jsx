import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../config/Firebase";
import emailjs from "@emailjs/browser";

const SERVICE_ID = "service_11sguo6";
const TEMPLATE_ID = "template_yn9f2ss";
const PUBLIC_KEY = "yDCe2u4dnc5KSssed";

const RequestAccountForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await addDoc(collection(db, "accountRequests"), {
        name,
        email,
        password,
        message,
        createdAt: Timestamp.now(),
      });
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          name: name,
          email: email,
          password: password,
          message: message,
        },
        PUBLIC_KEY
      );
      setSubmitted(true);
    } catch (err) {
      setError("Failed to send request. Please try again later.");
      console.error("EmailJS error:", err);
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center">
        <h3 className="text-lg font-bold text-green-700 mb-2">Request Sent!</h3>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <p className="text-gray-600 mb-4">
          Your request has been submitted. The admin will review and contact you soon.
        </p>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 flex flex-col gap-4 w-full max-w-md mx-auto"
    >
      <h3 className="text-lg font-bold text-blue-700 mb-2">Request an Account</h3>
      <input
        type="text"
        className="border rounded px-3 py-2"
        placeholder="Your Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        className="border rounded px-3 py-2"
        placeholder="Your Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        className="border rounded px-3 py-2"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <textarea
        className="border rounded px-3 py-2"
        placeholder="Why do you need an account? (optional)"
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={3}
      />
      <div className="flex gap-2">
        <button
        type="submit"
        className={`bg-blue-600 text-white px-4 py-2 rounded w-full ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        disabled={loading}
        >
        {loading ? "Sending..." : "Submit Request"}
        </button>
        <button
          type="button"
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded w-full"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default RequestAccountForm;
