import Hero from "./component/Hero";
import InfoSection from "./component/InfoSection";
import DisciplineBanner from "./component/DisciplineBanner";
import FuelSection from "./component/FuelSection";
import Footer from "./component/Footer";
import About from "./component/About";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/70 border-b border-zinc-800 flex justify-between items-center px-6 md:px-8 py-4">

        <h1 className="text-2xl md:text-3xl font-bold">
          <span className="text-red-500">NR</span> FITNESS
        </h1>

        <ul className="hidden md:flex gap-8 text-base text-gray-300 font-medium">

          <li>
            <a
              href="#home"
              className="hover:text-white transition cursor-pointer"
            >
              Home
            </a>
          </li>

          <li className="hover:text-white transition cursor-pointer">
            About
          </li>

          <li className="hover:text-white transition cursor-pointer">
            Contact
          </li>

          <li className="hover:text-white transition cursor-pointer">
            Communication
          </li>

        </ul>

      </nav>

      {/* Hero */}
      <Hero />
      {/* About */}
      <About />

      {/* Sections */}
      <InfoSection />
      <DisciplineBanner />
      <FuelSection />
      <Footer />

    </div>
  );
}

export default App;