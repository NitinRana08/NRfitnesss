import { useEffect, useState } from "react";

import PlanModal from "./PlanModal";

function InfoSection() {

  // Modal State
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {

    if (showModal) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };

  }, [showModal]);



  // Journey Images
  const images = [
    "/journey0.jpg",
    "/journey2.jpg",
    "/journey5.jpg",
    "/journey1.jpg",
    "/journey3.jpg",
    "/journey4.jpg",

  ];

  // Current Slider Image
  const [currentImage, setCurrentImage] = useState(0);

  // Auto Change Image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-4 md:px-16 py-12 bg-black">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-stretch hover:scale-[1.02] transition duration-300">

          {/* Smooth Image Slider */}
          <div className="relative w-full md:w-52 min-h-[280px] overflow-hidden rounded-xl flex-shrink-0">

            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="journey"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                  }`}
              />
            ))}

          </div>

          {/* Text */}
          <div className="flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-3">
              My Journey
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              I started my fitness journey at just 47kg with very low confidence.
              Nothing fit me properly, and people often underestimated me because of how skinny I was.
              Through consistent training, healthy eating, and discipline, I transformed myself to 75kg.
              Fitness changed not only my body, but also my mindset and confidence.
              I also developed a passion for creating and enjoying healthy meals that fuel real progress.
            </p>

          </div>

        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-stretch hover:scale-[1.02] transition duration-300">

          {/* Text */}
          <div className="flex-1 flex flex-col justify-center">

            <h2 className="text-2xl font-semibold mb-3">
              Train Smarter, Not Harder
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Structured workout plans designed to help you get stronger,
              faster, and better every single day.
            </p>

            <button
              onClick={() => setShowModal(true)}
              className="mt-8 w-fit bg-red-600 hover:bg-red-700 px-6 py-3 rounded-xl font-semibold transition"
            >
              Explore Workout Plans
            </button>

          </div>

          {/* Image */}
          <img
            src="/train.jpg"
            alt="train"
            className="w-full md:w-52 min-h-[280px] object-cover rounded-xl"
          />

        </div>

      </div>

      <PlanModal
        showModal={showModal}
        setShowModal={setShowModal}
      />

    </section>
  );
}

export default InfoSection;