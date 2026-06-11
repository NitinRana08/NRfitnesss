function Hero() {
  return (
    <section id="home" className="relative h-[80vh] overflow-hidden">

      {/* Background Image (UNCHANGED FOR DESKTOP) */}
     <img
  src="/NRFitness.jpg"
  alt="gym"
  className="w-full h-full object-cover md:object-top -translate-x-4 md:translate-x-0"
/>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/30"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center px-6 md:px-16">

        <div className="max-w-xl">

          <h1 className="
            text-3xl sm:text-4xl md:text-6xl lg:text-7xl
            font-bold leading-tight
          ">
            Build Your <br />
            <span className="text-red-500">Dream Physique</span>
          </h1>

          <p className="
            mt-3 text-sm sm:text-base md:text-lg text-gray-300
          ">
            Transform your body with discipline, workouts, and smart nutrition.
          </p>

        </div>

      </div>

    </section>
  );
}

export default Hero;