function Hero() {
  return (
    <section
      id="home"
      className="relative h-[68vh] md:h-[80vh] overflow-hidden"
    >
      {/* Background Image */}
      <img
        src="/NRFitness.jpg"
        alt="gym"
        className="w-full h-full object-cover object-[65%_center] md:object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 md:bg-black/30"></div>

      {/* Text */}
      <div
        className="
          absolute inset-0
          flex items-center
          -translate-y-10
          md:translate-y-0
          pl-4 md:pl-16
        "
      >
        <div className="w-[45%] md:max-w-xl">
          <h1
            className="
              text-5xl
              sm:text-5xl
              md:text-6xl
              lg:text-7xl
              font-bold
              leading-tight
            "
          >
            Build Your <br />
            <span className="text-red-500">Dream Physique</span>
          </h1>

          <p
            className="
              mt-4
              text-base
              md:text-lg
              text-gray-300
            "
          >
            Transform your body with discipline, workouts, and smart nutrition.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Hero;