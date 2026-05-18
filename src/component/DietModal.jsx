import { useState } from "react";

function DietModal({ showDietModal, setShowDietModal }) {

    const [step, setStep] = useState(1);

    const [dietData, setDietData] = useState({
        meals: "",
        dietType: "",
    });

    const [submitted, setSubmitted] = useState(false);

    if (!showDietModal) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-5 border border-zinc-800 relative max-h-[90vh] overflow-y-auto">

                {/* SUCCESS POPUP */}
                {submitted && (
                    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center text-center p-6 z-50 rounded-2xl">

                        <div className="text-5xl mb-4">
                            ✅
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            Diet Request Submitted
                        </h3>

                        <p className="text-zinc-400 text-sm leading-relaxed">
                            We’ll create a personalized diet plan based on your lifestyle and goals.
                        </p>

                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setShowDietModal(false);
                            }}
                            className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Close
                        </button>

                    </div>
                )}

                {/* Close */}
                <button
                    onClick={() => setShowDietModal(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
                >
                    ✕
                </button>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl font-bold leading-tight mb-2 pr-8">
                    We'll create a diet plan based on your lifestyle, Not the generic one.
                </h2>

                <p className="text-zinc-400 text-sm mb-6">
                    Step {step} of 6
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-4 leading-snug">
                            How many meals do you usually eat in a day?
                        </h3>

                        <div className="space-y-3">

                            {["2 Meals", "3 Meals", "4 Meals", "5+ Meals"].map((meal) => (
                                <button
                                    key={meal}
                                    onClick={() =>
                                        setDietData({
                                            ...dietData,
                                            meals: meal,
                                        })
                                    }
                                    className={`w-full border rounded-xl py-3 transition text-left px-4 text-sm
                  ${dietData.meals === meal
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
                                        }`}
                                >
                                    {meal}
                                </button>
                            ))}

                        </div>

                    </div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-4 leading-snug">
                            Do you follow any specific diet?
                        </h3>

                        <div className="space-y-3">

                            {[
                                "Vegetarian",
                                "Non Vegetarian",
                                "Vegan",
                                "Eggetarian",

                            ].map((diet) => (
                                <button
                                    key={diet}
                                    onClick={() =>
                                        setDietData({
                                            ...dietData,
                                            dietType: diet,
                                        })
                                    }
                                    className={`w-full border rounded-xl py-3 transition text-left px-4 text-sm
          ${dietData.dietType === diet
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
                                        }`}
                                >
                                    {diet}
                                </button>
                            ))}

                        </div>

                    </div>
                )}
                {/* STEP 3 */}
                {step === 3 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-4 leading-snug">
                            What does your daily routine look like?
                        </h3>

                        <textarea
                            placeholder="For example: Wake-up time, sleep time, workout time, meals, college/job timing, etc."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 resize-none h-28 text-white"
                        />

                    </div>
                )}
                {/* STEP 4 */}
                {step === 4 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-4 leading-snug">
                            What foods do you enjoy eating daily?
                        </h3>

                        <textarea
                            placeholder="Rice, chicken, roti, oats, eggs, peanut butter, fruits, etc."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 resize-none h-24 text-white"
                        />

                    </div>
                )}
                {/* STEP 5 */}
                {step === 5 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-4 leading-snug">
                            What is your monthly diet budget?
                        </h3>

                        <input
                            type="number"
                            placeholder="Enter your budget in ₹"
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 text-white"
                        />

                    </div>
                )}
                {/* STEP 6 */}
                {step === 6 && (
                    <div>

                        <h3 className="text-xl font-semibold mb-5 leading-snug">
                            Health & Hydration
                        </h3>

                        <div className="space-y-5">

                            {/* Allergies */}
                            <div>

                                <label className="text-sm text-zinc-400 block mb-2">
                                    Any food allergies or restrictions?
                                </label>

                                <textarea
                                    placeholder="Lactose intolerance, peanut allergy, gluten-free, etc."
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 resize-none h-24 text-white"
                                />

                            </div>

                            {/* Water Intake */}
                            <div>

                                <label className="text-sm text-zinc-400 block mb-2">
                                    How much water do you drink daily?
                                </label>

                                <div className="flex gap-3">

                                    <input
                                        type="number"
                                        placeholder="Water Intake"
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500 text-white"
                                    />

                                    <div className="bg-zinc-800 border border-zinc-700 px-4 rounded-xl flex items-center text-zinc-300">
                                        L
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {/* Bottom Buttons */}
                <div className="flex gap-4 mt-8">

                    {/* Back */}
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition"
                        >
                            Back
                        </button>
                    )}

                    {/* Next / Submit */}
                    {step < 6 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={() => setSubmitted(true)}
                            className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
                        >
                            Generate Diet Plan
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default DietModal;