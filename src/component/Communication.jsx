import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
    collection,
    doc,
    onSnapshot,
    orderBy,
    query,
    addDoc,
    serverTimestamp,
    getDoc,
} from "firebase/firestore";

function Communication({ goBack }) {
    const user = auth.currentUser;

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [planData, setPlanData] = useState(null);
    const [unlocked, setUnlocked] = useState(false);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black">
                Loading user...
            </div>
        );
    }

    useEffect(() => {
        if (!user) return;

        // =========================
        // 📩 CHAT LISTENER
        // =========================
        const q = query(
            collection(db, "chats", user.email, "messages"),
            orderBy("createdAt", "asc")
        );

        const unsub = onSnapshot(q, (snapshot) => {
            setMessages(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        // =========================
        // 🔥 LOAD PLAN + UNLOCK LOGIC
        // =========================
        const fetchData = async () => {
            try {
                const planRef = doc(db, "planRequests", user.email);
                const planSnap = await getDoc(planRef);

                if (planSnap.exists()) {
                    const data = planSnap.data();

                    console.log("PLAN DATA:", data); // 👈 DEBUG

                    setPlanData(data);

                    // 🔥 STRICT CHECK (safer)
                    const isComplete =
                        data.name?.trim() &&
                        data.age &&
                        data.goal &&
                        data.dietPreference;

                    setUnlocked(!!isComplete);
                } else {
                    setPlanData(null);
                    setUnlocked(false);
                }

            } catch (error) {
                console.error("Communication Error:", error);
                setUnlocked(false);
            }
        };

        fetchData();

        return () => unsub();
    }, [user]);

    // =========================
    // 📤 SEND MESSAGE
    // =========================
    const sendMessage = async () => {
        if (!text.trim()) return;

        await addDoc(
            collection(db, "chats", user.email, "messages"),
            {
                text,
                sender: "user",
                createdAt: serverTimestamp(),
            }
        );

        setText("");
    };

    // =========================
    // 🔒 LOCK SCREEN
    // =========================
    if (!unlocked) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-black p-4">

                <button
                    onClick={goBack}
                    className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700"
                >
                    ← Back
                </button>

                <div className="text-center p-6 border border-zinc-800 rounded-2xl bg-zinc-900">
                    <h2 className="text-2xl font-bold mb-3">
                        Communication Locked 🔒
                    </h2>
                    <p className="text-zinc-400">
                        Complete your fitness plan setup to unlock chat with your coach.
                    </p>
                </div>
            </div>
        );
    }

    // =========================
    // 💬 CHAT UI
    // =========================
    return (
        <div className="min-h-screen bg-black text-white flex">

            {/* BACK BUTTON */}
            <button
                onClick={goBack}
                className="absolute top-4 left-4 bg-zinc-800 px-4 py-2 rounded-lg hover:bg-zinc-700"
            >
                ← Back
            </button>

            {/* CHAT SECTION */}
            <div className="w-2/3 border-r border-zinc-800 flex flex-col">

                <div className="flex-1 overflow-y-auto p-4 space-y-3 mt-12">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`p-3 rounded-lg max-w-md ${
                                msg.sender === "user"
                                    ? "bg-red-600 ml-auto"
                                    : "bg-zinc-800"
                            }`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>

                <div className="p-4 border-t border-zinc-800 flex gap-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Type message..."
                        className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-2"
                    />

                    <button
                        onClick={sendMessage}
                        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                        Send
                    </button>
                </div>
            </div>

            {/* PROFILE SECTION */}
            <div className="w-1/3 p-4 space-y-4 overflow-y-auto mt-12">

                <h2 className="text-xl font-bold">Your Fitness Profile</h2>

                {planData ? (
                    <div className="space-y-2 text-sm text-zinc-300">

                        <p><b>Name:</b> {planData.name}</p>
                        <p><b>Age:</b> {planData.age}</p>
                        <p><b>Gender:</b> {planData.gender}</p>
                        <p><b>Height:</b> {planData.height}</p>
                        <p><b>Weight:</b> {planData.weight}</p>
                        <p><b>Goal:</b> {planData.goal}</p>
                        <p><b>Experience:</b> {planData.experience}</p>
                        <p><b>Workout:</b> {planData.workoutPreference}</p>
                        <p><b>Sleep:</b> {planData.sleepHours} hrs</p>
                        <p><b>Days:</b> {planData.trainingDays}</p>
                        <p><b>Diet:</b> {planData.dietPreference}</p>
                        <p><b>Injuries:</b> {planData.injuries}</p>
                        <p><b>Medical:</b> {planData.medicalCondition}</p>
                        <p><b>Extra:</b> {planData.extraInfo}</p>

                    </div>
                ) : (
                    <p className="text-zinc-500">No plan found</p>
                )}
            </div>

        </div>
    );
}

export default Communication;