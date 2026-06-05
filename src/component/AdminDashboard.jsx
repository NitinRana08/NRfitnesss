function AdminDashboard() {
  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Admin Dashboard
      </h1>

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