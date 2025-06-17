import React, { useState, useEffect } from "react";
import { collection, getDocs, where, doc, updateDoc, query } from "firebase/firestore";
import { db } from "../config/Firebase";
import { auth } from "../config/Firebase";
import ParticipantUpload from "../components/ParticipantUpload";
import CreateEvent from "./CreateEvent";
import TemplateUpload from "../components/TemplateUpload";
import PlaceholderEditor from "../components/Placeholder";
import { Link } from "react-router-dom";

const AdminPanel = () => {
  const [showCreateEvent, setShowCreateEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingEventId, setEditingEventId] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const user = auth.currentUser;
        console.log(user);
        
        if (!user) {
          setEvents([]);
          return;
        }
        const q = query(
          collection(db, "events"),
          where("adminUid", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        
        const eventsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(eventsList);
        
        setEvents(eventsList);
      } catch (err) {
        setEvents([]);
       } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [showCreateEvent, editingEventId]);

  const handlePlaceholderSave = async (eventId, pos) => {
    await updateDoc(doc(db, "events", eventId), { placeholder: pos });
    setEditingEventId(null);
  };

  // Get the base URL for shareable links
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return window.location.origin;
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-2 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b pb-6 mb-6">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700 mb-2">Admin Panel</h1>
            <p className="text-gray-600">Manage your events and certificate templates here.</p>
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition"
            onClick={() => setShowCreateEvent(!showCreateEvent)}
          >
            {showCreateEvent ? "Close Event Form" : "Create New Event"}
          </button>
        </div>
        {showCreateEvent && (
          <div className="mb-8">
            <CreateEvent onEventCreated={() => setShowCreateEvent(false)} />
          </div>
        )}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-blue-600">Existing Events</h2>
          {loading ? (
            <div className="text-center text-gray-500 py-8">Loading events...</div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-400 py-8">No existing events.</div>
          ) : (
            <ul className="space-y-8">
            {events.map(event => (
              <React.Fragment key={event.id}>
                <li className="bg-white border border-blue-100 rounded-2xl shadow flex flex-col md:flex-row gap-6 p-6 hover:shadow-xl transition">
                  {/* Left: Event Info */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="font-bold text-2xl text-blue-700">{event.name}</div>
                    <div className="text-gray-600">{event.description}</div>
                    <div className="text-gray-400 text-xs">
                      {event.date?.toDate ? event.date.toDate().toLocaleDateString() : "No date"}
                    </div>
                    <div className="mt-4">
                      <span className="text-xs text-gray-500">Shareable Link:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <input
                          type="text"
                          readOnly
                          value={`${getBaseUrl()}/event/${event.id}`}
                          className="border rounded px-2 py-1 text-xs w-full max-w-xs bg-gray-50 cursor-pointer focus:ring-2 focus:ring-blue-300"
                          onFocus={e => e.target.select()}
                        />
                        <Link
                          to={`/event/${event.id}`}
                          className="text-blue-600 underline text-xs"
                          target="_blank"
                          rel="noopener noreferrer"
                          >
                          Open
                        </Link>
                      </div>
                    </div>
                    {event.templateUrl && (
                      <img
                        src={event.templateUrl}
                        alt="Template"
                        className="w-40 h-auto rounded shadow border"
                      />
                    )}
                    {event.templateUrl && (
                      <button
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-1 px-4 rounded shadow transition"
                        onClick={() => setEditingEventId(event.id)}
                      >
                        {editingEventId === event.id ? "Editing..." : event.placeholder ? "Edit Placeholder" : "Set Placeholder"}
                      </button>
                    )}
                  </div>
                  {/* Right: Actions */}
                  <div className="flex flex-col gap-4 min-w-[220px] items-center">
                    {/* Template Preview */}
                    {/* Upload Template */}
                    <TemplateUpload eventId={event.id} onUploaded={() => {}} />
                    {/* Upload Participants */}
                    <ParticipantUpload eventId={event.id} />
                    {/* Edit Placeholder */}
                  </div>
                </li>
                {/* Placeholder Editor (full width) */}
                {editingEventId === event.id && (
                  <li>
                    <PlaceholderEditor
                      imageUrl={event.templateUrl}
                      initialPos={event.placeholder || { x: 100, y: 100 }}
                      onSave={pos => handlePlaceholderSave(event.id, pos)}
                    />
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
