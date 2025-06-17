import React, { useState } from "react";
import { db } from "../config/Firebase";
import { auth } from "../config/Firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const CreateEvent = ({ onEventCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const user = auth.currentUser;
    if (!user) {
      setError("Please sign in to create an event.");
      setLoading(false);
      return;
    }
    try {
      const docRef = await addDoc(collection(db, "events"), {
        adminUid: user.uid,
        name,
        description,
        date: date ? Timestamp.fromDate(new Date(date)) : null,
        templateUrl: "",
        placeholder: null,
        createdAt: Timestamp.now(),
      });
      setLoading(false);
      setName("");
      setDescription("");
      setDate("");
      if (onEventCreated) onEventCreated(docRef.id);
      alert("Event created! Now upload a certificate template.");
    } catch (err) {
      setError("Failed to create event.");
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-lg mx-auto bg-blue-50/60 border border-blue-100 rounded-2xl shadow-lg p-8 flex flex-col gap-6"
    >
      <h2 className="text-2xl font-extrabold mb-2 text-blue-700 text-center">Create New Event</h2>
      {error && <div className="mb-2 text-red-500 text-center text-sm">{error}</div>}
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Event Name</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="e.g. Annual Tech Fest"
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Description</label>
        <textarea
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          placeholder="Describe the event..."
        />
      </div>
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-1">Date</label>
        <input
          type="date"
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition shadow"
        disabled={loading}
      >
        {loading ? "Creating..." : "Create Event"}
      </button>
    </form>
  );
};

export default CreateEvent;
