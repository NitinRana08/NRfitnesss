import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

import { auth } from "../firebase";
import { signOut } from "firebase/auth";


function AdminDashboard() {
    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [adminMessage, setAdminMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const snapshot = await getDocs(
                    collection(db, "planRequests")
                );

                const data = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setRequests(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRequests();
    }, []);
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        if (!selectedRequest) return;

        const q = query(
            collection(
                db,
                "planRequests",
                selectedRequest.id,
                "messages"
            ),
            orderBy("createdAt", "asc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [selectedRequest]);

    return (
        <div className="min-h-screen bg-black text-white p-6">
            <h1 className="text-4xl font-bold text-red-500 mb-6">
                Admin Dashboard
            </h1>
            <button
                onClick={handleLogout}
                className="mb-6 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
            >
                Logout
            </button>

            {/* Requests List */}
            <div className="space-y-4">
                {requests.map((request) => (
                    <div
                        key={request.id}
                        onClick={() => {
                            setSelectedRequest(request);
                        }}
                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 cursor-pointer hover:border-red-500 transition"
                    >
                        <h2 className="font-bold text-lg">
                            {request.name}
                        </h2>

                        <p>Email: {request.userEmail}</p>

                        <p>Goal: {request.goal}</p>

                        <p className="text-zinc-500 text-sm mt-2">
                            ID: {request.id}
                        </p>
                    </div>
                ))}
            </div>

            {/* Selected Request Panel */}
            {selectedRequest && (
                <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <h2 className="text-2xl font-bold mb-4">
                        {selectedRequest.name}
                    </h2>

                    <div className="grid md:grid-cols-2 gap-4 text-sm">

                        <p><strong>Name:</strong> {selectedRequest.name}</p>

                        <p><strong>Email:</strong> {selectedRequest.userEmail}</p>

                        <p><strong>Age:</strong> {selectedRequest.age}</p>

                        <p><strong>Gender:</strong> {selectedRequest.gender}</p>

                        <p><strong>Goal:</strong> {selectedRequest.goal}</p>

                        <p>
                            <strong>Height:</strong>
                            {" "}
                            {selectedRequest.height}
                            {" "}
                            {selectedRequest.heightUnit}
                        </p>

                        <p>
                            <strong>Weight:</strong>
                            {" "}
                            {selectedRequest.weight}
                            {" "}
                            {selectedRequest.weightUnit}
                        </p>

                        <p>
                            <strong>Experience:</strong>
                            {" "}
                            {selectedRequest.experience}
                        </p>

                        <p>
                            <strong>Diet:</strong>
                            {" "}
                            {selectedRequest.dietPreference}
                        </p>

                        <p>
                            <strong>Workout:</strong>
                            {" "}
                            {selectedRequest.workoutPreference}
                        </p>

                        <p>
                            <strong>Training Days:</strong>
                            {" "}
                            {selectedRequest.trainingDays}
                        </p>

                        <p>
                            <strong>Sleep Hours:</strong>
                            {" "}
                            {selectedRequest.sleepHours}
                        </p>

                    </div>

                    <div className="mt-4">

                        <p>
                            <strong>Medical Condition:</strong>
                        </p>

                        <p className="text-zinc-400">
                            {selectedRequest.medicalCondition}
                        </p>

                    </div>

                    <div className="mt-4">

                        <p>
                            <strong>Injuries:</strong>
                        </p>

                        <p className="text-zinc-400">
                            {selectedRequest.injuries}
                        </p>

                    </div>

                    <div className="mt-4">

                        <p>
                            <strong>Extra Info:</strong>
                        </p>

                        <p className="text-zinc-400">
                            {selectedRequest.extraInfo}
                        </p>

                    </div>
                    <div className="mt-6 bg-zinc-950 rounded-xl p-4 h-80 overflow-y-auto">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`mb-3 p-3 rounded-xl max-w-xs ${msg.sender === "admin"
                                        ? "bg-red-500 ml-auto"
                                        : "bg-zinc-700"
                                    }`}
                            >
                                <p className="text-xs opacity-70 mb-1">
                                    {msg.sender === "admin"
                                        ? "You"
                                        : "User"}
                                </p>

                                {msg.text}
                            </div>
                        ))}
                    </div>

                    <div className="mt-6">
                        <input
                            type="text"
                            value={adminMessage}
                            onChange={(e) =>
                                setAdminMessage(e.target.value)
                            }
                            placeholder="Reply to user..."
                            className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-red-500"
                        />
                    </div>

                    <button
                        className="mt-4 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg transition"
                    >
                        Send Reply
                    </button>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;