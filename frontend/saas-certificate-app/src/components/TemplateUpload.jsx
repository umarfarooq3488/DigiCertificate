import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dva0cameb/image/upload";
const UPLOAD_PRESET = "unsigned_preset";

const TemplateUpload = ({ eventId, onUploaded }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setSuccess(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.secure_url) {
        // Save the template URL to Firestore
        await updateDoc(doc(db, "events", eventId), {
          templateUrl: data.secure_url,
        });
        setSuccess(true);
        setFile(null);
        if (onUploaded) onUploaded(data.secure_url);
      } else {
        setError("Upload failed. Please try again.");
      }
    } catch (err) {
      setError("Upload failed. Please try again.");
    }
    setUploading(false);
  };

  return (
    <div className="bg-white border border-blue-100 rounded-xl shadow p-4 flex flex-col gap-3 items-center w-full max-w-xs mx-auto">
      <label className="block w-full text-sm font-semibold text-blue-700 mb-1">Upload Certificate Template</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-xs text-gray-700 border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-300 transition"
      />
      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition shadow mt-2"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {success && <span className="text-green-600 text-xs mt-1">Uploaded!</span>}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </div>
  );
};

export default TemplateUpload;
