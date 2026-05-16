import { useState } from "react";

function PlanModal({ showModal, setShowModal }) {

    const [submitted, setSubmitted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        height: "",
        weight: "",

        heightUnit: "cm",
        weightUnit: "kg",
    });

    const [error, setError] = useState("");

    const [step, setStep] = useState(1);

    const handleNext = () => {

        // STEP 1 VALIDATION
        if (step === 1) {

            if (
                !formData.name ||
                !formData.age ||
                !formData.gender
            ) {
                setError("Please fill all fields");
                return;
            }

            // age 
            if (formData.age < 8) {
                setError("Age must be 8 or above");
                return;

            }
        }

        // Clear Error
        setError("");

        // Next Step
        setStep(step + 1);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

            <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 relative border border-zinc-800 overflow-hidden">

                {/* Success Popup */}
                {submitted && (
                    <div className="absolute inset-0 bg-zinc-900 flex flex-col items-center justify-center text-center p-6 z-50">

                        <div className="text-5xl mb-4">
                            ✅
                        </div>

                        <h3 className="text-2xl font-bold mb-3">
                            Request Submitted
                        </h3>

                        <p className="text-zinc-400 text-sm leading-relaxed">
                            Thank you for choosing NR Fitness.
                            We will shortly respond with your personalized workout and nutrition plan.
                        </p>

                        <button
                            onClick={() => {
                                setSubmitted(false);
                                setShowModal(false);
                            }}
                            className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Close
                        </button>

                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={() => setShowModal(false)}
                    className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
                >
                    ✕
                </button>

                {/* Heading */}
                <h2 className="text-2xl font-bold mb-2">
                    Personalized Plan
                </h2>

                <p className="text-zinc-400 text-sm mb-6">
                    Step {step} of 8
                </p>

                {/* STEP 1 */}
                {step === 1 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Personal Info
                        </h3>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            />

                            <input
                                type="number"
                                placeholder="Age"
                                value={formData.age}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        age: e.target.value,
                                    })
                                }
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            />

                            <select
                                value={formData.gender}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        gender: e.target.value,
                                    })
                                }
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            >

                                <option value="">Select Gender</option>
                                <option>Male</option>
                                <option>Female</option>

                            </select>

                        </div>

                    </div>
                )}

                {/* STEP 2 */}
                {/* STEP 2 */}
                {step === 2 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Body Details
                        </h3>

                        <div className="space-y-5">

                            {/* Height */}
                            <div>

                                <label className="text-sm text-zinc-400 block mb-2">
                                    Height
                                </label>

                                <div className="flex gap-3">

                                    <input
                                        type="number"
                                        placeholder="Enter Height"
                                        value={formData.height}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                height: e.target.value,
                                            })
                                        }
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                                    />

                                    <select
                                        value={formData.heightUnit}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                heightUnit: e.target.value,
                                            })
                                        }
                                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-3 outline-none focus:border-red-500"
                                    >
                                        <option value="cm">cm</option>
                                        <option value="inch">inch</option>
                                    </select>

                                </div>

                            </div>

                            {/* Weight */}
                            <div>

                                <label className="text-sm text-zinc-400 block mb-2">
                                    Weight
                                </label>

                                <div className="flex gap-3">

                                    <input
                                        type="number"
                                        placeholder="Enter Weight"
                                        value={formData.weight}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                weight: e.target.value,
                                            })
                                        }
                                        className="flex-1 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                                    />

                                    <select
                                        value={formData.weightUnit}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                weightUnit: e.target.value,
                                            })
                                        }
                                        className="bg-zinc-800 border border-zinc-700 rounded-xl px-3 py-3 outline-none focus:border-red-500"
                                    >
                                        <option value="kg">kg</option>
                                        <option value="lbs">lbs</option>
                                    </select>

                                </div>

                            </div>

                        </div>

                    </div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Fitness Goal
                        </h3>

                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500">

                            <option>Weight Gain</option>
                            <option>Fat Loss</option>
                            <option>Muscle Building</option>
                            <option>Strength</option>

                        </select>

                    </div>
                )}

                {/* STEP 4 */}
                {step === 4 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Experience Level
                        </h3>

                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500">

                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Advanced</option>

                        </select>

                    </div>
                )}

                {/* STEP 5 */}
                {step === 5 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Workout Preference
                        </h3>

                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500">

                            <option>Gym Workout</option>
                            <option>Home Workout</option>
                            <option>Hybrid</option>

                        </select>

                    </div>
                )}

                {/* STEP 6 */}
                {step === 6 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Lifestyle
                        </h3>

                        <div className="space-y-4">

                            <input
                                type="text"
                                placeholder="Sleep Hours"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            />

                            <input
                                type="text"
                                placeholder="Training Days Per Week"
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                            />

                        </div>

                    </div>
                )}

                {/* STEP 7 */}
                {step === 7 && (
                    <div>

                        <h3 className="text-lg font-semibold mb-4">
                            Nutrition Preference
                        </h3>

                        <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500">

                            <option>Vegetarian</option>
                            <option>Non-Vegetarian</option>
                            <option>Eggetarian</option>

                        </select>

                    </div>
                )}

                {/* STEP 8 */}
                {step === 8 && (
                    <div className="text-center">

                        <h3 className="text-xl font-semibold mb-4">
                            Ready To Build Your Plan 💪
                        </h3>

                        <p className="text-zinc-400 text-sm mb-6">
                            Your personalized workout and nutrition plan is ready to generate.
                        </p>

                        <button
                            onClick={() => setSubmitted(true)}
                            className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
                        >
                            Generate Plan
                        </button>

                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm mt-4">
                        {error}
                    </p>
                )}

                {/* Bottom Buttons */}
                <div className="flex justify-between mt-8 gap-4">

                    {/* Back */}
                    {step > 1 ? (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-3 rounded-xl transition"
                        >
                            Back
                        </button>
                    ) : (
                        <div></div>
                    )}

                    {/* Next */}
                    {step < 8 && (
                        <button
                            onClick={handleNext}
                            className="flex-1 bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition"
                        >
                            Next
                        </button>
                    )}

                </div>

            </div>

        </div>
    );
}

export default PlanModal;