import React, { useState } from "react";
import * as XLSX from "xlsx";
import { db } from "../config/Firebase";
import { collection, setDoc, doc } from "firebase/firestore";

const ParticipantUpload = ({ eventId }) => {
  const [participants, setParticipants] = useState([]);
  const [fileName, setFileName] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFile = (e) => {
    setSuccess(false);
    const file = e.target.files[0];
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const [headers, ...rows] = data;
      const parsed = rows.map(row =>
        Object.fromEntries(headers.map((key, i) => [key, row[i]]))
      );
      setParticipants(parsed);
    };
    reader.readAsBinaryString(file);
  };

  // Save to Firestore
  const handleSave = async () => {
    if (!eventId || participants.length === 0) return;
    setSaving(true);
    try {
      // Use email or ID as document ID for each participant
      for (const p of participants) {
        // Use "Email" or "ID" as the unique key, adjust as per your sheet
        const docId = p.Email || p.ID || p.Id || p.id || p.email;
        if (!docId) continue;
        await setDoc(doc(db, "events", eventId, "participants", docId), p);
      }
      setSuccess(true);
    } catch (err) {
      alert("Error saving participants: " + err.message);
    }
    setSaving(false);
  };

  return (
    <div className="mb-4">
      <label className="block font-semibold mb-2">Upload Participant Excel Sheet:</label>
      <input type="file" accept=".xlsx,.xls" onChange={handleFile} />
      {fileName && <div className="text-xs text-gray-500 mt-1">File: {fileName}</div>}
      {participants.length > 0 && (
        <div className="mt-2">
          <button
            className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded shadow"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save to Database"}
          </button>
          {success && <div className="text-green-600 mt-2">Participants saved!</div>}
        </div>
      )}
    </div>
  );
};

export default ParticipantUpload;
