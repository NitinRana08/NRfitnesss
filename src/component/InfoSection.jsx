function InfoSection() {
  return (
    <section className="px-8 md:px-16 py-12 bg-black">

      <div className="grid md:grid-cols-2 gap-8">

        {/* Card 1 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex gap-6 items-center hover:scale-[1.02] transition">

          <img
            src="/journey.jpg"
            alt="journey"
            className="w-40 aspect-square object-cover object-center rounded-xl"


            
          />

          <div>
            <h2 className="text-xl font-semibold mb-2">My Journey</h2>
            <p className="text-gray-400 text-sm">
              Started my fitness journey with one goal – to become the best version of myself.
              Consistency, discipline & hard work changed everything.
            </p>

            <button className="mt-4 text-red-500 text-sm">
              Read more →
            </button>
          </div>

        </div>






        {/* Card 2 */}
        <div className="bg-zinc-900 rounded-2xl p-6 flex gap-6 items-center hover:scale-[1.02] transition">

          <div className="flex-1">
            <h2 className="text-xl font-semibold mb-2">
              Train Smarter, Not Harder
            </h2>

            <p className="text-gray-400 text-sm">
              Structured workout plans designed to help you get stronger,
              faster, and better every single day.
            </p>

            <button className="mt-4 text-red-500 text-sm">
              Explore Plans →
            </button>
          </div>

          <img
            src="/train.jpg"
            alt="train"
            className="w-40 h-40 object-contain rounded-xl bg-black"
          />

        </div>

      </div>

    </section>
  );
}

export default InfoSection;
