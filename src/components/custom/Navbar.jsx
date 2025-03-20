//navbar components

import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";  // ✅ Fixed import path
import { Link } from "react-router-dom";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-900 text-white">
      <Link to="/" className="text-xl font-bold">AI Travel Planner</Link>
      
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full" />
            <button 
              onClick={logout} 
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link to="/signin" className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

