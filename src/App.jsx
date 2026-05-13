import Hero from "./component/Hero";
import InfoSection from "./component/InfoSection";
// import discipline from "public/discipline.png";
import DisciplineBanner from "./component/DisciplineBanner";
import FuelSection from "./component/FuelSection";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <div className="bg-black text-white min-h-screen">

        {/* Navbar */}
        <nav className="flex justify-between items-center px-8 py-4">
          <h1 className="text-xl font-bold">
            <span className="text-red-500">NR</span> FITNESS
          </h1>

          <ul className="hidden md:flex gap-6 text-sm text-gray-300">
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
            <li>Communication</li>
          </ul>
        </nav>


        

        {/* Hero Component */}
        <Hero />
        {/* Info Section Component */}
        <InfoSection />
        <DisciplineBanner />
        <FuelSection />
        <Footer/>



      </div>

    </>
  );
}

export default App;
