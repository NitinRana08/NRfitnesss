function Hero() {
  return (
    <section id="home" className="relative h-[80vh]">

      {/* Background Image */}
      <img
        src="/NRFitness.jpg"
        alt="gym"
        className="w-full h-full object-cover object-top"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Text */}
      <div className="absolute inset-0 flex items-center px-8 md:px-16">
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Build Your <br />
            <span className="text-red-500">Dream Physique</span>
          </h1>

          {/* <button className="mt-8 bg-red-500 px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition">
            Get Started
          </button> */}
        </div>
      </div>

    </section>
  );
}

export default Hero;
