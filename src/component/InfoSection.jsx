import { useEffect, useState } from "react";

function InfoSection() {

  // Journey Images
  const images = [
    "/journey0.jpg",
    "/journey1.jpg",
    "/journey2.jpg",
    "/journey3.jpg",
    "/journey4.jpg",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  // Auto Change Image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="px-8 md:px-16 py-12 bg-black">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex gap-6 items-center hover:scale-[1.02] transition duration-300">

          {/* Smooth Image Slider */}
          <div className="relative w-40 h-40 overflow-hidden rounded-xl flex-shrink-0">

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
          <div>

            <h2 className="text-xl font-semibold mb-2">
              My Journey
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              I started my fitness journey at just 47kg with very low confidence.
              Nothing fit me properly, and people often underestimated me because of how skinny I was.
              Through consistent training, healthy eating, and discipline, I transformed myself to 75kg.
              Fitness changed not only my body, but also my mindset and confidence.
              I also developed a passion for creating and enjoying healthy meals that fuel real progress.
            </p>

            <button className="mt-4 text-red-500 text-sm hover:text-red-400 transition">
              More →
            </button>

          </div>

        </div>

        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex gap-6 items-center hover:scale-[1.02] transition duration-300">

          <div className="flex-1">

            <h2 className="text-xl font-semibold mb-2">
              Train Smarter, Not Harder
            </h2>

            <p className="text-gray-400 text-sm leading-relaxed">
              Structured workout plans designed to help you get stronger,
              faster, and better every single day.
            </p>

            <button className="mt-4 text-red-500 text-sm hover:text-red-400 transition">
              Explore Plans →
            </button>

          </div>

          <img
            src="/train.jpg"
            alt="train"
            className="w-40 h-40 object-cover rounded-xl"
          />

        </div>

      </div>

    </section>
  );
}

export default InfoSection;