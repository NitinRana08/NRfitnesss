function PlanModal({ showModal, setShowModal }) {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">

      <div className="bg-zinc-900 w-full max-w-md rounded-2xl p-6 relative border border-zinc-800">

        {/* Close */}
        <button
          onClick={() => setShowModal(false)}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white transition"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6">
          Personalized Plan
        </h2>

        {/* Height */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-zinc-400">
            Height
          </label>

          <input
            type="text"
            placeholder="Enter your height"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        {/* Weight */}
        <div className="mb-4">
          <label className="block mb-2 text-sm text-zinc-400">
            Weight
          </label>

          <input
            type="text"
            placeholder="Enter your weight"
            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
          />
        </div>

        {/* Goal */}
        <div className="mb-6">
          <label className="block mb-2 text-sm text-zinc-400">
            Goal
          </label>

          <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500">
            <option>Weight Gain</option>
            <option>Fat Loss</option>
            <option>Muscle Building</option>
          </select>
        </div>

        <button className="w-full bg-red-500 hover:bg-red-600 py-3 rounded-xl font-semibold transition">
          Continue
        </button>

      </div>
    </div>
  );
}

export default PlanModal;