//app.jsx

/*import React from 'react';
import './App.css';
import Hero from './components/custom/Hero';
import Navbar from './components/custom/Navbar'; // ✅ Import Navbar

function App() {
  return (
    <>
      <Navbar /> 
      <Hero />
    </>
  );
}

export default App;*/
import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ Import Routes
import Hero from "./components/custom/Hero";
import Navbar from "./components/custom/Navbar"; // ✅ Import Navbar
import CreateTrip from "./create-trip/index"; // ✅ Import Create Trip Page
import SignInPage from "./pages/SignInPage"; // ✅ Import SignInPage

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Hero />} /> {/* ✅ Home Route */}
        <Route path="/create-trip" element={<CreateTrip />} /> {/* ✅ Create Trip Page */}
        <Route path="/signin" element={<SignInPage />} /> {/* ✅ Sign-In Page */}
        <Route path="*" element={<h1 className="text-center mt-20 text-3xl">404 - Page Not Found</h1>} /> {/* ✅ Handle invalid URLs */}
      </Routes>
    </>
  );
}

export default App;



