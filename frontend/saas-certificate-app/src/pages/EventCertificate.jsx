import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/Firebase";
import { Stage, Layer, Image as KonvaImage, Text } from "react-konva";
import useImage from "use-image";
import jsPDF from "jspdf";

const EventCertificate = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [name, setName] = useState("");
  const [preview, setPreview] = useState(false);
  const stageRef = useRef();
  const textRef = useRef();
  const [textWidth, setTextWidth] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent(docSnap.data());
      }
    };
    fetchEvent();
  }, [eventId]);

  const [templateImage] = useImage(event?.templateUrl, "anonymous");

  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.width());
    }
  }, [name, event?.placeholder?.fontSize, event?.placeholder?.fontFamily, event?.placeholder?.color, preview]);

  const isImageLoaded = !!templateImage;

  // Download as image
  const handleDownload = () => {
    markCertificateUsed()
    if (!stageRef.current || !templateImage) {
      alert("Certificate is not ready yet. Please wait for the image to load.");
      return;
    }
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    if (!uri.startsWith("data:image/png")) {
      alert("Failed to generate PNG image.");
      return;
    }
    const link = document.createElement("a");
    link.download = `${name}_certificate.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Download as PDF
  const handleDownloadPDF = () => {
    markCertificateUsed()
    if (!stageRef.current || !templateImage) {
      alert("Certificate is not ready yet. Please wait for the image to load.");
      return;
    }
    const uri = stageRef.current.toDataURL({ pixelRatio: 2 });
    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [600, 400],
    });
    pdf.addImage(uri, "PNG", 0, 0, 600, 400);
    pdf.save(`${name}_certificate.pdf`);
  };

  // New: Validate participant before preview
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email or ID.");
      return;
    }
    try {
      const participantRef = doc(db, "events", eventId, "participants", email.trim());
      const participantSnap = await getDoc(participantRef);
      if (!participantSnap.exists()) {
        setError("You are not registered for this event.");
        return;
      }
      const participantData = participantSnap.data();
      if (participantData.used) {
        setError("Certificate already generated for this registration number.");
        return;
      }
      setPreview(true);
    } catch (err) {
      setError("Error checking registration. Please try again.");
    }
  };

 async function markCertificateUsed(){
    if (!email) return;
    const participantRef = doc(db, "events", eventId, "participants", email.trim());
    await updateDoc(participantRef, { used: true });
  };

  if (!event) return <div className="flex items-center justify-center min-h-[60vh] text-lg text-blue-700">Loading event...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-50 py-10 px-2">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-8 items-center">
        <h1 className="text-2xl md:text-3xl font-extrabold text-blue-700 text-center mb-2">{event.name} Certificate</h1>
        {!preview ? (
          <form
            onSubmit={handleFormSubmit}
            className="w-full flex flex-col gap-4 items-center"
          >
            <label className="block text-lg font-semibold text-blue-700 mb-2">
              Enter your email or ID to generate your certificate:
            </label>
            <input
              type="text"
              className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-center text-lg"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="Your Email or ID"
            />
            {/* Optionally, ask for name if not using from sheet */}
            <input
              type="text"
              className="w-full max-w-xs border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition text-center text-lg"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Your Name"
            />
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <button
              type="submit"
              className="w-full max-w-xs bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg transition shadow mt-2"
            >
              View Certificate
            </button>
          </form>
        ) : (
          <>
            <div className="w-full flex flex-col items-center">
              <div className="rounded-xl border border-blue-200 bg-blue-50 shadow-lg flex justify-center items-center p-4 w-full overflow-x-auto">
                <div className="min-w-[600px]">
                  <Stage width={600} height={400} ref={stageRef} className="block">
                    <Layer>
                      <KonvaImage image={templateImage} width={600} height={400} />
                      <Text
                        ref={textRef}
                        text={name}
                        x={event.placeholder.x}
                        y={event.placeholder.y}
                        fontSize={event.placeholder.fontSize}
                        fill={event.placeholder.color}
                        fontFamily={event.placeholder.fontFamily}
                        offsetX={textWidth / 2}
                      />
                    </Layer>
                  </Stage>
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition"
                  onClick={handleDownload}
                  disabled={!isImageLoaded}
                >
                  Download as Image
                </button>
                <button
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow transition"
                  onClick={handleDownloadPDF}
                  disabled={!isImageLoaded}
                >
                  Download as PDF
                </button>
              </div>
              <button
                className="mt-6 text-blue-600 underline text-sm"
                onClick={() => setPreview(false)}
              >
                &larr; Go Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EventCertificate;