import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function AdminDashboard() {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl font-semibold transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <h2 className="text-2xl font-semibold mb-3">
          NRFitness Admin Panel
        </h2>

        <p className="text-zinc-400">
          Here you will manage:
        </p>

        <ul className="mt-4 space-y-2 text-zinc-300">
          <li>📋 Plan Requests</li>
          <li>💬 Communication</li>
          <li>👥 Users</li>
        </ul>

      </div>

    </div>
  );
}

export default AdminDashboard;