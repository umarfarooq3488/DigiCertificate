import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/Firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/signin");
  };

  return (
    <nav className="bg-white sticky top-0 z-50 shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <Link to="/" className="text-2xl font-bold text-blue-600">DigiCertificate</Link>
        <Link to="/how-to-use" className="text-blue-500 hidden sm:block hover:text-blue-700 font-medium text-base transition">How To Use</Link>
        <Link to="/about" className="text-blue-500 hidden sm:block hover:text-blue-700 font-medium text-base transition">About Us</Link>
      </div>
      {user ? (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      ) : (
        <Link to="/signin">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Sign In
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
