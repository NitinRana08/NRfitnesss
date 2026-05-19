// About.jsx

import aboutImg from "../assets/about.jpg";

function About() {
    return (
        <section
            id="about"
            className="bg-black text-white px-6 md:px-16 py-20"
        >
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">

                {/* Left Image */}
                <div className="overflow-hidden rounded-3xl">
                    <img
                        src={aboutImg}
                        alt="NR Fitness"
                        className="w-full h-[500px] object-cover hover:scale-105 duration-500"
                    />
                </div>

                {/* Right Content */}
                <div>
                    <p className="text-red-500 uppercase tracking-[4px] mb-3">
                        About NR Fitness
                    </p>

                    <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                        Built From Passion, Discipline & Real Experience
                    </h2>

                    <p className="text-gray-400 text-lg leading-8 mb-6">
                        NR Fitness is more than just a fitness website — it’s a reflection
                        of discipline, consistency, and self-improvement.
                    </p>

                    <p className="text-gray-400 text-lg leading-8 mb-10">
                        I’m not a certified trainer. Everything shared here comes from real
                        experience, continuous learning, passion for fitness, and the
                        mindset of becoming better every single day.
                    </p>

                    {/* Cards */}
                    <div className="grid grid-cols-2 gap-4 mb-10">
                        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                            <h3 className="text-xl font-semibold mb-2">💪 Self-Taught</h3>
                            <p className="text-gray-400 text-sm">
                                Built through real fitness experience and consistency.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                            <h3 className="text-xl font-semibold mb-2">🧠 Discipline</h3>
                            <p className="text-gray-400 text-sm">
                                Focused on mindset, routine, and self-improvement.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                            <h3 className="text-xl font-semibold mb-2">🔥 Aesthetic</h3>
                            <p className="text-gray-400 text-sm">
                                Inspired by modern fitness and aesthetic lifestyle culture.
                            </p>
                        </div>

                        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800">
                            <h3 className="text-xl font-semibold mb-2">🚀 Motivation</h3>
                            <p className="text-gray-400 text-sm">
                                Helping people stay motivated and consistent daily.
                            </p>
                        </div>
                    </div>

                    {/* Button */}
                    <button className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full text-white font-semibold duration-300">
                        Start Your Journey
                    </button>
                </div>
            </div>
        </section>
    );
}

export default About;