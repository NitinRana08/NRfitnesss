import { useState } from "react";
import {useEffect } from "react";

import Hero from "./component/Hero";
import InfoSection from "./component/InfoSection";
import DisciplineBanner from "./component/DisciplineBanner";
import FuelSection from "./component/FuelSection";
import Footer from "./component/Footer";
import About from "./component/About";

function App() {

  const [showAbout, setShowAbout] = useState(false);

  
  return (
   <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
     <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800 flex justify-between items-center px-6 md:px-8 py-4">
        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-red-500">NR</span> FITNESS
        </h1>

        {/* Nav Links */}
        <ul className="hidden md:flex gap-8 text-base text-gray-300 font-medium">

          <li>
            <a
              href="#home"
              className="hover:text-white transition duration-300"
            >
              Home
            </a>
          </li>

          {/* About Button */}
          <li
            onClick={() => setShowAbout(true)}
            className="hover:text-white transition duration-300 cursor-pointer"
          >
            About
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-white transition duration-300 cursor-pointer"
            >
              Contact
            </a>
          </li>

          <li className="hover:text-white transition duration-300 cursor-pointer">
            Communication
          </li>

        </ul>








      </nav>

      {/* Main Sections */}
      <Hero />
      <InfoSection />
      <DisciplineBanner />
      <FuelSection />
      <Footer />

      {/* About Popup */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500
        ${showAbout
            ? "opacity-100 visible bg-black/80 backdrop-blur-sm"
            : "opacity-0 invisible"
          }`}
      >

        {/* Popup Box */}
        <div
          className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-black transition-all duration-500
          ${showAbout
              ? "scale-100 translate-y-0"
              : "scale-90 translate-y-10"
            }`}
        >

          {/* Close Button */}
          <button
            onClick={() => setShowAbout(false)}
            className="absolute top-5 right-5 z-50 text-3xl text-white hover:text-red-500 duration-300"
          >
            ✕
          </button>

          {/* About Component */}
          <About closeAbout={() => setShowAbout(false)} />

        </div>
      </div>

    </div>
  );
}

export default App;