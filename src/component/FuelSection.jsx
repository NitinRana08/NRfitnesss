import { useState } from "react";
import DietModal from "./DietModal";

function FuelSection() {

  const [showDietModal, setShowDietModal] = useState(false);

  return (
    <section className="bg-black text-white px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-12">

        <h2 className="text-4xl md:text-6xl font-bold">
          Fuel Your Body Right
        </h2>

      </div>

      {/* Content Box */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 border border-zinc-700 rounded-2xl overflow-hidden bg-zinc-900">

        {/* Left Image */}
        <div className="h-[300px] md:h-[450px] overflow-hidden">

          <img
            src="/fuel.jpg.avif"
            alt="Diet"
            className="w-full h-full object-cover hover:scale-105 transition duration-500"
          />

        </div>

        {/* Right Content */}
        <div className="flex flex-col justify-center p-8 md:p-12">

          <p className="text-zinc-300 text-lg md:text-2xl leading-relaxed">
            “Simple, effective diet plans to help
            you gain muscle or lose fat —
            without confusion.”
          </p>

          {/* BUTTON */}
          <button
            onClick={() => setShowDietModal(true)}
            className="mt-8 w-fit bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
          >
            Explore Diet Plans
          </button>

        </div>

      </div>

      {/* MODAL */}
      <DietModal
        showDietModal={showDietModal}
        setShowDietModal={setShowDietModal}
      />

    </section>
  );
}

export default FuelSection;