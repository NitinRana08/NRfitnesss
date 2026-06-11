import { useState, useEffect } from "react";
import AuthModal from "./component/AuthModal";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import Hero from "./component/Hero";
import InfoSection from "./component/InfoSection";
import DisciplineBanner from "./component/DisciplineBanner";
import FuelSection from "./component/FuelSection";
import Footer from "./component/Footer";
import About from "./component/About";
import AdminDashboard from "./component/AdminDashboard";
import Communication from "./component/Communication";

function App() {
  const [user, setUser] = useState(null);
  const [showAbout, setShowAbout] = useState(false);
  const [showCommunication, setShowCommunication] = useState(false);


  const ADMIN_EMAIL = "nitinr8229@gmail.com";
  const isAdmin = user?.email === ADMIN_EMAIL;

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  // 🔒 Lock scroll for About modal
  useEffect(() => {
    if (showAbout) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [showAbout]);

  // 🚪 Auth screen
  if (!user) {
    return (
      <AuthModal onLogin={() => setUser(auth.currentUser)} />
    );
  }

  // 🧑‍💼 Admin dashboard
  if (isAdmin) {
    return <AdminDashboard />;
  }

  // 💬 Communication page (FULL SCREEN)
  if (showCommunication) {
    return (
      <Communication
        goBack={() => setShowCommunication(false)}
      />
    );
  }
  const hasRequest =
    localStorage.getItem("activeRequestId");

  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-zinc-800 flex justify-between items-center px-6 md:px-8 py-4">

        {/* Logo */}
        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-red-500">NR</span> FITNESS
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-6">

          {/* Nav Links */}
          <ul className="hidden md:flex gap-8 text-base text-gray-300 font-medium">

            <li>
              <a href="#home" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li
              onClick={() => setShowAbout(true)}
              className="hover:text-white transition cursor-pointer"
            >
              About
            </li>

            <li>
              <a href="#contact" className="hover:text-white transition">
                Contact
              </a>
            </li>

            {/* 💬 Communication */}
            <li
              onClick={() => {
               

                setShowCommunication(true);
              }}
              className="hover:text-white transition cursor-pointer"
            >
              Communication
            </li>

          </ul>

          {/* User */}
          <div className="text-sm text-red-400 font-medium">
            {user?.email?.split("@")[0]}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-sm font-semibold transition"
          >
            Logout
          </button>

        </div>
      </nav>

      {/* Main Sections */}
      <Hero />
      <InfoSection />
      <DisciplineBanner />
      <FuelSection />
      <Footer />

      {/* About Modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-500 ${showAbout
          ? "opacity-100 visible bg-black/80 backdrop-blur-sm"
          : "opacity-0 invisible"
          }`}
      >
        <div
          className={`relative w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-3xl border border-zinc-800 bg-black transition-all duration-500 ${showAbout
            ? "scale-100 translate-y-0"
            : "scale-90 translate-y-10"
            }`}
        >

          {/* Close */}
          <button
            onClick={() => setShowAbout(false)}
            className="absolute top-5 right-5 z-50 text-3xl text-white hover:text-red-500"
          >
            ✕
          </button>

          <About closeAbout={() => setShowAbout(false)} />

        </div>
      </div>

    </div>
  );
}

export default App;