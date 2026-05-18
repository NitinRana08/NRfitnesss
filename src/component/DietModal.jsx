import { useState } from "react";

function DietModal({ showDietModal, setShowDietModal }) {

  const [step, setStep] = useState(1);

  const [dietData, setDietData] = useState({
    meals: "",
    dietType: "",
  });

  if (!showDietModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 border border-zinc-800 relative max-h-[90vh] overflow-y-auto">

        {/* Close */}
        <button
          onClick={() => setShowDietModal(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        {/* Heading */}
        <h2 className="text-3xl font-bold leading-tight mb-3">
          We'll create a diet plan based on your lifestyle.
          Not a generic one.
        </h2>

        <p className="text-zinc-400 mb-8">
          Step {step} of 2
        </p>

        {/* STEP 1 */}
        {step === 1 && (
          <div>

            <h3 className="text-2xl font-semibold mb-6 leading-snug">
              How many meals do you usually eat in a day?
            </h3>

            <div className="space-y-4">

              {["2 Meals", "3 Meals", "4 Meals", "5+ Meals"].map((meal) => (
                <button
                  key={meal}
                  onClick={() =>
                    setDietData({
                      ...dietData,
                      meals: meal,
                    })
                  }
                  className={`w-full border rounded-2xl py-4 transition text-left px-5
                  ${
                    dietData.meals === meal
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

            <h3 className="text-2xl font-semibold mb-6 leading-snug">
              Do you follow any specific diet?
            </h3>

            <div className="space-y-4">

              {[
                "Vegetarian",
                "Non Vegetarian",
                "Vegan",
                "Eggetarian",
                "No Preference",
              ].map((diet) => (
                <button
                  key={diet}
                  onClick={() =>
                    setDietData({
                      ...dietData,
                      dietType: diet,
                    })
                  }
                  className={`w-full border rounded-2xl py-4 transition text-left px-5
                  ${
                    dietData.dietType === diet
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

        {/* Bottom Buttons */}
        <div className="flex gap-4 mt-10">

          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl"
            >
              Back
            </button>
          )}

          {step < 2 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
            >
              Next
            </button>
          ) : (
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold"
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