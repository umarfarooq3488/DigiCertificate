import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import AdminPanel from "./pages/AdminPanel";
import CreateEvent from "./pages/CreateEvent";
import EventCertificate from "./pages/EventCertificate";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
import HowToUse from "./pages/HowToUse";
import AboutUs from "./pages/AboutUs";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Protect admin route */}
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
        <Route path="/create-event" element={<PrivateRoute><CreateEvent /></PrivateRoute>} />
        <Route path="/event/:eventId" element={<EventCertificate />} />
        <Route path="/how-to-use" element={<HowToUse />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
